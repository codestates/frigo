const { myfrigoFood } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const { newFoodName, newFoodDate } = req.body;
  const { foodId } = req.params; // req.params는 foodId:2
  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  myfrigoFood.update(
    { foodName: newFoodName, foodDate: newFoodDate },
    { where: { id: foodId } },
  );
  return res.status(201).send({ message: "ok" });
};
