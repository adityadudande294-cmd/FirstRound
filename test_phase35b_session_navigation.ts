import * as fs from 'fs';
import * as path from 'path';

console.log('--- STARTING PHASE 35B TEST: SESSION NAVIGATION & ISOLATION ---');
let passed = true;

// Helper to check file contents
const checkFileForRegex = (filename: string, regex: RegExp, errorMsg: string) => {
  const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf8');
  if (!regex.test(content)) {
    console.error(`FAIL: ${errorMsg}`);
    passed = false;
  } else {
    console.log(`PASS: ${filename} passed check for ${regex.source.substring(0, 30)}...`);
  }
};

// 1. Check ActiveTestEngine.tsx for correct storageKey suffix
checkFileForRegex(
  'src/components/ActiveTestEngine.tsx',
  /storageKeySuffix\s*=\s*mode\s*===\s*['"]practice['"]\s*\?\s*['"]_practice['"]\s*:\s*['"]['"]/,
  'ActiveTestEngine missing storageKeySuffix definition for practice mode'
);

checkFileForRegex(
  'src/components/ActiveTestEngine.tsx',
  /firstround_progress_\$\{userId\}_\$\{test\.id\}\$\{storageKeySuffix\}/,
  'ActiveTestEngine storageKey does not use the suffix for mode isolation'
);

// 2. Check App.tsx for correct removal of local storage key
checkFileForRegex(
  'src/App.tsx',
  /localStorage\.removeItem\(`firstround_progress_\$\{userId\}_\$\{activeTest\.id\}\$\{storageKeySuffix\}`\)/,
  'App.tsx missing mode suffix on localStorage.removeItem'
);

// 3. Check CodingWorkspace.tsx for modeKey generation
checkFileForRegex(
  'src/components/CodingWorkspace.tsx',
  /modeKey\s*=\s*mode\s*===\s*['"]practice['"]\s*\?\s*`\$\{testSeriesId\s*\|\|\s*['"]practice['"]\}_practice`\s*:\s*\(testSeriesId\s*\|\|\s*['"]exam['"]\)/,
  'CodingWorkspace modeKey is not generating test-specific practice keys'
);

// 4. Check ActiveTestEngine.tsx for coding_state cleanup fix
checkFileForRegex(
  'src/components/ActiveTestEngine.tsx',
  /modeKey\s*=\s*mode\s*===\s*['"]practice['"]\s*\?\s*`\$\{test\.id\s*\|\|\s*['"]practice['"]\}_practice`\s*:\s*\(test\.id\s*\|\|\s*['"]exam['"]\)/,
  'ActiveTestEngine coding_state removal missing proper modeKey matching'
);

// 5. Check TestHub.tsx for sessionStorage persistence of category
checkFileForRegex(
  'src/components/TestHub.tsx',
  /sessionStorage\.getItem\(['"]firstround_testhub_category['"]\)/,
  'TestHub missing retrieval of selectedCategory from sessionStorage'
);

checkFileForRegex(
  'src/components/TestHub.tsx',
  /sessionStorage\.setItem\(['"]firstround_testhub_category['"],\s*selectedCategory\)/,
  'TestHub missing saving of selectedCategory to sessionStorage'
);

// 6. Check App.tsx for logout cleanup
checkFileForRegex(
  'src/App.tsx',
  /sessionStorage\.removeItem\(['"]firstround_testhub_category['"]\)/,
  'App.tsx handleLogout missing cleanup of firstround_testhub_category'
);

// 7. Check App.tsx for Practice New-Session cleanup
checkFileForRegex(
  'src/App.tsx',
  /localStorage\.removeItem\(`firstround_progress_\$\{userId\}_\$\{test\.id\}_practice`\)/,
  'App.tsx handleStartTest missing practice state cleanup'
);

console.log('--- CLEANUP & FINAL RESULTS ---');
if (passed) {
  console.log('✅ PHASE 35B TEST PASSED');
  process.exit(0);
} else {
  console.error('❌ PHASE 35B TEST FAILED');
  process.exit(1);
}
