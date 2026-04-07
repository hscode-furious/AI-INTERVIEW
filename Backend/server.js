import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./src/lib/env.js";
import { connectDB } from "./src/lib/db.js";
import { inngest, functions } from "./src/lib/inngest.js";

import chatRoutes from "./src/routes/chatRoutes.js";
import sessionRoutes from "./src/routes/sessionRoute.js";

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
// In dev the frontend might run on a different localhost port than `ENV.CLIENT_URL`.
// Allow `http://localhost:<port>` when not in production to prevent CORS mismatches.
const corsOrigin = (origin, callback) => {
  // Non-browser requests (no Origin header) should pass.
  if (!origin) return callback(null, true);

  const envOriginsRaw = [ENV.CLIENT_URL, process.env.CLIENT_URLS].filter(Boolean).join(",");
  const allowedOrigins = new Set(
    envOriginsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

  if (allowedOrigins.has(origin)) return callback(null, true);

  const isProduction = ENV.NODE_ENV === "production";
  const isLocalhostOrigin = /^http:\/\/localhost:\d+$/.test(origin);
  if (!isProduction && isLocalhostOrigin) return callback(null, true);

  return callback(null, false);
};

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});
app.get("/books", (req, res) => {
  res.status(200).json({ msg: "this is the books endpoint" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();