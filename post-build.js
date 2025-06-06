const fs = require('fs');
const path = './dist/city-explorer/browser/index.html';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/src="browser\//g, 'src="/')
                .replace(/href="browser\//g, 'href="/');
fs.writeFileSync(path, content);