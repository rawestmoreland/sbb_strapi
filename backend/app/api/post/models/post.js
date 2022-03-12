"use strict";

module.exports = {
  lifecycles: {
    async beforeUpdate(params, data) {
      if (data.published_at != null) {
        const { id } = params;
        const previousData = await strapi.query("post").findOne({ id });
        const previousPublishedAt = previousData.published_at;
        const currentPublished_at = data.published_at;
        const subList = await strapi
          .query("subscribers")
          .find({ activated: true });
        if (
          currentPublished_at != previousPublishedAt &&
          process.env.NEXT_STRAPI_SBB_URL.contains("sbb-strapi-prod")
        ) {
          subList.forEach(async (sub) => {
            await strapi.services.post.sendPost(
              sub.email,
              sub.token,
              previousData
            );
          });
        }
      }
    },
  },
};
