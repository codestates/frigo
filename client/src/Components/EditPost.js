import styled from "styled-components";

const PostEditModalBox = styled.div`
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 400px;
  height: 600px;
  display: flex;
  border: 2px solid black;
  border-radius: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  background-color: ${(props) => props.theme.bgColor.yellow};
`;

const PostEditModalInput = styled.input`
  width: 300px;
  padding: 5px 20px;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 15px;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const PostEditModalContent = styled.textarea`
  padding: 20px;
  width: 300px;
  height: 200px;
  border: 2px solid black;
  border-radius: 15px;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const PostEditModalNametag = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const PostEditModalButton = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

const PostEditModalCloseButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  border: 2px solid black;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
`;
function EditPost({
  title,
  tag,
  content,
  handleEditPost,
  handleEditCloseModal,
  handleEditTitleChange,
  handleEditTagChange,
  handleEditContentChange,
}) {
  return (
    <PostEditModalBox>
      <PostEditModalCloseButton onClick={handleEditCloseModal}>
        X
      </PostEditModalCloseButton>
      <PostEditModalNametag>Title</PostEditModalNametag>
      <PostEditModalInput
        defaultValue={title}
        onChange={handleEditTitleChange}
        placeholder="제목은 여기에"
      />
      <PostEditModalNametag>Tags</PostEditModalNametag>
      <PostEditModalInput
        defaultValue={tag}
        onChange={handleEditTagChange}
        placeholder="태그는 여기에"
      />
      <PostEditModalNametag>Content</PostEditModalNametag>
      <PostEditModalContent
        defaultValue={content}
        onChange={handleEditContentChange}
        placeholder="내용은 여기에"
      />
      <PostEditModalButton onClick={handleEditPost}>Edit</PostEditModalButton>
    </PostEditModalBox>
  );
}

export default EditPost;
