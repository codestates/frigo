const { myfrigoFood } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const { calculateRemain } = require("../function/functions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const userId = accessTokenData.id;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  myfrigoFood
    .findAll({
      where: {
        userId,
      },
    })
    .then((data) => {
      const foodList = data.map((item) => {
        const food = item.dataValues;
        const foodRemain = calculateRemain(food.foodDate);
        food["foodRemain"] = foodRemain;
        return food;
      });
      return res.status(200).json(foodList);
    });
};
