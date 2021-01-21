import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { TwitterMiddleware } from "./twitterMiddleware";

export type ServerContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  middleware: TwitterMiddleware;
};

export type TwitterTweet = {
  id: string;
  authorId: string;
  createdAt: string;
  tweetId: string;
  timeStamp: string;
  imageUrl?: string;
  text?: string;
};

export type FeedType = {
  id: string;
  creator: string;
  startDate: string;
  endDate: string;
  usernames: [string];
};
