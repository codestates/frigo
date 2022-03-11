const { post } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const { tagArrayToString } = require("../function/functions");

module.exports = (req, res) => {
  const { tag, title, content } = req.body;
  const accessTokenData = isAuthorized(req);

  const tagMap = tagArrayToString(tag);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  post
    .create({
      userId: accessTokenData.id,
      tag: tagMap,
      title,
      content,
    })
    .then((data) => {
      return res.status(201).send({
        tag: tagMap,
        title,
        content,
        createdAt: data.dataValues.createdAt,
        message: "ok",
      });
    });
};
