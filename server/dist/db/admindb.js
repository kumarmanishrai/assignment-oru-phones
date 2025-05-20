"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .catch((err) => {
    console.log("connection error: " + err.message);
});
const mongo = mongoose_1.default.connection;
exports.default = mongo;
