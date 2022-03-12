"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  // Every 1 minute
  "*/1 * * * *": async () => {
    // fetch articles to publish
    console.log(`looking for things to publish at ${new Date()}`);
    const draftArticlesToPublish = await strapi.api.post.services.post.find({
      _publicationState: "preview",
      published_at_null: true,
      auto_publish: true,
      published_lt: new Date(),
    });

    await Promise.all(
      draftArticlesToPublish.map((post) => {
        console.log(`Publishing ${post.title}`);
        return strapi.api.post.services.post.update(
          { id: post.id },
          { published_at: new Date() }
        );
      })
    );
  },
};
