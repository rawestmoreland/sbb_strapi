module.exports = {
  async index(ctx) {
    const { token } = ctx.params;
    const user = await strapi.query("subscribers").findOne({ token });
    if (user) {
      const updatedUser = await strapi
        .query("subscribers")
        .update({ token }, { activated: false });
      return updatedUser;
    }
  },
};
