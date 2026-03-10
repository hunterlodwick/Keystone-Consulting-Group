const fs = require('fs');
const path = './src/App.tsx';

let content = fs.readFileSync(path, 'utf8');

// Global replacements
content = content.replace(/Dual Pricing/g, 'The Edge Program');
content = content.replace(/dual pricing/g, 'The Edge Program');
content = content.replace(/Cash Discount/g, 'The Edge Program');
content = content.replace(/cash discount/g, 'The Edge Program');

fs.writeFileSync(path, content);
console.log('Global rename complete');
