const { myfrigoFood } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { foodName, foodDate } = req.body;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }
  myfrigoFood.destroy({ where: { foodName, foodDate } });
  return res.status(201).send({ message: "ok" });
};
