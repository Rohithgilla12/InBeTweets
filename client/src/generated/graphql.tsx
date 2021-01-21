import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Feed>;
  getFeed: Feed;
  tweets: Array<Tweet>;
};


export type QueryGetFeedArgs = {
  id: Scalars['Int'];
};


export type QueryTweetsArgs = {
  id: Scalars['Int'];
};

export type Feed = {
  __typename?: 'Feed';
  id: Scalars['Float'];
  creator?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  usernames: Array<Scalars['String']>;
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['Float'];
  tweetId: Scalars['String'];
  authorId: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  timeStamp: Scalars['String'];
  feedId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFeed: Feed;
  createTweets: Array<Tweet>;
};


export type MutationCreateFeedArgs = {
  input: FeedInput;
};


export type MutationCreateTweetsArgs = {
  id: Scalars['Float'];
};

export type FeedInput = {
  name?: Maybe<Scalars['String']>;
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  creator: Scalars['String'];
  usernames: Array<Scalars['String']>;
};

export type GetFeedQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetFeedQuery = (
  { __typename?: 'Query' }
  & { getFeed: (
    { __typename?: 'Feed' }
    & Pick<Feed, 'id' | 'name' | 'usernames' | 'startDate' | 'endDate' | 'creator'>
  ) }
);

export type FeedTweetsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FeedTweetsQuery = (
  { __typename?: 'Query' }
  & { tweets: Array<(
    { __typename?: 'Tweet' }
    & Pick<Tweet, 'id' | 'tweetId' | 'authorId' | 'text' | 'timeStamp'>
  )> }
);


export const GetFeedDocument = gql`
    query GetFeed($id: Int!) {
  getFeed(id: $id) {
    id
    name
    usernames
    startDate
    endDate
    creator
  }
}
    `;

/**
 * __useGetFeedQuery__
 *
 * To run a query within a React component, call `useGetFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFeedQuery(baseOptions: Apollo.QueryHookOptions<GetFeedQuery, GetFeedQueryVariables>) {
        return Apollo.useQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, baseOptions);
      }
export function useGetFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedQuery, GetFeedQueryVariables>) {
          return Apollo.useLazyQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, baseOptions);
        }
export type GetFeedQueryHookResult = ReturnType<typeof useGetFeedQuery>;
export type GetFeedLazyQueryHookResult = ReturnType<typeof useGetFeedLazyQuery>;
export type GetFeedQueryResult = Apollo.QueryResult<GetFeedQuery, GetFeedQueryVariables>;
export const FeedTweetsDocument = gql`
    query FeedTweets($id: Int!) {
  tweets(id: $id) {
    id
    tweetId
    authorId
    text
    timeStamp
  }
}
    `;

/**
 * __useFeedTweetsQuery__
 *
 * To run a query within a React component, call `useFeedTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedTweetsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFeedTweetsQuery(baseOptions: Apollo.QueryHookOptions<FeedTweetsQuery, FeedTweetsQueryVariables>) {
        return Apollo.useQuery<FeedTweetsQuery, FeedTweetsQueryVariables>(FeedTweetsDocument, baseOptions);
      }
export function useFeedTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedTweetsQuery, FeedTweetsQueryVariables>) {
          return Apollo.useLazyQuery<FeedTweetsQuery, FeedTweetsQueryVariables>(FeedTweetsDocument, baseOptions);
        }
export type FeedTweetsQueryHookResult = ReturnType<typeof useFeedTweetsQuery>;
export type FeedTweetsLazyQueryHookResult = ReturnType<typeof useFeedTweetsLazyQuery>;
export type FeedTweetsQueryResult = Apollo.QueryResult<FeedTweetsQuery, FeedTweetsQueryVariables>;