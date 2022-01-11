# Small Batch Bru Blog

This is the third iteration of the Small Batch Bru homebrewing blog.

I've decided to go with Strapi since it can be self-hosted.

## Frontend

- NextJS frontend application
- Fetch blog posts with graphql from Strapi backend
- /api routes to pull data from the Brewfather brewing software API

## Backend

- Strapi CMS running a postgres database on Heroku
- Potentially move to Digital Ocean in the future if Heroku doesn't work out
- cron.js runs every minute to publish posts with a published date in the past

## TODO

- [ ] email subscribers when new post is published
