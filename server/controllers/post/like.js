const { post, like } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const { postId, plusOrMinus } = req.params;
  const accessTokenData = isAuthorized(req);
  console.log("accessTokenData", accessTokenData);
  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }
  const ddCnt = await post.findOne({ where: { id: postId } }).then((data) => {
    let count = data.dataValues.ddCnt;
    return count;
  });
  const likeTable = await like
    .findOne({
      where: { postId, userId: accessTokenData.id },
    })
    .then((data) => {
      return data;
    });

  if (!likeTable) {
    await like.create({
      userId: accessTokenData.id,
      postId,
    });
    post.update(
      {
        userId: accessTokenData.id,
        id: postId,
        ddCnt: ddCnt + 1,
      },
      { where: { id: postId } },
    );
  }

  if (likeTable) {
    const isDdabong = await like
      .findOne({ where: { postId: postId, userId: accessTokenData.id } })
      .then((data) => {
        let bool = data.dataValues.ddabong;
        return bool;
      });

    if (plusOrMinus === "plus" && isDdabong === "false") {
      post.update(
        {
          userId: accessTokenData.id,
          id: postId,
          ddCnt: ddCnt + 1,
        },
        { where: { id: postId } },
      );
      like.update(
        {
          ddabong: "true",
        },
        { where: { postId, userId: accessTokenData.id } },
      );
    }

    if (plusOrMinus === "minus" && isDdabong === "true") {
      post.update(
        {
          userId: accessTokenData.id,
          id: postId,
          ddCnt: ddCnt - 1,
        },
        { where: { id: postId } },
      );
      like.update(
        {
          ddabong: "false",
        },
        { where: { postId, userId: accessTokenData.id } },
      );
    }
  }
  return res.status(200).send({ message: "ok" });
};
//   if (plusOrMinus === "plus") {
//     const likeTable = await like
//       .findOne({
//         userId: accessTokenData.id,
//         postId,
//       })
//       .then((data) => {
//         return data;
//       });
//     if (!likeTable) {
//       await like.create({
//         userId: accessTokenData.id,
//         postId,
//       });
//       like.update(
//         {
//           ddabong: "true",
//         },
//         { where: { userId: accessTokenData.id, postId } },
//       );
//     }
//   }

//   // like 테이블의 ddabong 상태 가져오기
//   const isDdabong = await like
//     .findOne({ where: { postId: postId, userId: accessTokenData.id } })
//     .then((data) => {
//       let bool = data.dataValues.ddabong;
//       return bool;
//     });

//   // post 테이블의 ddCnt 가져오기(누적계산 위함
//   const ddCnt = await post.findOne({ where: { id: postId } }).then((data) => {
//     let count = data.dataValues.ddCnt;
//     return count;
//   });

//   if (plusOrMinus === "plus" && isDdabong === "false") {
//     post.update(
//       {
//         userId: accessTokenData.id,
//         id: postId,
//         ddCnt: ddCnt + 1,
//       },
//       { where: { id: postId } },
//     );
//     like.update(
//       {
//         ddabong: "true",
//       },
//       { where: { userId: accessTokenData.id, postId } },
//     );
//   }
//   if (plusOrMinus === "minus" && isDdabong === "true") {
//     post.update(
//       {
//         userId: accessTokenData.id,
//         id: postId,
//         ddCnt: ddCnt - 1,
//       },
//       { where: { id: postId } },
//     );
//     like.update(
//       {
//         ddabong: "false",
//       },
//       { where: { userId: accessTokenData.id, postId } },
//     );
//   }
//   return res.status(200).send({ message: "ok" });
// };
