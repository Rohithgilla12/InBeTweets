import { Feed } from "./../entities/Feed";
import { Tweet } from "./../entities/Tweet";
import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql";
import { ServerContext } from "src/types";

// const user = await twitterClient.v2.userByUsername("gillarohith");

// const tweets = await twitterClient.v2.get(`users/${user.data.id}/tweets`, {
//   start_time: "2021-01-01T15:52:00Z",
//   end_time: "2021-01-20T15:52:00Z",
// });

@Resolver()
export class TweetResolver {
  @Query(() => [Tweet])
  async tweets(@Arg("id") id: number) {
    const tweets = await Tweet.find({
      where: {
        feedId: id,
      },
    });

    return tweets;
  }

  @Mutation(() => [Tweet])
  async createTweets(
    @Arg("id") id: number,
    @Ctx() { middleware }: ServerContext
  ) {
    const feed = await Feed.findOne(id);
    feed?.usernames.forEach(async (username) => {
      const userId = await middleware.getUserId(username);
      console.log(`${username} : ${userId}`);

      if (userId) {
        const tweetIds = await middleware.getTweetIds(
          userId,
          feed.startDate.toISOString(),
          feed.endDate.toISOString()
        );

        console.log(tweetIds);

        tweetIds.forEach(async (tweetId) => {
          const tweetData = await middleware.getTweetDataBy(tweetId);
          console.log(tweetData);
          if (tweetData) {
            await Tweet.create({
              authorId: tweetData.authorId,
              feedId: feed.id,
              tweetId: tweetData.tweetId,
              imageUrl: tweetData.imageUrl,
              timeStamp: tweetData.timeStamp,
              text: tweetData.text,
            }).save();
          }
        });
      }
    });

    const tweets = await Tweet.find({
      where: {
        feedId: id,
      },
    });

    return tweets;
  }
}
