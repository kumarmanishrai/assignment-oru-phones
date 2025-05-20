import { NextFunction, Request, Response } from "express";
import "express-session";
import redisClient from "../index";

export const AlreadyAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);
  let sessionId = req.cookies?.["connect.sid"];
  if (sessionId) {
    sessionId = "admin:" + sessionId.slice(2).split(".")[0];
    console.log(sessionId);
  }

  if (!sessionId || typeof sessionId !== "string") {
    next();
    return;
  }
  const storedSessionId = (await redisClient.keys(sessionId)) || null;
  console.log("stored sessionId: ", storedSessionId);
  if (storedSessionId[0] === sessionId) {
    console.log(storedSessionId);
    console.log("here");
    res.status(200).send("Already Authenticated");
    return;
  } else {
    next();
    return;
  }
};
