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
        console.log("CONTEXT", process.env.NEXT_PUBLIC_STRAPI_URL);
        if (currentPublished_at != previousPublishedAt) {
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
