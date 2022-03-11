import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import EditPost from "./EditPost";
import CommentListItem from "./CommentListItem";

const PostItem = styled.li`
  list-style: none;
  width: 550px;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 3px solid black;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.bgColor.green};
`;

const PostCard = styled.div``;

const PostInCard = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSize.small};
  justify-content: space-between;
  margin: 10px;
  align-items: center;
`;
const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  margin: 5px 10px;
`;

const Count = styled.div`
  margin-right: 8px;
`;

const Name = styled.div``;

const Tags = styled.div``;

const Tag = styled.div`
  margin-left: 50px;
  color: ${(props) => props.theme.bgColor.cyan};
  font-size: ${(props) => props.theme.fontSize.small};
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.bgColor.white};
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: left;
  border: 2px solid black;
  margin: 5px;
  padding: 10px 20px;
`;

const Btn = styled.button`
  font-size: ${(props) => props.theme.fontSize.smallLarge};
  background-color: inherit;
  border: none;
  padding: 2px 3px;
  margin-right: 5px;
  cursor: pointer;
`;

const Like = styled(Btn)`
  margin-right: 6px;
`;

const LeftPost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RightPost = styled.div`
  display: flex;
  align-items: center;
`;

const MiddleBox = styled.div`
  display: flex;
  margin: 10px;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const PostCommentContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PostCommentInput = styled.input`
  width: 350px;
  padding: 7px 10px;
  margin: 10px;
  border: 2px solid black;
`;

const PostCommentList = styled.ul`
  list-style: none;
  width: 522px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 3px solid black;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.bgColor.green};
`;

const PostCommentBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 2px solid black;
  margin-bottom: 10px;
  width: 95%;
  height: 15px;
  background-color: ${(props) => props.theme.bgColor.white};
`;

const PostCommentButton = styled.button`
  background-color: inherit;
  font-size: ${(props) => props.theme.fontSize.smallLarge};
  border: none;
  cursor: pointer;
`;

const PostDelModalBox = styled.div`
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 400px;
  height: 300px;
  border: 2px solid black;
  border-radius: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  background-color: ${(props) => props.theme.bgColor.yellow};
`;

const PostDelModalNametag = styled.div`
  font-size: ${(props) => props.theme.fontSize.smallLarge};
  width: 100%;
  margin-top: 100px;
  padding-bottom: 30px;
  display: inline-block;
`;

const PostDelModalYesButton = styled.button`
  width: 120px;
  height: 40px;
  margin: 10px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

const PostDelModalNoButton = styled.button`
  width: 120px;
  height: 40px;
  margin: 10px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

const ComDelModalBox = styled.div`
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 400px;
  height: 300px;
  border: 2px solid black;
  border-radius: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  background-color: ${(props) => props.theme.bgColor.skyblue};
`;

const ComDelModalNametag = styled.div`
  font-size: ${(props) => props.theme.fontSize.smallLarge};
  width: 100%;
  margin-top: 100px;
  padding-bottom: 30px;
  display: inline-block;
`;

const ComDelModalYesButton = styled.button`
  width: 120px;
  height: 40px;
  margin: 10px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

const ComDelModalNoButton = styled.button`
  width: 120px;
  height: 40px;
  margin: 10px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

