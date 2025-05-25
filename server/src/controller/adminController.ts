import Admin from "../model/adminSchema";
import { Request, Response } from "express";
import "express-session";
import AnalyticsModel from "../model/interactionAnalyticsSchema";
import bcrypt from "bcryptjs";

// interface AdminType {
//     id: string;
//     email: string;
//     password: string;
// }

interface AggregatedReport {
  totalUsers: number;
  topPages: { url: string; count: number }[];
  avgTimePerPage: number;
  phoneBrands: { brand: string; count: number }[];
  phoneRam: { ram: string; count: number }[];
  phoneStorage: { storage: string; count: number }[];
  phonePriceRange: { price: string; count: number }[];
  phoneScreenSize: { price: string; count: number }[];
  phoneCondition: { condition: string; count: number }[];
  phoneFeatures: { feature: string; count: number }[];
  links: { label: string; count: number }[];
  topButtons: { button: string; count: number }[];
  scrollDepth: number;
}

declare module "express-session" {
  interface SessionData {
    userId?: string;
    email?: string;
    role?: string;
  }
}

export const LogInAdmin = async (req: Request, res: Response) => {
  try {
    //* look later

    const { email, password } = req.body;

    const found = await Admin.findOne({ email });
    if (!found) return res.status(401).json({ error: "Invalid credentials" });

    if (!found) return res.status(401).json({ error: "Invalid credentials" });
    if (!(await bcrypt.compare(password, found.password))) {
      res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = found._id.toString();
    req.session.email = found.email;
    req.session.role = "admin";
    res.cookie("userId", req.session.userId, {
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
      path: "/",
    });
    res
      .status(200)
      .json({ message: "Admin Logged in", sessionId: req.sessionID });
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
};

export const LogOutAdmin = async (req: Request, res: Response) => {
  res.clearCookie("userId");
  res.clearCookie("admin_sid");
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Admin Logged out" });
  });
};

export const IsAdmin = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ role: "admin" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to check admin" });
  }
};

export const CreateAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, securityKey } = req.body;

    if (!email || !password || !securityKey) {
      return res
        .status(400)
        .json({ error: "Email, password and security key are required" });
    }
    console.log("securityKey:", securityKey);
    console.log("process.env.SECURITY_KEY:", process.env.SECURITY_KEY);
    if (`${securityKey}` !== process.env.SECURITY_KEY) {
      return res.status(401).json({ error: "Invalid security key" });
    }

    // Check if admin already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      role: "admin",
    });
    await newAdmin.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "User creation failed" });
  }
};

