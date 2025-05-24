import { NextFunction, Request, Response } from "express";
import "express-session";
import redisClient from "../index";

// Extend Express Request interface to include 'user'

export const UserAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let sessionId = req.cookies?.["connect.sid"];

  if (sessionId) {
    sessionId = "user:" + sessionId.slice(2).split(".")[0];
    console.log(sessionId);
  }

  if (!sessionId || typeof sessionId !== "string") {
    res.status(401).json({ error: "Session ID required" });
    return;
  }
  const storedSessionId = (await redisClient.keys(sessionId)) || null;
  for (let i = 0; i < storedSessionId.length; i++) {
    if (storedSessionId[i] === sessionId) {
      console.log(storedSessionId[i]);
      console.log("here");
      next();
      return;
    }
  }

  res.status(403).send("Unauthorized");
  return;
};
