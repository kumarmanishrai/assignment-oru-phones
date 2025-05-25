import { NextFunction, Request, Response } from "express";
import "express-session";
import redisClient from "../index";

// Extend Express Request interface to include 'user'

export const UserAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("cookies: ", req.cookies);
  let sessionId = req.cookies?.["user_sid"];

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

        const data = await redisClient.get(storedSessionId[i]);
      if (!data) {
        res.status(403).json({ error: "Session data not found" });
        return;
      }
        const parsedData = data ? JSON.parse(data) : null;
      

        const status = parsedData.status;
      if (status === "loggedIn") {
        next();
        return;
      } else {
        res.status(403).json({ error: "User not logged in" });
        return;
      }
    }
  }

  res.status(403).send("Unauthorized");
  return;
};
