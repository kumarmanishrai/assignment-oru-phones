"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminReport = exports.LogOutAdmin = exports.LogInAdmin = void 0;
const adminSchema_1 = __importDefault(require("../model/adminSchema"));
require("express-session");
const pageAnalyticsSchema_1 = __importDefault(require("../model/pageAnalyticsSchema"));
const LogInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //* look later
        const { email, password } = req.body;
        const found = yield adminSchema_1.default.findOne({ email, password });
        if (!found)
            return res.status(401).json({ error: "Invalid credentials" });
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
    }
    catch (error) {
        return res.status(500).json({ error: "Login failed" });
    }
});
exports.LogInAdmin = LogInAdmin;
const LogOutAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Admin Logged out" });
    });
});
exports.LogOutAdmin = LogOutAdmin;
const AdminReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pages = yield pageAnalyticsSchema_1.default.find();
        let totalTimeSpent = 0;
        let totalPageVisits = 0;
        const uniqueSessions = new Set();
        const pageVisitCounts = [];
        const buttonClickMap = {};
        const categoryClickMap = {};
        const deviceClicksMap = {};
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
        const deviceCategories = Object.entries(categoryClickMap).map(([category, count]) => ({ category, count }));
        const deviceClicks = Object.entries(deviceClicksMap).map(([device, count]) => ({ device, count }));
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
    }
    catch (error) {
        console.error("Error fetching admin report:", error);
        res.status(500).json({ message: "Failed to generate report" });
    }
});
exports.AdminReport = AdminReport;
