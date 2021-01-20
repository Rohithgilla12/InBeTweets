import { Feed } from "./../entities/Feed";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class FeedResolver {
  @Query(() => [Feed])
  async feed() {
    const feeds = await Feed.find({});

    if (feeds) {
      return feeds;
    }
    return [];
  }
}
