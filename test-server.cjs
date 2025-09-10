const { spawn } = require('child_process');

console.log('🚀 Starting server test...');

const server = spawn('npx', ['ts-node', '--transpile-only', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('❌ Server failed to start:', error.message);
});

server.on('exit', (code) => {
  console.log(`🔄 Server exited with code ${code}`);
});

// Kill server after 5 seconds for testing
setTimeout(() => {
  console.log('⏰ Stopping server test...');
  server.kill();
}, 5000);