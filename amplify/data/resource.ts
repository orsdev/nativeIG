import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  User: a.model({
    name: a.string().required(),
    image: a.string(),
    bio: a.string(),
    username: a.string().required(),
    email: a.email().required(),
    website: a.url().required(),
    noOfPosts: a.integer().required(),
    noOfFollowers: a.integer().required(),
    noOfFollowings: a.integer().required(),
    posts: a.hasMany('Post', 'userId'),
    comments: a.hasMany('Comment', 'userId'),
    likes: a.hasMany('Like', 'userId')
  })
    .authorization(allow => [allow.publicApiKey()]),
  Post: a.model({
    description: a.string(),
    image: a.string(),
    images: a.string().array().required(),
    video: a.string(),
    createdAt: a.date().required(),
    userId: a.id().required(),
    user: a.belongsTo('User', 'userId'),
    comments: a.hasMany('Comment', 'postId'),
    likes: a.hasMany('Like', 'postId'),
    noOfComments: a.integer().required(),
    noOfLikes: a.integer().required()
  }).authorization(allow => [allow.publicApiKey()]),
  Comment: a.model({
    userId: a.id().required(),
    postId: a.id().required(),
    post: a.belongsTo('Post', 'postId'),
    user: a.belongsTo('User', 'userId'),
    comment: a.string().required()
  }).authorization(allow => [allow.publicApiKey()]),
  Like: a.model({
    userId: a.id().required(),
    postId: a.id().required(),
    user: a.belongsTo('User', 'userId'),
    post: a.belongsTo('Post', 'postId')
  }).authorization(allow => [allow.publicApiKey()])
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});