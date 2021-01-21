import TwitterApiReadOnly from "twitter-api-v2/dist/client/readonly";
import { TwitterTweet } from "./types";

// const tweets = await twitterClient.v2.get(`users/${user.data.id}/tweets`, {
//   start_time: "2021-01-15T00:00:00Z",
//   end_time: "2021-01-20T23:59:59Z",
// });

export class TwitterMiddleware {
  client: TwitterApiReadOnly;

  constructor(client: TwitterApiReadOnly) {
    this.client = client;
  }

  async getUserId(name: string): Promise<string | undefined> {
    const user = await this.client.v2.userByUsername(name);
    if (user.data) {
      return user.data.id;
    }
    return undefined;
  }

  async getTweetDataBy(tweetId: string): Promise<TwitterTweet | undefined> {
    try {
      const tweet = await this.client.v2.get(`tweets/${tweetId}`, {
        "tweet.fields": "author_id,created_at",
        expansions: "attachments.media_keys",
        "media.fields": "url",
      });

      const twitterTweet = {
        authorId: tweet.data.author_id,
        tweetId: tweet.data.id,
        timeStamp: tweet.data.created_at,
        text: tweet.data.text,
        imageUrl: tweet.includes?.media[0]?.url,
      } as TwitterTweet;

      return twitterTweet;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  // TODO: Fetching first 10 tweets for now. Have to take care of pagination key later
  async getTweetIds(
    id: string,
    start_time: string,
    end_time: string
  ): Promise<string[]> {
    const tweets = await this.client.v2.get(`users/${id}/tweets`, {
      start_time: start_time,
      end_time: end_time,
    });
    const data = tweets.data as [
      {
        id: string;
        text: string | undefined;
      }
    ];

    return data.map((item) => item.id);
  }
}
