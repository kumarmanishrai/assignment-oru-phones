


import {TrackInteraction, TrackVisitor, UserLogIn, UserLogOut, IsUser, CreateUser, UserLogInReport} from "../controller/userController";

import { Application, Request, Response, NextFunction } from "express";
import { UserAuthorization } from "../middleware/userAuthorization";
import { UserHasSessionId } from "../middleware/userHasSessionId";
import { UserHasNoSessionId } from "../middleware/userHasNoSessionId";
import { AdminAuthorization } from "../middleware/adminAuthorization";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res)).catch(next);

const UserRouter = (app: Application) => {
    app.post('/user/create',UserHasSessionId, asyncHandler(CreateUser))
    app.post('/user/login',UserHasSessionId, asyncHandler(UserLogIn))
    app.get('/user/logout', UserAuthorization, asyncHandler(UserLogOut))
    app.get('/user/role', UserAuthorization, asyncHandler(IsUser))
    app.get('/user/report/user-login', AdminAuthorization, asyncHandler(UserLogInReport))
    app.get('/user/track-visitor', UserHasNoSessionId, asyncHandler(TrackVisitor))
    app.post('/user/track-interaction', UserHasSessionId, asyncHandler(TrackInteraction))
}

export default UserRouter
