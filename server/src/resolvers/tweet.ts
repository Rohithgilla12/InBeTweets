import { Tweet } from "./../entities/Tweet";
import { Resolver, Query, Arg } from "type-graphql";

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
}
