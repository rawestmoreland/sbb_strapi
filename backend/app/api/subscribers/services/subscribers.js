"use strict";
const { baseURL } = require("../../../config/functions/utils/helpers");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  sendVerify: async (email, token) => {
    console.log("sending email");
    await strapi.plugins["email"].services.email.send({
      to: email,
      from: "smallbatchbru@gmail.com",
      replyTo: "richard@smallbatchbru.com",
      subject: "Confirm your email for smallbatchbru.com",
      text: `${baseURL}/confirm?token=${token}`,
      html: `
      <div style="width:100%; height:100%;">
        <table style="margin:0 auto; text-align:center;">
          <tr>
            <td><h1>🍻 SmallBatchBru Newsletter 🍻</h1></td>
          </tr>
          <tr>
            <td><h2>Please confirm your email</h2></td>
          </tr>
          <tr>
            <td>
              <a href="${baseURL}/confirm?token=${token}">Click here to confirm your email</a>
            </td>
          </tr>
        </table>
      </div>`,
    });
  },
};
