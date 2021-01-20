import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import TwitterApiReadOnly from "twitter-api-v2/dist/client/readonly";

export type ServerContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  twitterClient: TwitterApiReadOnly;
};
