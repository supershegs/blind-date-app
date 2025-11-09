#!/usr/bin/env node
import { createServer } from './server/index.ts';

console.log('Starting diagnostic test...');

try {
  const app = createServer();
  const PORT = 3000;
  
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err) => {
    console.error('❌ Server error:', err);
    process.exit(1);
  });

  // Keep the process alive
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  console.log('✓ Server setup complete, waiting for connections...');
} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}
