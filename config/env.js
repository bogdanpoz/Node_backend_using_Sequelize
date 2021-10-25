require('dotenv').config()
const env = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  azure: {
    clientID: "0114a0e8-d794-4860-8b27-f476f6b87a7f",
    tenantID: "a6068b0a-21c4-40da-b4b5-bc4da6293d83",
    clientSecret: "8i_22w13T-b-TF1DmRiRqz.BoCz.D8anyW",
    callbackURL: "https://yurra-map.herokuapp.com/api/auth/callback"
  },
  iAuditor: {
    key: process.env.API_KEY,
    url: process.env.API_URL,
    template: process.env.TEMPLATE_ID
  }
};

module.exports = env;
