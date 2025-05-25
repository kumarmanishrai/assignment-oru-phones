import "express-session";
import { Request, Response } from "express";
import redisClient from "../index";
import requestIp from "request-ip";
import { v4 as uuidv4 } from "uuid";
import * as UAParser from "ua-parser-js";
import InteractionAnalytics from "../model/interactionAnalyticsSchema";
import User from "../model/userSchema";
import bcrypt from "bcryptjs";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    email?: string;
    role?: string;
    status?: string;
    timestamp?: string;
  }
}

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    // Create new user
      const  salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ email, password:hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "User creation failed" });
    
  }
}

export const UserLogIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email});

    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    if(!(await bcrypt.compare(password, user.password))){
      res.status(401).json({ error: "Invalid credentials" });
    }
    
    req.session.userId = user._id.toString();
    req.session.email = user.email;
    req.session.role = "user";
    req.session.status = "loggedIn";

    res.cookie('userId', req.session.userId,{
      httpOnly: true,
      maxAge:24*60*60*1000,
      path:'/'
    });


    return res.status(200).json({
      role: req.session.role,
      isLoggedIn: true,
    });
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
};

export const UserLogOut = async (req: Request, res: Response) => {
  try {


    res.clearCookie("userId");
    res.clearCookie("user_sid");
     req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "User Logged out" });
    });
    
    
  } catch (error) {
    return res.status(500).json({ error: "Logout failed" });
  }
};


export const UserLogInReport = async (req: Request, res: Response) => {
  try {
    const storedUserSession = await redisClient.keys("user:*");
    if (!storedUserSession || storedUserSession.length === 0) {
      return res.status(404).json({ error: "No user sessions found" });
    }
    let loggedInUsers = 0;
    let loggedOutUsers = 0;
    // let arrayOfUserIds: string[] = [];
    console.log("Stored User Sessions:", storedUserSession);
    await Promise.all(
      storedUserSession.map(async (sessionId) => {
        const sessionData = await redisClient.get(sessionId);
        if (!sessionData) return null;
        const parsedData = JSON.parse(sessionData);
        // if(arrayOfUserIds.includes(parsedData.userId)){
        // }
        if(parsedData.status === "loggedIn") {
          loggedInUsers++;
    
        };
        if( parsedData.status === "loggedOut") {
          loggedOutUsers++;
        }
        
      })
    );

    return res.status(200).json({
          loggedInUsers,
          loggedOutUsers,
        });
  } catch (error) {
    return res.status(500).json({ error: "Login report failed" });
    
  }
}

export const TrackVisitor = async (req: Request, res: Response) => {
  try {
    console.log("I'm Here", req.ip);
    // Get IP
    const ip = requestIp.getClientIp(req) || "unknown";

    // Get user-agent and parse it
    const ua = req.headers["user-agent"] || "";
    console.log("User-Agent:", ua);
    const parser = new UAParser.UAParser(ua);
    const result = parser.getResult();

    const browser = result.browser.name || "Unknown";
    const os = result.os.name || "Unknown";
    const deviceType = result.device.type || "unknown";

    // const sessionId = uuidv4();

    console.log(
      `browser: ${browser}, os: ${os}, deviceType: ${deviceType} ip: ${ip}`
    );

    req.session.userId = "";
    req.session.email = "";
    req.session.role = "";
    req.session.status = "loggedOut";
    req.session.timestamp = new Date().toISOString();

    const analytics = new InteractionAnalytics();
    const expressSessionId = req.session.id;
    analytics.sessionId = expressSessionId;
    analytics.device = analytics.device || {};
    analytics.device.type = deviceType;
    analytics.device.os = os;
    analytics.device.browser = browser;
    analytics.geo = analytics.geo || {};
    analytics.geo.ip = ip;
    await analytics.save();



    // Redis key: user info stored as hash
    // await redisClient.hset(`visitor:${sessionId}`, {
    //   sessionId,
    //   isLoggedIn: false,
    //   timestamp: new Date().toISOString(),
    // });

    return res.status(200).json({ data: "User arrived", sessionId: req.session.id });
  } catch (err) {
    console.error("Tracking error", err);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};

export const IsUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({role: "user"});
  } catch (error) {
    return res.status(500).json({ error: "Failed to check user" });
    
  }
}



type eventType = {
  eventType: string;
  elementTag?: String;
  elementId?: string;
  pageUrl?: string;
  timestamp: Date;
  scrollPercent?: number;
  timeSpent?: number;
};

export const TrackInteraction = async (req: Request, res: Response) => {
  try {
    const { interactions } = req.body;
    const sessionId = req?.sessionID
    

    let events;
    try {
      events =
        typeof interactions === "string"
          ? JSON.parse(interactions)
          : interactions;
    } catch (parseErr) {
      return res.status(400).json({ error: "Invalid interactions format" });
    }

    if (!sessionId || !Array.isArray(events)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    console.log("Session ID:", sessionId);
    console.log("Events:", events);

    const analytics = await InteractionAnalytics.findOne({ sessionId });
    if (!analytics) {
      return res.status(404).json({ error: "Session not found" });
    }

    const eventData = events.map((event: eventType) => ({
      eventType: event.eventType,
      eventTag: event.elementTag,
      eventId: event.elementId,
      pageUrl: event.pageUrl,
      timestamp: new Date(),
      scrollPercent: event.scrollPercent,
      timeSpent: event.timeSpent,
    }));
    analytics.events.push(...eventData);
    const userId = req.cookies?.userId;
    if(userId){
      analytics.userId = userId;
    }
    await analytics.save();
    console.log("Event data saved:", analytics.events);

    // You can process eventData here as needed
  } catch (error) {
    console.error("Analytics processing error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
