const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

const hexMap = {
    '#12396b': 'primary-hover',
    '#245899': 'primary-border',
    '#0b2545': 'primary', // for accent-[#0b2545]
    '#12427a': 'primary-hover',
    '#185396': 'primary-active',
    '#1b4d8a': 'primary-border',
    '#071930': 'primary-dark',
    '#1b477b': 'primary-border'
};

let filesUpdated = 0;

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
            callback(filePath);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(srcDir, function (filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const [hex, semantic] of Object.entries(hexMap)) {
        const hexPattern = hex.replace('#', '');
        const regex = new RegExp(`(bg|text|border|ring|from|via|to|accent)-\\[#${hexPattern}\\]`, 'gi');
        content = content.replace(regex, `$1-${semantic}`);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.relative(srcDir, filePath)}`);
        filesUpdated++;
    }
});

console.log(`\nMigration complete. Updated ${filesUpdated} files.`);
