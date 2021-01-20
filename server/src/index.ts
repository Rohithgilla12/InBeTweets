import { FeedResolver } from "./resolvers/feed";
import { TweetResolver } from "./resolvers/tweet";

import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import TwitterApi from "twitter-api-v2";

const main = async () => {
  const conn = await createConnection();

  const twitterClient = new TwitterApi({
    appKey: process.env.CONSUMER_KEY,
    appSecret: process.env.CONSUMER_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
  }).readOnly;

  await conn.runMigrations();

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [FeedResolver, TweetResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      twitterClient,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
