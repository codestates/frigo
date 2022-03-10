const { post, comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { id } = req.params;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }
  comment.destroy({ where: { postId: id } });
  post.destroy({ where: { id } });
  return res.status(201).send({ message: "ok" });
};
