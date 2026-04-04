import User from "../models/User.js";

export const protectRoute = [
  async (req, res, next) => {
    try {
      // `clerkMiddleware()` (mounted in `server.js`) provides `req.auth()` for API routes.
      // Avoid `requireAuth()` here because it redirects unauthenticated requests (302) instead of returning 401/JSON.
      const auth = typeof req.auth === "function" ? req.auth() : null;
      const clerkId = auth?.userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      const user = await User.findOne({ clerkId });

      if (!user) return res.status(404).json({ message: "User not found" });

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];