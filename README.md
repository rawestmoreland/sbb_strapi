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

### Post content type

- Lifecycle hooks for emailing the list of subscribers when a new article is published.

### Subscriber content type

- A list of subscribers.
- Tokenize the email to base64 and use that in the URL param when they verify their email address.

## TODO

- [X] email subscribers when new post is published
- [ ] migrate to Strapi v4.
