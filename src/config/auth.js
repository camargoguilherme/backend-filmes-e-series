export default {
  secret: process.env.APP_SECRET,
  salt: process.env.APP_SALT,
  expiresIn: '7d',
};
