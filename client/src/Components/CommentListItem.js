import styled from "styled-components";

const PostCommentLeft = styled.div`
  display: flex;
`;

const PostCommentRight = styled.div`
  display: flex;
`;
const PostCommentWriter = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  margin-right: 50px;
`;

const PostCommentContent = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  margin-right: 5px;
`;

const PostCommentButton = styled.button`
  background-color: inherit;
  font-size: ${(props) => props.theme.fontSize.smallLarge};
  border: none;
  cursor: pointer;
`;

function CommentListItem({
  accessToken,
  isLogin,
  comId,
  postId,
  username,
  content,
  handleDelComModal,
}) {
  return (
    <>
      <PostCommentLeft>
        <PostCommentWriter>{username}</PostCommentWriter>
        <PostCommentContent>{content}</PostCommentContent>
      </PostCommentLeft>

      <PostCommentRight>
        <PostCommentButton onClick={() => handleDelComModal(comId)}>
          ✂️
        </PostCommentButton>
      </PostCommentRight>
    </>
  );
}

export default CommentListItem;
