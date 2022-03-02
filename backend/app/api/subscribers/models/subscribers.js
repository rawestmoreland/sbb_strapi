"use strict";

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      const { email } = data;
      data.token = Buffer.from(email).toString("base64");
      const userCheck = await strapi.query("subscribers").findOne({ email });
      if (userCheck !== null) {
        await strapi.services.subscribers.sendVerify(email, data.token);
      }
    },
    async afterCreate(result) {
      await strapi.services.subscribers.sendVerify(result.email, result.token);
    },
  },
};
