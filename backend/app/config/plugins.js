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
      provider: "strapi-provider-email-gmail",
      providerOptions: {
        userName: env("GMAIL_USERNAME"),
        clientId: env("OAUTH_CLIENT_ID"),
        clientSecret: env("OAUTH_CLIENT_SECRET"),
        refreshToken: env("OAUTH_REFRESH_TOKEN"),
      },
      settings: {
        defaultFrom: "smallbatchbru@gmail.com",
        defaultReplyTo: "smallbatchbru@gmail.com",
      },
    },
  },
});
