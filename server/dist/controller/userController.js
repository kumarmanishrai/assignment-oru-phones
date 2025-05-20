"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.trackInteraction = exports.trackVisitor = void 0;
require("express-session");
const index_1 = __importDefault(require("../index"));
const request_ip_1 = __importDefault(require("request-ip"));
const uuid_1 = require("uuid");
const UAParser = __importStar(require("ua-parser-js"));
const pageAnalyticsSchema_1 = __importDefault(require("../model/pageAnalyticsSchema"));
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
const trackVisitor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("I'm Here", req.ip);
        // Get IP
        const ip = request_ip_1.default.getClientIp(req) || "unknown";
        // Get user-agent and parse it
        const ua = req.headers["user-agent"] || "";
        console.log("User-Agent:", ua);
        const parser = new UAParser.UAParser(ua);
        const result = parser.getResult();
        const browser = result.browser.name || "Unknown";
        const os = result.os.name || "Unknown";
        const deviceType = result.device.type || "unknown";
        const sessionId = (0, uuid_1.v4)();
        console.log(`browser: ${browser}, os: ${os}, deviceType: ${deviceType} ip: ${ip}`);
        // Redis key: user info stored as hash
        yield index_1.default.hset(`visitor:${sessionId}`, {
            ip,
            browser,
            os,
            deviceType,
            timestamp: new Date().toISOString(),
        });
        // Redis counter: total unique users visited
        yield index_1.default.incr("totalVisitors");
        // res.cookie('sessionId', sessionId,{
        //   httpOnly: true,
        //   maxAge:1*60*60,
        //   path:'/'
        // });
        return res.status(200).json({ data: "User arrived", sessionId: sessionId });
    }
    catch (err) {
        console.error("Tracking error", err);
        res.status(500).json({ error: "Failed to track visitor" });
    }
});
exports.trackVisitor = trackVisitor;
const trackInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, interactions } = req.body;
        let events;
        try {
            events =
                typeof interactions === "string"
                    ? JSON.parse(interactions)
                    : interactions;
        }
        catch (parseErr) {
            return res.status(400).json({ error: "Invalid interactions format" });
        }
        if (!sessionId || !Array.isArray(events)) {
            return res.status(400).json({ error: "Invalid data format" });
        }
        const urlMap = new Map();
        for (const event of events) {
            const { pageUrl, elementTag, eventType, elementId, scrollPercent, timeSpent, } = event;
            if (!pageUrl)
                continue;
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
                    if (scrollPercent)
                        data.scrollDepths.push(scrollPercent);
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
                    }
                    else if (elementTag === "A") {
                        const prev = data.linkClicks.get(elementId) || 0;
                        data.linkClicks.set(elementId, prev + 1);
                    }
                    break;
            }
        }
        for (const [pageUrl, data] of urlMap.entries()) {
            let analytics = yield pageAnalyticsSchema_1.default.findOne({ pageUrl });
            if (!analytics) {
                analytics = new pageAnalyticsSchema_1.default({
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
            const mergeMap = (target, updates) => {
                if (!updates)
                    return;
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
            yield analytics.save();
        }
        return res
            .status(200)
            .json({ message: "Analytics processed successfully" });
    }
    catch (error) {
        console.error("Analytics processing error:", error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.trackInteraction = trackInteraction;
