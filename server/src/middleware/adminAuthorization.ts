import { NextFunction, Request, Response } from "express";
import "express-session";
import redisClient from "../index";

// Extend Express Request interface to include 'user'

export const AdminAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let sessionId = req.cookies?.["admin_sid"];
if (!sessionId || typeof sessionId !== "string") {
    res.status(401).json({ error: "Session ID required" });
    return
  }
  if (sessionId) {
    sessionId = "admin:" + sessionId.slice(2).split(".")[0];
    console.log(sessionId);
  }


  const exists = await redisClient.exists(sessionId);
  if(exists){
    console.log("Session ID of Admin exists in Redis");
    next();
    return;
  }
  
  // const storedSessionId = (await redisClient.keys(sessionId)) || null;
  // console.log("stored sessionId: ", storedSessionId);
  // for (let i = 0; i < storedSessionId.length; i++) {
  //   if (storedSessionId[i] === sessionId) {
  //     // console.log("sessionIdssss: ",storedSessionId[i]);
  //     console.log("here");
  //     next();
  //     return;
  //   }
  // }

  res.status(403).send("Unauthorized");
  return;
};
