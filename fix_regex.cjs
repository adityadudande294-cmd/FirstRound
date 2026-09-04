const fs = require('fs');
let c = fs.readFileSync('generate_tests.cjs', 'utf8');
c = c.replace("const idIndex = content.indexOf(`id: '${id}'`);", "const match = content.match(new RegExp(`id['\\\":\\\\s]+${id}['\\\"\\\\]?`));\n    const idIndex = match ? match.index : -1;");
fs.writeFileSync('generate_tests.cjs', c);
