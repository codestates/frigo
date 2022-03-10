const { myfrigoFood } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const { calculateRemain } = require("../function/functions");

module.exports = (req, res) => {
  const { foodName, foodDate } = req.body;
  const accessTokenData = isAuthorized(req);
  const foodRemain = calculateRemain(foodDate);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  myfrigoFood.create({
    userId: accessTokenData.id,
    foodName,
    foodDate,
  });
  return res.status(201).send({
    userId: accessTokenData.id,
    foodName: foodName,
    foodDate: foodDate,
    foodRemain: foodRemain,
    message: "ok",
  });
};
