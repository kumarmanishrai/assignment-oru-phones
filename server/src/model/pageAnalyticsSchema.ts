import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PageAnalyticsSchema = new Schema(
  {
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
    topDevices:{
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
  },
  { timestamps: true }
);

export default mongoose.model("pageAnalyticsCollection", PageAnalyticsSchema);
