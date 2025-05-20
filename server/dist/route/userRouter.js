"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controller/userController");
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);
const UserRouter = (app) => {
    app.get('/track-visitor', asyncHandler(userController_1.trackVisitor));
    app.post('/track-interaction', asyncHandler(userController_1.trackInteraction));
};
exports.default = UserRouter;
