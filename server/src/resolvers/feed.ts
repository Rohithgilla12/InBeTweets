import { Feed } from "./../entities/Feed";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
} from "type-graphql";

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

  @Query(() => Feed)
  async getFeed(@Arg("id", () => Int) id: number) {
    return await Feed.findOne({ id: id });
  }

  @Mutation(() => Feed)
  async createFeed(@Arg("input") input: FeedInput): Promise<Feed> {
    return Feed.create({
      ...input,
    }).save();
  }
}
