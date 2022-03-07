import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { lightTheme } from "../Theme";
import Frigo from "../Images/frigo.png";
import axios from "axios";
import { useState } from "react";

const ErrorMessage = styled.span`
  position: fixed;
  display: table-cell;
  padding-top: 5px;
  padding-left: 90px;
`;

const Center = styled.div`
  display: flex;
  padding: 200px 0px;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Img = styled.img`
  position: absolute;
  width: 600px;
  height: 85%;
  z-index: -1;
  top: 80px;
`;

const TitleForm = styled.form`
  background-color: ${(props) => props.theme.bgColor.green};
  width: 20rem;
  height: 2rem;
  padding: 1rem;
  margin-top: 20px;
  border: 2px solid;
  border-radius: 5px;
  display: inline-block;
`;
const LoginForm = styled.form`
  background-color: ${(props) => props.theme.bgColor.green};
  width: 20rem;
  height: 10rem;
  padding: 1rem;
  margin-top: 10px;
  border: 2px solid;
  border-radius: 5px;
  display: inline-block;
`;

const TitleLine = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const EmailInput = styled.input`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: center;
  width: 14rem;
  height: 1.5rem;
  border: 2px solid;
  border-radius: 5px;
`;

const PasswordInput = styled.input`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: center;
  width: 14rem;
  height: 1.5rem;
  margin-top: 20px;
  border: 2px solid;
  border-radius: 5px;
`;

const Button = styled.button`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.small};
  margin-top: 20px;
  width: 6rem;
  height: 2rem;
  border: 2px solid;
  border-radius: 5px;
  cursor: pointer;
`;
const LoginBtn = styled(Button)``;

const CommentLine = styled.div`
  margin-top: 20px;
  font-size: 15px;
`;

function Login({ handleResponseSuccess }) {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onVaild = (data) => {
    if (data) {
      const { email, password } = data;

      axios
        .post(
          "https://localhost:4000/signin",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        )
        .then(() => {
          handleResponseSuccess();
        })
        .catch((err) => console.log(err));
    } else {
      setErrorMessage("이메일과 비밀번호를 입력하세요");
    }
  };

  return (
    <>
      <Center>
        <Img src={Frigo} />
        <TitleForm>
          <TitleLine>Frigo</TitleLine>
        </TitleForm>
        <LoginForm
          onSubmit={handleSubmit(onVaild)}
          action="http://frigo.com/login"
        >
          <EmailInput
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[0-9A-Z]([-_\.]?[0-9A-Z])*@[0-9A-Z]([-_\.]?[0-9A-Z])*\.[A-Z]{2,6}$/i,
                message: "Please enter a valid email",
              },
            })}
            placeholder="이메일을 입력하세요"
          />
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          <PasswordInput
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: "Your password is too short" },
            })}
            placeholder="비밀번호를 입력하세요"
          />
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          <LoginBtn>Login</LoginBtn>
          <CommentLine>
            아직 회원가입을 하지 않으셨다면 <Link to="/signup">여기</Link>로
            이동하세요
          </CommentLine>
        </LoginForm>
      </Center>
    </>
  );
}

export default Login;
