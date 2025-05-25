import { NextFunction, Request, Response } from "express";
import "express-session";
import redisClient from "../index";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      sessionId?: string;
    }
  }
}

export const UserHasSessionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("cookies: ",req.cookies);
  let sessionId = req.cookies?.["user_sid"];
    if (!sessionId || typeof sessionId !== "string") {
    res.status(401).send("No Session Id Found");
    console.log("No Session Id Found");
    return;
  }
  if (sessionId) {
    sessionId = "user:" + sessionId.slice(2).split(".")[0];
    console.log(sessionId);
  }

  const exists = await redisClient.exists(sessionId);
  if(exists){
    console.log("Session ID exists in Redis");
    next();
    return;
  }
  // const storedSessionId = (await redisClient.keys(sessionId)) || null;
  // // console.log("stored sessionId: ", storedSessionId);
  // for (let i = 0; i < storedSessionId.length; i++) {
  //   if (storedSessionId[i] === sessionId) {
  //     console.log(storedSessionId[i]);
  //     console.log("User sessionId found");
  //     req.sessionId = sessionId
  //     next();
  //     return;
  //   }
  // }


    res.status(401).send("Unauthorized");
    return;

};
