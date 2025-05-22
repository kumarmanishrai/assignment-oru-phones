


import {TrackInteraction, TrackVisitor, UserLogIn, UserLogOut} from "../controller/userController";

import { Application, Request, Response, NextFunction } from "express";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res)).catch(next);

const UserRouter = (app: Application) => {
    app.post('/user/login', asyncHandler(UserLogIn))
    app.get('/user/logout', asyncHandler(UserLogOut))
    app.get('/user/track-visitor', asyncHandler(TrackVisitor))
    app.post('/user/track-interaction', asyncHandler(TrackInteraction))
}

export default UserRouter