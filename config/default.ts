export default {
  port: 3000,
  dbUri: process.env.MONGODB_URI,
  logLevel: "info",
  accessTokenPrivateKey: "",
  refreshTokenPrivateKey: "",
  smtp: {
    user: process.env.USER_SMTP,
    pass: process.env.PASS_SMTP,
    host: process.env.HOST_SMTP,
    port: process.env.PORT_SMTP,
    secure: true,
  },
};
