import type { RequestHandler } from "express";   // 👈 note "import type"
import type { DemoResponse } from "../../shared/api"; // Adjusted import path for TypeScript


export const handleDemo: RequestHandler = (req, res) => {
  const response: DemoResponse = {
    message: "Hello from Express server",
  };
  res.status(200).json(response);
};
  
// npx ts-node server/index.ts or npx ts-node server/node-build.ts

// pnpm run dev

// npm --version
// npm install -g pnpm
// pnpm install
// pnpm install pg or pnpm add pg      ---postgres
// pnpm install --save-dev @types/pg or pnpm add -D @types/pg
