import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;
const interactionAnalyticsSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: false,
      index: true,
      ref: "userCollection",
    },
    device: {
      type: {
        type: String,
        required: false,
      },
      os: String,
      browser: String,
    },
    geo: {
      ip: {
        type: String,
      },
      country: {
        type: String,
      },
      region: {
        type: String,
      },
      lattitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
    },
    events: [
      {
        eventType: {
          type: String,
          required: true,
        },
        eventTag: {
          type: String,
        },
        eventId: {
          type: String,
        },
        pageUrl: {
          type: String,
          required: true,
          index: true,
        },

        timestamp: {
          type: Date,
          required: true,
        },
        scrollPercent: {
          type: Number,
        },
        timeSpent: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model(
  "interactionAnalyticsCollection",
  interactionAnalyticsSchema
);
