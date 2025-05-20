"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PageAnalyticsSchema = new Schema({
    pageUrl: {
        type: String,
        required: true,
        unique: true,
    },
    totalTimeSpent: {
        type: Number,
        default: 0,
    },
    buttonClicks: {
        type: Map,
        of: Number,
        default: {},
    },
    linkClicks: {
        type: Map,
        of: Number,
        default: {},
    },
    categoryClicks: {
        type: Map,
        of: Number,
        default: {},
    },
    deviceClicks: {
        type: Map,
        of: Number,
        default: {},
    },
    scrollDepths: {
        type: [Number],
        default: [],
    },
    pageVisitCount: {
        type: Number,
        default: 0,
    },
    uniqueSessionIds: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("pageAnalyticsCollection", PageAnalyticsSchema);
