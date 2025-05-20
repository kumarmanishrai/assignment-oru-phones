import Admin from "../model/adminSchema";
import { Request, Response } from "express";
import "express-session";
import redisClient from "../index";
import { AdminAuthorization } from "../middleware/adminAuthorization";
import PageAnalytics from "../model/pageAnalyticsSchema";



// interface AdminType {
//     id: string;
//     email: string;
//     password: string;
// }

declare module "express-session" {
  interface SessionData {
    userId?: string;
    email?: string;
    role?: "admin" | "user";
  }
}

export const LogInAdmin = async (req: Request, res: Response) => {
  try {
    //* look later

    const { email, password } = req.body;

    const found = await Admin.findOne({ email, password });
    if (!found) return res.status(401).json({ error: "Invalid credentials" });

    req.session.userId = found._id.toString();
    req.session.email = found.email;
    req.session.role = "admin";
    // res.cookie('sessionId', req.sessionID,{
    //   httpOnly: true,
    //   maxAge:1*60*60,
    //   path:'/'
    // });
    res
      .status(200)
      .json({ message: "Admin Logged in", sessionId: req.sessionID });
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
};

export const LogOutAdmin = async (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Admin Logged out" });
  });
};


export const AdminReport = async (req: Request, res:Response) => {
  try {
    const pages = await PageAnalytics.find();

    let totalTimeSpent = 0;
    let totalPageVisits = 0;
    const uniqueSessions = new Set<string>();
    const pageVisitCounts: { url: string; count: number }[] = [];
    const buttonClickMap: Record<string, number> = {};
    const categoryClickMap: Record<string, number> = {};
    const deviceClicksMap: Record<string, number> = {};


    for (const page of pages) {
      totalTimeSpent += page.totalTimeSpent;
      totalPageVisits += page.pageVisitCount;
      pageVisitCounts.push({ url: page.pageUrl, count: page.pageVisitCount });

      page.uniqueSessionIds.forEach((id) => uniqueSessions.add(id));

      page.buttonClicks.forEach((count, label) => {
        buttonClickMap[label] = (buttonClickMap[label] || 0) + count;
      });

      page.categoryClicks.forEach((count, category) => {
        categoryClickMap[category] = (categoryClickMap[category] || 0) + count;
      });
      page.deviceClicks.forEach((count, category) => {
        deviceClicksMap[category] = (deviceClicksMap[category] || 0) + count;
      });
    }

    const topPages = pageVisitCounts
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    const topButtons = Object.entries(buttonClickMap)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    const deviceCategories = Object.entries(categoryClickMap).map(
      ([category, count]) => ({ category, count })
    );
    const deviceClicks = Object.entries(deviceClicksMap).map(
      ([device, count]) => ({ device, count })
    );

    const totalUsers = uniqueSessions.size;
    const avgTimePerPage = totalPageVisits
      ? Math.round(totalTimeSpent / totalPageVisits)
      : 0;
    // Placeholder values for loggedIn and loggedOut users
    const loggedIn = 0;
    const loggedOut = 0;

    res.status(200).json({
      totalUsers,
      topPages,
      avgTimePerPage,
      topButtons,
      deviceCategories,
      deviceClicks,
      loggedIn,
      loggedOut,
    });
  } catch (error) {
    console.error("Error fetching admin report:", error);
    res.status(500).json({ message: "Failed to generate report" });
  }
}


