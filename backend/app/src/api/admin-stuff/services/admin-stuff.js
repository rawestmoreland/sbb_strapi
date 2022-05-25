'use strict';

/**
 * admin-stuff service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::admin-stuff.admin-stuff');
