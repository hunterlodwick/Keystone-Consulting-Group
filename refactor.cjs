const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove motion imports
content = content.replace(/import \{ motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring, useMotionValueEvent \} from 'motion\/react';\n/, '');

// Replace motion.div, motion.header, motion.button, etc.
content = content.replace(/<motion\.([a-z]+)/g, '<$1');
content = content.replace(/<\/motion\.([a-z]+)>/g, '</$1>');

// Remove AnimatePresence
content = content.replace(/<AnimatePresence>/g, '<>');
content = content.replace(/<\/AnimatePresence>/g, '</>');

// Remove motion props
content = content.replace(/\s+initial=\{\{.*?\}\}/g, '');
content = content.replace(/\s+animate=\{\{.*?\}\}/g, '');
content = content.replace(/\s+exit=\{\{.*?\}\}/g, '');
content = content.replace(/\s+whileInView=\{\{.*?\}\}/g, '');
content = content.replace(/\s+viewport=\{\{.*?\}\}/g, '');
content = content.replace(/\s+transition=\{\{.*?\}\}/g, '');

fs.writeFileSync('src/App.tsx', content);
console.log('Refactored App.tsx');
