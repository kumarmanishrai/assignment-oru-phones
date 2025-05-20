import "express-session";
import { Request, Response } from "express";
import redisClient from "../index";
import requestIp from "request-ip";
import { v4 as uuidv4 } from "uuid";
import * as UAParser from "ua-parser-js";
import PageAnalytics from "../model/pageAnalyticsSchema";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    email?: string;
    role?: "admin" | "user";
  }
}

// export const UserLogIn = (req:Request, res:Response) => {
//     if (!req.session.userId) {
//     return res.status(401).json({ loggedIn: false });
//   }
//   return res.json({
//     userId: req.session.userId,
//     role: req.session.role,
//     loggedIn: true,
//   });
// }

export const trackVisitor = async (req: Request, res: Response) => {
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

    const sessionId = uuidv4();

    console.log(
      `browser: ${browser}, os: ${os}, deviceType: ${deviceType} ip: ${ip}`
    );

    // Redis key: user info stored as hash
    await redisClient.hset(`visitor:${sessionId}`, {
      ip,
      browser,
      os,
      deviceType,
      timestamp: new Date().toISOString(),
    });

    // Redis counter: total unique users visited
    await redisClient.incr("totalVisitors");

    // res.cookie('sessionId', sessionId,{
    //   httpOnly: true,
    //   maxAge:1*60*60,
    //   path:'/'
    // });
    return res.status(200).json({ data: "User arrived", sessionId: sessionId });
  } catch (err) {
    console.error("Tracking error", err);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};

export const trackInteraction = async (req: Request, res: Response) => {
  try {
    const { sessionId, interactions } = req.body;

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

    const urlMap = new Map<string, any>();

    for (const event of events) {
      const {
        pageUrl,
        elementTag,
        eventType,
        elementId,
        scrollPercent,
        timeSpent,
      } = event;
      if (!pageUrl) continue;

      if (!urlMap.has(pageUrl)) {
        urlMap.set(pageUrl, {
          timeSpent: 0,
          buttonClicks: new Map(),
          linkClicks: new Map(),
          categoryClicks: new Map(),
          deviceClicks: new Map(),
          scrollDepths: [],
          pageVisitCount: 0,
        });
      }

      const data = urlMap.get(pageUrl);

      switch (eventType) {
        case "pageVisit":
          data.pageVisitCount += 1;
          break;
        case "scroll":
          if (scrollPercent) data.scrollDepths.push(scrollPercent);
          break;
        case "timeSpent":
          data.timeSpent += timeSpent || 0;
          break;
        case "filterClick":
          if (elementTag === "INPUT") {
            
            console.log("Im here");
            const prev = data.deviceClicks.get(elementId) || 0;
            data.deviceClicks.set(elementId, prev + 1);
            console.log(elementId + ":" + data.deviceClicks.get(elementId));
          }
          break;
        case "click":
          if (elementTag === "BUTTON") {
            const prev = data.buttonClicks.get(elementId) || 0;
            data.buttonClicks.set(elementId, prev + 1);
          } else if (elementTag === "A") {

            const prev = data.linkClicks.get(elementId) || 0;
            data.linkClicks.set(elementId, prev + 1);
          }
          break;
      }
    }

    for (const [pageUrl, data] of urlMap.entries()) {
      let analytics = await PageAnalytics.findOne({ pageUrl });

      if (!analytics) {
        analytics = new PageAnalytics({
          pageUrl,
          uniqueSessionIds: [],
          buttonClicks: new Map(),
          linkClicks: new Map(),
          categoryClicks: new Map(),
          deviceClicks: new Map(),
          scrollDepths: [],
          totalTimeSpent: 0,
          pageVisitCount: 0,
        });
      }

      if (!analytics.uniqueSessionIds.includes(sessionId)) {
        analytics.uniqueSessionIds.push(sessionId);
      }

      analytics.totalTimeSpent += data.timeSpent || 0;
      analytics.pageVisitCount += data.pageVisitCount;

      const mergeMap = (
        target: Map<string, number>,
        updates?: Map<string, number>
      ) => {
        if (!updates) return;
        for (const [key, count] of updates.entries()) {
          const prev = target.get(key) || 0;
          target.set(key, prev + count);
        }
      };

      mergeMap(analytics.buttonClicks, data.buttonClicks);
      mergeMap(analytics.linkClicks, data.linkClicks);
      mergeMap(analytics.categoryClicks, data.categoryClicks);
      mergeMap(analytics.deviceClicks, data.deviceClicks);

      analytics.scrollDepths.push(...data.scrollDepths);

      await analytics.save();
    }

    return res
      .status(200)
      .json({ message: "Analytics processed successfully" });
  } catch (error) {
    console.error("Analytics processing error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

