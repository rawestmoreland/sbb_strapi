"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/confirm-subscription/:token",
      handler: "custom-controller.confirm",
    },
    {
      method: "GET",
      path: "/cancel-subscription/:token",
      handler: "custom-controller.cancel",
    },
  ],
};
