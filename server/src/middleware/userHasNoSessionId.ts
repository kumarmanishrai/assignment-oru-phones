import { NextFunction, Request, Response } from "express";
import "express-session";
import redisClient from "../index";

export const UserHasNoSessionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);
  // let sessionId = req.cookies?.["user_sid"];

  if (!req.cookies?.["user_sid"]) {
    console.log("No Session Id Found");
    next();
    return;
  }
{
    return;
  }


  
};
