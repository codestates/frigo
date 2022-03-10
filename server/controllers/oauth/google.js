require("dotenv").config();
const axios = require("axios");

module.exports = async (req, res) => {
  console.log(req.body);
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token`,
    headers: {
      accept: "application/json",
    },
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.body.authorizationCode,
    },
  })
    .then((response) => {
      console.log(response.data.access_token);
      const accessToken = response.data.access_token;
      res.status(200).json({ access_Token: accessToken });
    })
    .catch((e) => {
      res.status(404);
    });
};
