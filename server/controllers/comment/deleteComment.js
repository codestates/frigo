const { comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { postId, commentId } = req.params;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }
  comment.destroy({ where: { postId: postId, id: commentId } });
  return res.status(201).send({ message: "ok" });
};
