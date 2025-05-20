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
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("../controller/adminController");
const adminAuthorization_1 = require("../middleware/adminAuthorization");
const alreadyAuthenticated_1 = require("../middleware/alreadyAuthenticated");
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const AdminRouter = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.post("/login/admin", alreadyAuthenticated_1.AlreadyAuthenticated, asyncHandler(adminController_1.LogInAdmin));
    app.get("/logout/admin", adminAuthorization_1.AdminAuthorization, asyncHandler(adminController_1.LogOutAdmin));
    app.get('/admin/report', adminAuthorization_1.AdminAuthorization, asyncHandler(adminController_1.AdminReport));
});
exports.default = AdminRouter;
