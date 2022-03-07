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
  background-color: ${(props) => props.theme.bgColor.green};
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

function QuickPost() {
  const { tags } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const addPost = () => {
    setShow(false);
    axios.post("https://localhost:3000/post").then((res) => {
      //버튼 누르면 QuickPost창이 사라져야 한다
    });
  };

  const ExitPost = () => {
    setShow(false);
  };

  return (
    <>
      {show ? (
        <Wrapper>
          <QuickPostBox>
            <ExitBtn onClick={ExitPost}>X</ExitBtn>
            <Label>Title</Label>
            <Input defaultValue="내 냉장고를 부탁해"></Input>
            <Label>Tags</Label>
            <Input defaultValue={tags}></Input>
            <Label>Content</Label>
            <Text defaultValue="레시피 추천 해주세요."></Text>
            <Btn onClick={addPost}>Post</Btn>
          </QuickPostBox>
        </Wrapper>
      ) : null}
    </>
  );
}

export default QuickPost;
