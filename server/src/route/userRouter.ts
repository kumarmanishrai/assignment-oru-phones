


import {TrackInteraction, TrackVisitor, UserLogIn, UserLogOut, IsUser, CreateUser} from "../controller/userController";

import { Application, Request, Response, NextFunction } from "express";
import { UserAuthorization } from "../middleware/userAuthorization";
import { UserAuthentication } from "../middleware/userAuthentication";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res)).catch(next);

const UserRouter = (app: Application) => {
    app.post('/user/create', asyncHandler(CreateUser))
    app.post('/user/login', asyncHandler(UserLogIn))
    app.get('/user/logout', UserAuthorization, asyncHandler(UserLogOut))
    app.get('/user/role', UserAuthorization, asyncHandler(IsUser))
    app.get('/user/track-visitor', asyncHandler(TrackVisitor))
    app.post('/user/track-interaction', asyncHandler(TrackInteraction))
}

export default UserRouter