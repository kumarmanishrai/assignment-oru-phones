


import { NextFunction, Request, Response } from "express";
import "express-session";
import redisClient from "../index";

// Extend Express Request interface to include 'user'



export const AdminAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    let sessionId = req.cookies?.["connect.sid"];

  if(sessionId){
    sessionId = "admin:" + sessionId.slice(2).split('.')[0];
  console.log(sessionId);
  }

    if (!sessionId || typeof sessionId !== "string") {
      res.status(401).json({ error: "Session ID required" });
      return;
    }
        const storedSessionId = await redisClient.keys(sessionId)||null;
        if(storedSessionId[0] ===sessionId){
            console.log(storedSessionId[0])
    
            next()
            return;
        }
        
        else{
            res.status(403).send("Unauthorized")
            return;
        }
    
  }
