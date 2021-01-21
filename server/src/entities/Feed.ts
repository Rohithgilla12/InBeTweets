import { Tweet } from "./Tweet";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Feed extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  creator?: string;

  @Field(() => String)
  @Column()
  name!: String;

  @Field(() => [String])
  @Column("text", { array: true })
  usernames: string[];

  @Field(() => String)
  @Column()
  startDate!: Date;

  @Field(() => String)
  @Column()
  endDate!: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((_type) => Tweet, (tweet) => tweet.feedId)
  tweets: Tweet[];
}
