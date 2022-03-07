const axios = require("axios");

module.exports = (req, res) => {
  const { keyword } = req.body;
  const keyId = "607eeb411bbe475e9319";
  const serviceId = "COOKRCP01";
  const dataType = "json";
  const startIdx = "1";
  const endIdx = "20";
  axios
    .get(
      `http://openapi.foodsafetykorea.go.kr/api/${keyId}/${serviceId}/${dataType}/${startIdx}/${endIdx}/RCP_PARTS_DTLS=${encodeURI(
        keyword,
      )}`,
      {
        withCredentials: true,
      },
    )
    .then((data) => {
      //   console.log(data.data);
      return res.status(200).json(data.data);
    });
};
