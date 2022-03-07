module.exports = {
  recipe: require("./apiController/recipe"),
  auth: require("./user/auth"),
  login: require("./user/login"),
  logout: require("./user/logout"),
  signup: require("./user/signup"),
  signout: require("./user/signout"),
  createFood: require("./myfrigoFood/createFood"),
  updateFood: require("./myfrigoFood/updateFood"),
  deleteFood: require("./myfrigoFood/deleteFood"),
};
