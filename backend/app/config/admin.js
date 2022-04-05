module.exports = ({ env }) => ({
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  auth: {
    secret: env("ADMIN_JWT_SECRET", "6d2d639f4e805fdf85750c28e2c1fec3"),
  },
});
