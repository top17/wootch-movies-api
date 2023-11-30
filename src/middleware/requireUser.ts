import { Request, Response, NextFunction } from "express";
import { findUserById } from "../service/user.service";
import SessionModel from "../model/session.model";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.user?._id;

  if (!userId) {
    return res.sendStatus(403);
  }

  const user = await findUserById(userId);

  if (!user) {
    res.locals.user = null;
    return res.sendStatus(403);
  }

  const hasValidSession = await SessionModel.exists({
    user: userId,
    valid: true,
  });

  if (!hasValidSession) {
    res.locals.user = null;
    return res.sendStatus(403);
  }

  res.locals.user = user;

  return next();
};

export default requireUser;
