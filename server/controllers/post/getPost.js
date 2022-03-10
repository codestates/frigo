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
        // for (let i = 0; i < commentList.length; i++) {
        //   // console.log("====================", commentList[0]);
        //   arr[commentList[i].postId].push(commentList[i]);
        // }
        console.log(commentList);
        commentList.map((el) => {
          // console.log("=================", el.postId - 1);
          // console.log("=================", el);
          arr[el.postId].push(el);
          // console.log("===========================", arr[el.postId]);
        });
        // console.log(...arr);
        // postList[i]를 조회하면서
        for (let i = 0; i < postList.length; i++) {
          // postList[i]의 id, userId와 likeList[i]의 postId, userId가 같다면
          postList[i].comment = arr[i + 1];
          if (!likeList[i]) {
            postList[i].ddabong = "false";
          } else if (
            postList[i].id === likeList[i].postId &&
            postList[i].userId === likeList[i].userId
          ) {
            // likeList[i]의 따봉을 postList[i]의 따봉에 넣어라.
            postList[i].ddabong = likeList[i].ddabong;
            // } else {
            //   postList[i].ddabong = "false";
          }
        }
        // console.log("postList 이후", postList);
        return res.status(200).send(postList);
      });
    });
  });
};
