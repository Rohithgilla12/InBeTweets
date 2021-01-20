import { Feed } from "./../entities/Feed";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world2";
  }

  @Query(() => [Feed])
  async feed() {
    const feeds = await Feed.createQueryBuilder("feed")
      .innerJoinAndSelect("feed.tweets", "tweets")
      .getMany();

    console.log(feeds);

    if (feeds) {
      return feeds;
    }
    return [];
  }
}
