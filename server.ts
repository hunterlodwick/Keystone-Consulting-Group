import express from 'express';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API Routes
  app.post('/api/contact', (req, res) => {
    const { name, email, phone, company, message } = req.body;
    
    console.log('--- New Contact Form Submission ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Company: ${company}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    // In a real production environment, you would use a service like SendGrid, 
    // AWS SES, or an SMTP server to send this data via email.
    // The API keys for those services would be securely stored in process.env
    // and never exposed to the frontend.
    
    // Example:
    // const apiKey = process.env.EMAIL_SERVICE_API_KEY;
    // await sendEmail({ to: 'sales@keystone.com', body: req.body, apiKey });

    res.json({ success: true, message: 'Message received successfully.' });
  });

  app.post('/api/statement-analysis', (req, res) => {
    const { name, email, phone, volume } = req.body;
    
    console.log('--- New Statement Analysis Request ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Processing Volume: $${volume}`);
    console.log('--------------------------------------');

    res.json({ success: true, message: 'Request received successfully.' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
