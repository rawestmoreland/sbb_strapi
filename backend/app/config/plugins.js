module.exports = ({ env }) => ({
  graphql: {
    endpoint: "/graphql",
    shadowCRUD: true,
    playgroundAlways: true,
    depthLimit: 7,
    amountLimit: 100,
    introspection: true,
    apolloServer: {
      tracing: false,
    },
  },
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
    actionOptions: {
      upload: {
        folder: env("CLOUDINARY_FOLDER"),
      },
      delete: {},
    },
  },
  email: {
    provider: "gmail-oauth2",
    providerOptions: {
      username: "smallbatchbru@gmail.com",
      clientId: env("OAUTH_CLIENTID"),
      clientSecret: env("OAUTH_CLIENT_SECRET"),
      refreshToken: env("OAUTH_REFRESH_TOKEN"),
    },
    settings: {
      defaultFrom: "richard@smallbatchbru.com",
      defaultReplyTo: "richard@smallbatchbru.com",
    },
  },
});
