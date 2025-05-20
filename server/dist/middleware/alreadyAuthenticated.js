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
exports.AlreadyAuthenticated = void 0;
require("express-session");
const index_1 = __importDefault(require("../index"));
const AlreadyAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.cookies);
    let sessionId = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["connect.sid"];
    if (sessionId) {
        sessionId = "admin:" + sessionId.slice(2).split(".")[0];
        console.log(sessionId);
    }
    if (!sessionId || typeof sessionId !== "string") {
        next();
        return;
    }
    const storedSessionId = (yield index_1.default.keys(sessionId)) || null;
    console.log("stored sessionId: ", storedSessionId);
    if (storedSessionId[0] === sessionId) {
        console.log(storedSessionId);
        console.log("here");
        res.status(200).send("Already Authenticated");
        return;
    }
    else {
        next();
        return;
    }
});
exports.AlreadyAuthenticated = AlreadyAuthenticated;
