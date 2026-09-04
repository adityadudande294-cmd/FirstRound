const { execSync } = require('child_process');

try {
  console.log("Running npm run build...");
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log("\\nRunning test_phase33c_coding_runtime.ts...");
  execSync('npx tsx test_phase33c_coding_runtime.ts', { stdio: 'inherit' });
  
  console.log("\\nRunning test_phase33b_content_quality.ts...");
  execSync('npx tsx test_phase33b_content_quality.ts', { stdio: 'inherit' });
  
  console.log("\\nAll commands completed successfully.");
} catch (error) {
  console.error("A command failed.");
  process.exit(1);
}
