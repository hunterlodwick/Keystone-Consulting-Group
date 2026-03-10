const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/margin: "-100px"/g, 'amount: 0.1');
content = content.replace(/margin: "-50px"/g, 'amount: 0.1');
fs.writeFileSync('src/App.tsx', content);
console.log('Done');
