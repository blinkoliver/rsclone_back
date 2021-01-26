import { NextFunction, Request, Response } from "express";
import { getSessionByToken } from "../service/auth";
import { SessionType } from "../types/sessionType";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(400).json({
        statusCode: 400,
        reason:'No auth token is provided'
    });
    return;
  }
  const session: SessionType = await getSessionByToken(token);
  if (!session) {
    res.status(403).json({
      statusCode: 403,
    });
    return;
  }
  req.app.set("user_id", session.user_id);
  next();
};