function PostListItem({
  isLogin,
  accessToken,
  id,
  userId,
  title,
  name,
  create,
  tag,
  postContent,
  comment,
  ddCnt,
  ddabong,
}) {
  const comList = comment.reverse();
  const [open, isOpen] = useState(ddabong);
  const [newComment, setNewComment] = useState("");
  const [editView, setEditView] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editTag, setEditTag] = useState("");
  const [editContent, setEditContent] = useState("");
  const [show, setShow] = useState(false);
  const [comShow, setComShow] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const navigate = useNavigate();

  const handleDelPostModal = () => {
    setShow(!show);
  };

  const handleDelNoPost = () => {
    setShow(!show);
    navigate("/post");
  };

  const handleDelYesPost = async () => {
    setShow(!show);
    await axios
      .delete(`http://localhost:4000/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        withCredentials: true,
      })
      .then((res) => {
        navigate("/recipe");
        navigate("/post");
      });
  };

  const handleAddComment = () => {
    axios
      .post(
        `http://localhost:4000/${id}`,
        {
          content: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        navigate("/recipe");
        navigate("/post");
      });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const DdaBongPlus = async () => {
    await axios.post(
      `http://localhost:4000/${id}/plus`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        withCredentials: true,
      },
    );
    isOpen("true");
    navigate("/recipe");
    navigate("/post");
  };

  const DdaBongMinus = async () => {
    await axios.post(
      `http://localhost:4000/${id}/minus`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        withCredentials: true,
      },
    );
    isOpen("false");
    navigate("/recipe");
    navigate("/post");
  };

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditTagChange = (e) => {
    setEditTag(e.target.value);
  };

  const handleEditContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditPostModal = () => {
    setEditView(!editView);
  };

  const handleEditCloseModal = () => {
    setEditView(!editView);
  };

  const handleEditPost = () => {
    setEditView(!editView);
    axios
      .patch(
        `http://localhost:4000/${id}`, //id수정
        {
          title: editTitle,
          tag: editTag,
          content: editContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        navigate("/recipe");
        navigate("/post");
      });
  };

  const handleDelComModal = (comId) => {
    setComShow(!comShow);
    setCommentId(comId);
  };

  const handleDelNoCom = () => {
    setComShow(!comShow);
    navigate("/post");
  };

  const handleDelYesCom = async () => {
    setComShow(!comShow);
    await axios.delete(
      `http://localhost:4000/${id}/${commentId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        withCredentials: true,
      },
    );
    navigate("/recipe");
    navigate("/post");
  };

  return (
    <PostItem>
      <PostCard>
        <Title>{title}</Title>
        <PostInCard>
          {isLogin ? (
            <LeftPost>
              {open === "true" ? (
                <Like onClick={DdaBongMinus}>👍</Like>
              ) : (
                <Like onClick={DdaBongPlus}>👍🏻</Like>
              )}
              <Btn onClick={handleEditPostModal}>🖊</Btn>
              <Btn onClick={handleDelPostModal}>✂️</Btn>
            </LeftPost>
          ) : null}
          <RightPost>{create}</RightPost>
        </PostInCard>
        <MiddleBox>
          <Count>따봉 {ddCnt}개</Count>
          <Name>{name}</Name>
        </MiddleBox>
        <Tags>
          <Tag>{tag.map((el) => `#${el} `)}</Tag>
        </Tags>
        <Content>{postContent}</Content>
      </PostCard>
      {isLogin ? (
        <PostCommentContainer>
          <PostCommentInput
            onChange={handleCommentChange}
            placeholder="댓글은 여기에 입력하세요"
          />
          <PostCommentButton onClick={handleAddComment}>✍️</PostCommentButton>
        </PostCommentContainer>
      ) : null}

      {comList.length !== 0 ? (
        <PostCommentList>
          {comList.map((el, i) => (
            <PostCommentBox key={i}>
              <CommentListItem
                accessToken={accessToken}
                isLogin={isLogin}
                comId={el.id}
                postId={el.postId}
                username={el.username}
                content={el.content}
                handleDelComModal={handleDelComModal}
              />
            </PostCommentBox>
          ))}
        </PostCommentList>
      ) : null}
      {editView ? (
        <EditPost
          title={title}
          tag={tag}
          content={postContent}
          handleEditCloseModal={handleEditCloseModal}
          handleEditPost={handleEditPost}
          handleEditTitleChange={handleEditTitleChange}
          handleEditTagChange={handleEditTagChange}
          handleEditContentChange={handleEditContentChange}
        />
      ) : null}
      {show ? (
        <PostDelModalBox>
          <PostDelModalNametag>
            작성하신 포스트를 삭제하실건가요?
          </PostDelModalNametag>
          <PostDelModalYesButton onClick={handleDelYesPost}>
            지울래요
          </PostDelModalYesButton>
          <PostDelModalNoButton onClick={handleDelNoPost}>
            아니예요
          </PostDelModalNoButton>
        </PostDelModalBox>
      ) : null}
      {comShow ? (
        <ComDelModalBox>
          <ComDelModalNametag>달아놓은 댓글을 삭제할까요?</ComDelModalNametag>
          <ComDelModalYesButton onClick={handleDelYesCom}>
            지울래요
          </ComDelModalYesButton>
          <ComDelModalNoButton onClick={handleDelNoCom}>
            아니예요
          </ComDelModalNoButton>
        </ComDelModalBox>
      ) : null}
    </PostItem>
  );
}

export default PostListItem;
