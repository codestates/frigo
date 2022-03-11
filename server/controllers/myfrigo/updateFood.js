const { myfrigoFood } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const { calculateRemain } = require("../function/functions");

module.exports = (req, res) => {
  const { foodName, foodDate, newFoodName, newFoodDate } = req.body;
  const accessTokenData = isAuthorized(req);
  const foodRemain = calculateRemain(foodDate);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  myfrigoFood.update(
    { foodName: newFoodName, foodDate: newFoodDate },
    { where: { foodName, foodDate } },
  );
  return res.status(201).send({
    userId: accessTokenData.id,
    foodName: newFoodName,
    foodDate: newFoodDate,
    foodRemain: foodRemain,
    message: "ok",
  });
};
