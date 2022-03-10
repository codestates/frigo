const { post } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const { tagArrayToString } = require("../function/functions");

module.exports = (req, res) => {
  const { tag, title, content } = req.body;
  const { id } = req.params;
  const accessTokenData = isAuthorized(req);
  // console.log("태그이전", tag);
  const tagMap = tagArrayToString(tag);
  // console.log("태그이후", tagMap);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  post.update({ tag, title, content }, { where: { id } }).then((data) => {
    return res.status(201).send({
      tag: tagMap,
      title,
      content,
      message: "ok",
    });
  });
};
