/* eslint-disable arrow-body-style */
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { oauth2Client } = require('../../config/oauth2');

// eslint-disable-next-line object-curly-newline, operator-linebreak
const { GOOGLE_REFRESH_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_SENDER_EMAIL } =
  process.env;

// set acccess token
oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

module.exports = {
  sendEmail: async (to, subject, html) => {
    const accessToken = await oauth2Client.getAccessToken();

    // set config transport
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: GOOGLE_SENDER_EMAIL,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });

    transport.sendMail({ to, subject, html });
  },

  getHtml: (fileName, data) => {
    return new Promise((resolve, reject) => {
      const path = `${__dirname}/../../views/template/email/${fileName}`;

      ejs.renderFile(path, data, (err, Data) => {
        if (err) {
          return reject(err);
        }
        return resolve(Data);
      });
    });
  },
};
