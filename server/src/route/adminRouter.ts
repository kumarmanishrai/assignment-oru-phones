
import { LogInAdmin, LogOutAdmin, AdminReport, IsAdmin, CreateAdmin, UrlWiseReport } from "../controller/adminController";
import { Application, Request, Response, NextFunction } from "express";
import { AdminAuthorization } from "../middleware/adminAuthorization";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const AdminRouter = async (app: Application) => {
  app.post("/admin/create", asyncHandler(CreateAdmin));
  app.post("/admin/login", asyncHandler(LogInAdmin));
  app.get('/admin/role', AdminAuthorization, asyncHandler(IsAdmin));
  app.get("/admin/logout", AdminAuthorization, asyncHandler(LogOutAdmin));
  app.get('/admin/report', AdminAuthorization, asyncHandler(AdminReport))
  app.get('/admin/report/url', AdminAuthorization, asyncHandler(UrlWiseReport));

};

export default AdminRouter;

