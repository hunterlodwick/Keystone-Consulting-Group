import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { z } from 'zod';
import { createServer as createViteServer } from 'vite';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const IS_PROD = process.env.NODE_ENV === 'production';

const DEFAULT_ALLOWED_ORIGINS = [
  'https://keystoneconsultingg.com',
  'https://www.keystoneconsultingg.com',
];

const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean) ??
  DEFAULT_ALLOWED_ORIGINS
).concat(IS_PROD ? [] : ['http://localhost:3000', 'http://127.0.0.1:3000']);

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 20;

type RateLimitEntry = { count: number; windowStart: number };
const rateLimitMap = new Map<string, RateLimitEntry>();

function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }

  entry.count += 1;
  return next();
}

// Periodically prune stale rate-limit entries
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref?.();

function checkOrigin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const origin = req.get('origin') || req.get('referer');

  // Same-origin / non-browser clients may omit Origin; reject in production without a known origin
  if (!origin) {
    if (!IS_PROD) return next();
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  let originUrl: string;
  try {
    originUrl = new URL(origin).origin;
  } catch {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  if (!ALLOWED_ORIGINS.includes(originUrl)) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  return next();
}

/** Reject control characters / newlines that enable log injection */
function noNewlines(value: string): boolean {
  return !/[\r\n\u2028\u2029]/.test(value);
}

const emailSchema = z
  .string()
  .trim()
  .email()
  .max(254)
  .refine(noNewlines, { message: 'Invalid characters' });

const safeShortString = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine(noNewlines, { message: 'Invalid characters' });

const contactSchema = z.object({
  name: safeShortString(2, 100),
  email: emailSchema,
  phone: safeShortString(7, 30),
  company: safeShortString(1, 100).optional().default('Not provided'),
  // Message may contain newlines; we never log raw body fields so log-injection is not a risk here.
  message: z.string().trim().max(2000).optional().default('No form message provided'),
});

const statementAnalysisSchema = z.object({
  name: safeShortString(2, 100),
  email: emailSchema,
  phone: safeShortString(1, 30).optional().default('Not provided'),
  volume: safeShortString(1, 50).optional().default('Not provided'),
});

function logApiEvent(endpoint: string, success: boolean, detail?: string) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      endpoint,
      success,
      ...(detail ? { detail } : {}),
    })
  );
}

async function forwardToWeb3Forms(payload: Record<string, unknown>): Promise<boolean> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // No key configured — accept locally without forwarding (dev / logging-only mode)
    return true;
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: accessKey, ...payload }),
  });

  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

async function startServer() {
  const app = express();

  app.use(
    helmet({
      // Vite HMR injects inline scripts in development; keep CSP for production only
      contentSecurityPolicy: IS_PROD ? undefined : false,
    })
  );
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow non-browser / same-origin requests without Origin header
        if (!origin) return callback(null, true);
        if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        return callback(null, false);
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept'],
    })
  );
  app.use(express.json({ limit: '16kb' }));

  app.post('/api/contact', rateLimit, checkOrigin, async (req, res) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      logApiEvent('/api/contact', false, 'validation_failed');
      return res.status(400).json({ success: false, message: 'Invalid request data.' });
    }

    try {
      const { name, email, phone, company, message } = parsed.data;
      const ok = await forwardToWeb3Forms({
        subject: 'New Contact Request - Keystone Consulting',
        name,
        email,
        phone,
        company,
        message,
      });

      if (!ok) {
        logApiEvent('/api/contact', false, 'upstream_failed');
        return res.status(502).json({ success: false, message: 'Unable to submit request.' });
      }

      logApiEvent('/api/contact', true);
      return res.json({ success: true, message: 'Message received successfully.' });
    } catch {
      logApiEvent('/api/contact', false, 'server_error');
      return res.status(500).json({ success: false, message: 'Unable to submit request.' });
    }
  });

  app.post('/api/statement-analysis', rateLimit, checkOrigin, async (req, res) => {
    const parsed = statementAnalysisSchema.safeParse(req.body);
    if (!parsed.success) {
      logApiEvent('/api/statement-analysis', false, 'validation_failed');
      return res.status(400).json({ success: false, message: 'Invalid request data.' });
    }

    try {
      const { name, email, phone, volume } = parsed.data;
      const ok = await forwardToWeb3Forms({
        subject: 'New Statement Analysis Request - Keystone Consulting',
        name,
        email,
        phone,
        message: `Processing Volume: $${volume} | Phone: ${phone}`,
      });

      if (!ok) {
        logApiEvent('/api/statement-analysis', false, 'upstream_failed');
        return res.status(502).json({ success: false, message: 'Unable to submit request.' });
      }

      logApiEvent('/api/statement-analysis', true);
      return res.json({ success: true, message: 'Request received successfully.' });
    } catch {
      logApiEvent('/api/statement-analysis', false, 'server_error');
      return res.status(500).json({ success: false, message: 'Unable to submit request.' });
    }
  });

  // Vite middleware for development
  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  // Bind to loopback; put a reverse proxy in front in production
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
