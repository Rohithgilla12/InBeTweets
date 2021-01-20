import { Feed } from "./Feed";
import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class Tweet extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  authorId!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @Field(() => String)
  @Column()
  timeStamp!: Date;

  @Field(() => Int)
  @ManyToOne((_type) => Feed, (feed) => feed.tweets)
  feedId!: number;
}
