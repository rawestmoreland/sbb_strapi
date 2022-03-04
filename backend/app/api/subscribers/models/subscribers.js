"use strict";

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      const { email } = data;
      console.log(`Before create: ${email}`);
      data.token = Buffer.from(email).toString("base64");
      const userCheck = await strapi.query("subscribers").findOne({ email });
      if (userCheck !== null) {
        console.log("Sending email");
        await strapi.services.subscribers.sendVerify(email, data.token);
      }
    },
    async afterCreate(result) {
      console.log(result);
      await strapi.services.subscribers.sendVerify(result.email, result.token);
    },
  },
};
