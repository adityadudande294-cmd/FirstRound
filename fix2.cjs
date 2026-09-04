const fs = require('fs');

let c = fs.readFileSync('generate_tests.cjs', 'utf8');
c = c.replace(/const match = .*;/g, "const idIndex = content.indexOf(`id: '${id}'`);\n    if (idIndex === -1) {\n      const idIndex2 = content.indexOf(`\"id\": \"${id}\"`);\n      if (idIndex2 === -1) { console.log('ID not found:', id); continue; } else { Object.defineProperty(config, 'dummy', {value: idIndex2, enumerable: false}); } \n    }");
// It's easier to just overwrite generate_tests.cjs entirely.
