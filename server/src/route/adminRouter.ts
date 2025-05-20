
import { LogInAdmin, LogOutAdmin, AdminReport } from "../controller/adminController";
import { Application, Request, Response, NextFunction } from "express";
import { AdminAuthorization } from "../middleware/adminAuthorization";
import { AlreadyAuthenticated } from "../middleware/alreadyAuthenticated";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const AdminRouter = async (app: Application) => {
  app.post("/login/admin", AlreadyAuthenticated, asyncHandler(LogInAdmin));
  app.get("/logout/admin", AdminAuthorization, asyncHandler(LogOutAdmin));
  app.get('/admin/report', AdminAuthorization, asyncHandler(AdminReport))
};

export default AdminRouter;
