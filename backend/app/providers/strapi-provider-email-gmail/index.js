"use strict";

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
// Public node modules.
const nodemailer = require("nodemailer");
const { removeUndefined } = require("@strapi/utils");

/* eslint-disable no-unused-vars */
module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: providerOptions.username,
        clientId: providerOptions.clientId,
        clientSecret: providerOptions.clientSecret,
        refreshToken: providerOptions.refreshToken,
      },
    });

    return {
      send: (options) => {
        return new Promise((resolve, reject) => {
          const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } =
            options;

          let msg = {
            from: from || settings.defaultFrom,
            to,
            cc,
            bcc,
            replyTo: replyTo || settings.defaultReplyTo,
            subject,
            text,
            html,
            ...rest,
          };

          transporter.sendMail(removeUndefined(msg), function (err) {
            if (err) {
              reject([{ messages: [{ id: "Auth.form.error.email.invalid" }] }]);
            } else {
              resolve();
            }
          });
        });
      },
    };
  },
};
