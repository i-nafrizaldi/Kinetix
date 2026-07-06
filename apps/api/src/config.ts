import { config } from "dotenv";
import { resolve } from "node:path";

// ======================================================
// ENVIRONMENT
// ======================================================

export const NODE_ENV = process.env.NODE_ENV || "development";

// ======================================================
// ENV FILE SELECTION
// ======================================================

const envFile = NODE_ENV === "development" ? ".env.development" : ".env";

// ======================================================
// LOAD BASE ENV FILE
// ======================================================

config({
  path: resolve(process.cwd(), envFile),
});

// ======================================================
// LOAD LOCAL OVERRIDE
// ======================================================

config({
  path: resolve(process.cwd(), `${envFile}.local`),
  override: true,
});

// ======================================================
// APPLICATION CONFIG
// ======================================================

export const PORT = Number(process.env.PORT) || 8000;

export const DATABASE_URL = process.env.DATABASE_URL || "";

export const NEXT_BASE_URL = process.env.NEXT_BASE_URL || "";
