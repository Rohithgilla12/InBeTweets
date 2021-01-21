import { Feed } from "./../entities/Feed";
import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";

@InputType()
class FeedInput {
  @Field({ nullable: true })
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field()
  creator?: string;

  @Field(() => [String])
  usernames: string[];
}

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

  @Mutation(() => Feed)
async createFeed(@Arg("input") input: FeedInput): Promise<Feed> {
    return Feed.create({
      ...input,
    }).save();
  }
}
