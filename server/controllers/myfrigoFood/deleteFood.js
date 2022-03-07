const { myfrigoFood } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.headers.authorization);
  const { foodId } = req.params; // req.params는 foodId:2

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }
  myfrigoFood.destroy({ where: { id: foodId } });
  return res.status(201).send({ message: "ok" });
};
