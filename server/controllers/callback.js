require("dotenv").config();
const axios = require("axios");
// 먼저 프론트에서 유저가 구글 로그인 시 URL에 나오는 인증코드를 서버로 보내줘야한다.

// 프론트에서 아래 로그인 url로 유저가 로그인하도록 함
// 프론트 참고 : https://velog.io/@tkdfo93/%EA%B5%AC%EA%B8%80-OAuth2.0-Final-Project
// const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
// https://accounts.google.com/o/oauth2/v2/auth?client_id=623051411176-clvs5rk950pqumbgqopsti4bc0egusds.apps.googleusercontent.com&redirect_uri=http://localhost:4000&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email

// 서버로 인증코드를 보내준다.
// const url = new URL(window.location.href);
// const authorizationCode = url.searchParams.get("code");
// useEffect(async () => {
//   const url = new URL(window.location.href);
//   const authorizationCode = url.searchParams.get("code");
//   await axios
//     .get(
//       "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
//         authorizationCode,
//       {
//         headers: {
//           authorization: authorizationCode,
//           accept: "application/json",
//         },
//       },
//     )
//     .then((data) => {
//       console.log(data);
//       setData(data);
//     })
//     .catch((e) => console.log("oAuth token expired"));
// }, []);

// 서버
// 프론트에서 받은 인증코드로 구글에 액세스 토큰을 받아온다.
module.exports = async (req, res) => {
  const code = req.body.authorizationCode;
  // console.log(code);
  const tokenUrl = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`;
  const access_token = await axios
    .post(tokenUrl, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
    .then((data) => {
      // console.log("-----------------------------------------------", data);
      return data.data.access_token;
    })
    .catch((err) => {
      console.log("err=", err);
    });

  return res.status(200).send(access_token);
};
