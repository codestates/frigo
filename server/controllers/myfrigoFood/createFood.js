const { myfrigoFood } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const { foodName, foodDate } = req.body;
  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  myfrigoFood.create({
    userId: accessTokenData.email,
    foodName,
    foodDate,
  });
  res.status(201).send({ message: "ok" });
};
