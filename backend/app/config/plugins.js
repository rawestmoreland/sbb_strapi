module.exports = ({ env }) => ({
  upload: {
    config: {
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
  },
  email: {
    config: {
      provider: env("EMAIL_PROVIDER"),
      providerOptions: {
        host: env("EMAIL_SMTP_HOST"),
        port: env("EMAIL_SMTP_PORT"),
        auth: {
          user: env("EMAIL_SMTP_USER"),
          pass: env("EMAIL_SMTP_PASS"),
        },
        // username: env("GMAIL_USERNAME"),
        // clientId: env("OAUTH_CLIENTID"),
        // clientSecret: env("OAUTH_CLIENT_SECRET"),
        // refreshToken: env("OAUTH_REFRESH_TOKEN"),
      },
      settings: {
        defaultFrom: "richard@smallbatchbru.com",
        defaultReplyTo: "richard@smallbatchbru.com",
      },
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "7d",
      },
    },
  },
});
