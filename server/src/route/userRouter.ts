


import {trackInteraction, trackVisitor} from "../controller/userController";

import { Application, Request, Response, NextFunction } from "express";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res)).catch(next);

const UserRouter =(app: Application) => {
    app.get('/track-visitor', asyncHandler(trackVisitor))
    app.post('/track-interaction', asyncHandler(trackInteraction))
}

export default UserRouter