const { post, like, comment } = require("../../models");
const { tagStringToArray } = require("../function/functions");

module.exports = (req, res) => {
  // postList 저장
  post.findAll().then((data) => {
    const postList = data.map((item) => {
      const post = item.dataValues;
      const tagArray = tagStringToArray(post.tag);
      post["tag"] = tagArray;
      post["ddabong"] = "ok";
      return post;
    });

    // likeList 저장
    like.findAll().then((data) => {
      const likeList = data.map((item) => {
        return item.dataValues;
      });

      comment.findAll().then((data) => {
        const commentList = data.map((item) => {
          return item.dataValues;
        });
        console.log(postList);
        let arr = [];
        let bigNum = 0;
        for (let i = 0; i < postList.length; i++) {
          if (bigNum < postList[i].id) {
            bigNum = postList[i].id;
          }
        }
        for (let i = 0; i <= bigNum; i++) {
          arr.push([]);
        }

        console.log(commentList);
        commentList.map((el) => {
          arr[el.postId].push(el);
        });

        for (let i = 0; i < postList.length; i++) {
          postList[i].comment = arr[i + 1];
          if (!likeList[i]) {
            postList[i].ddabong = "false";
          } else if (
            postList[i].id === likeList[i].postId &&
            postList[i].userId === likeList[i].userId
          ) {
            postList[i].ddabong = likeList[i].ddabong;
          }
        }

        return res.status(200).send(postList);
      });
    });
  });
};
