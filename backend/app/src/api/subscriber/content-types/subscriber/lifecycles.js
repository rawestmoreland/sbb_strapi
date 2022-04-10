module.exports = {
  async beforeCreate(event) {
    const { email } = event.params.data;
    console.log(`Before create: ${email}`);
    data.token = Buffer.from(email).toString("base64");
    const userCheck = await strapi.db
      .query("api::subscriber.subscriber")
      .findOne({ where: { email } });
    if (userCheck !== null) {
      await strapi.services.subscribers.sendVerify(data.email, data.token);
    }
  },
  async afterCreate(result) {
    if (result) {
      await strapi.services.subscribers.sendVerify(result.email, result.token);
    }
  },
};
