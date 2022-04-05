module.exports = {
  async beforeUpdate(event) {
    const { params } = event;
    const { data } = params;
    if (data.publishedAt !== null) {
      const { id } = params.where;
      const previousData = await strapi.db
        .query("api::post.post")
        .findOne({ where: { id } });
      const previousPublishedAt = previousData.publishedAt;
      const currentPublishedAt = data.pubslishedAt;
      const subList = await strapi.db
        .query("api::subscriber.subscriber")
        .findMany({ where: { activated: true } });
      if (currentPublishedAt !== previousPublishedAt) {
        for (sub of subList) {
          console.log(`Sneding an email to ${sub.email}`);
        }
      }
    }
  },
};