export const AdminReport = async (req: Request, res: Response) => {
  try {
    // 1. Total unique users (by sessionId)
    const totalUsers = await AnalyticsModel.distinct("sessionId").then(
      (arr) => arr.length
    );

    // 2. Top pages (by pageVisit event)
    const topPages = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      { $match: { "events.eventType": "pageVisit" } },
      { $group: { _id: "$events.pageUrl", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { url: "$_id", count: 1, _id: 0 } },
    ]);

    // 3. Average time per page (array for per-page chart)
    const averageTimePerPage = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      { $match: { "events.eventType": "timeSpent" } },
      {
        $group: { _id: "$events.pageUrl", time: { $avg: "$events.timeSpent" } },
      },
      { $project: { page: "$_id", time: { $round: ["$time", 2] }, _id: 0 } },
    ]);
    // Overall average
    const avgTime = averageTimePerPage.length
      ? averageTimePerPage.reduce((a, b) => a + b.time, 0) /
        averageTimePerPage.length
      : 0;

    // 5. Top buttons (filter out null/empty)
    const topButtons = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      { $match: { "events.eventType": "buttonClick" } },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { label: "$_id", count: 1, _id: 0 } },
    ]);

    const phoneRam = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      {
        $match: {
          "events.eventType": "filterClick",
          "events.eventId": { $regex: /^phone-ram-/ },
        },
      },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $project: {
          label: {
            $arrayElemAt: [
              { $split: ["$_id", "-"] },
              { $subtract: [{ $size: { $split: ["$_id", "-"] } }, 1] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    const phoneBrands = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      {
        $match: {
          "events.eventType": "filterClick",
          "events.eventId": { $regex: /^phone-brand-name-/ },
        },
      },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $project: {
          label: {
            $arrayElemAt: [
              { $split: ["$_id", "-"] },
              { $subtract: [{ $size: { $split: ["$_id", "-"] } }, 1] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    const phoneStorage = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      {
        $match: {
          "events.eventType": "filterClick",
          "events.eventId": { $regex: /^phone-storage-/ },
        },
      },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $project: {
          label: {
            $arrayElemAt: [
              { $split: ["$_id", "-"] },
              { $subtract: [{ $size: { $split: ["$_id", "-"] } }, 1] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    const phonePriceRange = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      {
        $match: {
          "events.eventType": "filterClick",
          "events.eventId": { $regex: /^phone-price-/ },
        },
      },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $project: {
          label: {
            $arrayElemAt: [
              { $split: ["$_id", "-"] },
              { $subtract: [{ $size: { $split: ["$_id", "-"] } }, 1] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    const phoneFeatures = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      {
        $match: {
          "events.eventType": "filterClick",
          "events.eventId": { $regex: /^phone-features-/ },
        },
      },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $project: {
          label: {
            $arrayElemAt: [
              { $split: ["$_id", "-"] },
              { $subtract: [{ $size: { $split: ["$_id", "-"] } }, 1] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    const phoneScreenSize = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      {
        $match: {
          "events.eventType": "filterClick",
          "events.eventId": { $regex: /^phone-screen-size-/ },
        },
      },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $project: {
          label: {
            $arrayElemAt: [
              { $split: ["$_id", "-"] },
              { $subtract: [{ $size: { $split: ["$_id", "-"] } }, 1] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    const phoneCondition = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      {
        $match: {
          "events.eventType": "filterClick",
          "events.eventId": { $regex: /^phone-condition-/ },
        },
      },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $project: {
          label: {
            $arrayElemAt: [
              { $split: ["$_id", "-"] },
              { $subtract: [{ $size: { $split: ["$_id", "-"] } }, 1] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    const links = await AnalyticsModel.aggregate([
      { $unwind: "$events" },

      { $match: { "events.eventType": "linkClick" } },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { label: "$_id", count: 1, _id: 0 } },
    ]);

    const avgScrollAgg = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      { $match: { "events.eventType": "scroll" } },
      { $group: { _id: null, avgScroll: { $avg: "$events.scrollPercent" } } },
    ]);
    const avgScroll = avgScrollAgg[0]?.avgScroll ?? 0;

    const report = {
      totalUsers,
      topPages,
      averageTimePerPage, // array for per-page chart
      avgTime, // single number for summary
      topButtons,
      phoneBrands,
      phoneRam,
      phoneStorage,
      phonePriceRange,
      phoneScreenSize,
      phoneCondition,
      phoneFeatures,
      links,
      avgScroll,
    };

    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating analytics report:", error);
    res.status(500).json({ message: "Failed to generate analytics report" });
  }
};

//* Url wise Report

export const UrlWiseReport = async (req: Request, res: Response) => {
  const targetUrl = req.query.url as string;

  if (!targetUrl) {
    return res.status(400).json({ message: "URL query parameter is required" });
  }

  try {
    // Match by pageUrl inside events
    const matchUrl = { "events.pageUrl": targetUrl };

    // 1. Top Buttons
    const topButtons = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      { $match: { ...matchUrl, "events.eventType": "buttonClick" } },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { label: "$_id", count: 1, _id: 0 } },
    ]);

    // 2. Top Links
    const topLinks = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      { $match: { ...matchUrl, "events.eventType": "linkClick" } },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { label: "$_id", count: 1, _id: 0 } },
    ]);

    // 3. Average Scroll Percent
    const avgScrollAgg = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      { $match: { ...matchUrl, "events.eventType": "scroll" } },
      { $group: { _id: null, avgScroll: { $avg: "$events.scrollPercent" } } },
    ]);
    const avgScroll = avgScrollAgg[0]?.avgScroll ?? 0;

    // 4. Total Visits (pageVisit events)
    const totalVisits = await AnalyticsModel.countDocuments({
      events: {
        $elemMatch: {
          eventType: "pageVisit",
          pageUrl: targetUrl,
        },
      },
    });

    // 5. Average Time Spent in One Session
    const avgTimeAgg = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      { $match: { ...matchUrl, "events.eventType": "timeSpent" } },
      {
        $group: {
          _id: "$sessionId",
          totalTime: { $sum: "$events.timeSpent" },
        },
      },
      {
        $group: {
          _id: null,
          avgTime: { $avg: "$totalTime" },
        },
      },
    ]);
    const avgTimeInSession = avgTimeAgg[0]?.avgTime ?? 0;

    // 6. Top Filters Clicked (if any)
    const topFilters = await AnalyticsModel.aggregate([
      { $unwind: "$events" },
      {
        $match: {
          ...matchUrl,
          "events.eventType": "filterClick",
        },
      },
      { $group: { _id: "$events.eventId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          label: {
            $arrayElemAt: [
              { $split: ["$_id", "-"] },
              { $subtract: [{ $size: { $split: ["$_id", "-"] } }, 1] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    const report = {
      url: targetUrl,
      totalVisits,
      avgTimeInSession: parseFloat(avgTimeInSession.toFixed(2)),
      avgScroll: parseFloat(avgScroll.toFixed(2)),
      topButtons,
      topLinks,
      topFilters,
    };

    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating URL-wise analytics report:", error);
    res.status(500).json({ message: "Failed to generate report" });
  }
};
