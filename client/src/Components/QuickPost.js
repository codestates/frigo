import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuickPostBox = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  border: 2px solid black;
  border-radius: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  background-color: ${(props) => props.theme.bgColor.cyan};
  position: relative;
`;

const Input = styled.input`
  width: 300px;
  padding: 5px 20px;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 15px;
  font-size: ${(props) => props.theme.fontSize.small};
`;
const Text = styled.textarea`
  padding: 20px;
  width: 300px;
  height: 200px;
  border: 2px solid black;
  border-radius: 15px;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Label = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const Btn = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

const ExitBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  border: 2px solid black;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
`;

function QuickPost({ userinfo, accessToken }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(true);
  const { tags } = useParams();
  const navigate = useNavigate();

  const addPost = () => {
    setShow(false);
    axios
      .post(
        `http://localhost:4000/quickpost`,
        {
          title,
          tag: tags,
          content,
        },
        {
          headers: { "Content-Type": "application/json" },
          Authorization: accessToken,
          withCredentials: true,
        },
      )
      .then((res) => {
        navigate("/post");
      });
  };

  const ExitPost = () => {
    setShow(false);
  };

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const contentOnChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      {show ? (
        <Wrapper>
          <QuickPostBox>
            <ExitBtn onClick={ExitPost}>X</ExitBtn>
            <Label>Title</Label>
            <Input onChange={titleOnChange}></Input>
            <Label>Tags</Label>
            <Input defaultValue={tags}></Input>
            <Label>Content</Label>
            <Text onChange={contentOnChange}></Text>
            <Btn onClick={addPost}>Post</Btn>
          </QuickPostBox>
        </Wrapper>
      ) : null}
    </>
  );
}

export default QuickPost;
