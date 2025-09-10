import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { createServer } from "./server";
// import { createServer } from "./server/index.ts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  // Express integration removed. Run backend separately.
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      // No backend integration here
      
      // const app = createServer();
      // // Add Express app as middleware to Vite dev server
      // server.middlewares.use(app);
    
    },
  };
}
