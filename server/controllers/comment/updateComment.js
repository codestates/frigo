const { comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const { content } = req.body;
  const { commentId } = req.params; // commentId
  const accessTokenData = isAuthorized(req);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  comment.update({ content }, { where: { id: commentId } }).then((data) => {
    return res.status(201).send({
      content,
      //   createAt? updateAt?
      message: "ok",
    });
  });
};
