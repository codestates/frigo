require("dotenv").config();
const axios = require("axios");

module.exports = async (req, res) => {
  const code = req.body.authorizationCode;
  // console.log(code);
  const tokenUrl = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`;
  const access_token = await axios
    .post(tokenUrl, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
    .then((data) => {
      return data.data.access_token;
    })
    .catch((err) => {
      console.log("err=", err);
    });

  return res.status(200).send(access_token);
};
