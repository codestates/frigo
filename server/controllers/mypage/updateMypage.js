const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const crypto = require("crypto");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { username, password } = req.body;
  const { id } = req.params;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  // salt 생성
  const createSalt = () => crypto.randomBytes(32).toString("hex");

  // password 해싱 함수
  const createHashedPassword = (password) => {
    const salt = createSalt();

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1, 32, "sha512")
      .toString("hex");
    return { hashedPassword, salt };
  };

  const { hashedPassword, salt } = createHashedPassword(password);

  user
    .update({ username, password: hashedPassword, salt }, { where: { id } })
    .then((data) => {
      user.findOne({ where: { id } }).then((data) => {
        return res
          .status(201)
          .json({ data: { userInfo: data.dataValues }, message: "ok" });
      });
    });
};
