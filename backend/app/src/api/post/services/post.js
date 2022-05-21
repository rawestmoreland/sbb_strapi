"use strict";

const { getBaseURL } = require("../../../../utils/helpers");

const baseURL = getBaseURL();

/**
 * post service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::post.post", ({ strapi }) => ({
  sendPost: async (email, token, post) => {
    try {
      await strapi.plugins["email"].services.email.send({
        to: email,
        from: "smallbatchbru@gmail.com",
        replyTo: "richard@smallbatchbru.com",
        subject: `[New Post] ${post.title}`,
        text: `New post from SmallBatchBru! ${baseURL}/${post.slug}`,
        html: `
        <div
          style="max-width:75%; height:100%; margin:0 auto; background-color:whitesmoke; padding:2rem; color:#262626;">
          <table style="margin:0 auto; text-align:center;">
            <tr>
              <td>
                <h1 style="padding-bottom:1rem; border-bottom:2px solid #262626;">
                    🍻 SmallBatchBru Newsletter 🍻
                  </h1>
              </td>
            </tr>
            <tr>
              <td><h2>We've posted a new article.</h2></td>
            </tr>
            <tr>
              <td>
                <h3>
                  ${post.title}
                </h3>
                <span>by: ${post.author.name}</span>
              </td>
            </tr>
            <tr>
              <td>
                <a style="text-decoration:none;" href="${baseURL}/post/${post.slug}">
                  <p>
                    ${post.description}
                  </p>
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a style="font-size:11px;" href="${baseURL}/cancel?token=${token}">Unsubscribe</a>
              </td>
            </tr>
          </table>
        </div>`,
      });
    } catch (error) {
      console.warn(error[0].messages);
    }
  },
}));
