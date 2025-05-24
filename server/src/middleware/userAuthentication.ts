import { NextFunction, Request, Response } from "express";
import "express-session";
import redisClient from "../index";

export const UserAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);
  let sessionId = req.cookies?.["connect.sid"];
    if (!sessionId || typeof sessionId !== "string") {
    res.status(401).send("Unauthorized");
    return;
  }
  if (sessionId) {
    sessionId = "user:" + sessionId.slice(2).split(".")[0];
    console.log(sessionId);
  }


  const storedSessionId = (await redisClient.keys(sessionId)) || null;
  // console.log("stored sessionId: ", storedSessionId);
  for (let i = 0; i < storedSessionId.length; i++) {
    if (storedSessionId[i] === sessionId) {
      console.log(storedSessionId[i]);
      console.log("here");
      next();
      return;
    }
  }


    res.status(401).send("Unauthorized");
    return;

};
