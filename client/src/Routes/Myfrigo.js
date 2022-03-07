import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyfrigoImg from "../Images/myfrigo.png";
import { getFood } from "../api";
import { Loading } from "../Components/Loading";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyFrigo = styled.img`
  margin-top: 100px;
  width: 1000px;
  height: 700px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: inherit;
  height: 600px;
  margin-top: 100px;
  width: 300px;
`;

const Circle = styled(motion.div)`
  background-color: ${(props) => props.color};
  margin-bottom: 10px;
  height: 90px;
  width: 90px;
  place-self: center;
  border-radius: 50px;
  border: 2px solid ${(props) => props.theme.bgColor.black};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
`;

const Modal = styled(motion.form)`
  width: 300px;
  height: 200px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.bgColor.green};
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
  text-align: center;
  border: 2px solid black;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Btn = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

const BtnBox = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 20%;
  top: 850px;
  justify-content: center;
  align-items: center;
`;

const AddBtn = styled(motion.button)`
  width: 190px;
  height: 30px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: ${(props) => props.theme.bgColor.green};
  border-radius: 15px;
  border: 2px solid black;
  margin-bottom: 20px;
  &:hover {
    background-color: ${(props) => props.theme.bgColor.cyan};
  }
`;

const PostBtn = styled(AddBtn)``;

const coldFood = Array.from({ length: 10 });

function Myfrigo({ isLogin }) {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [color, setColor] = useState("red");
  const [id, setId] = useState(null);
  const { isLoading, data } = useQuery(["food"], getFood);

  const QuickPost = async () => {
    //DB에서 유저아이디별로 저장되어있는 재료들을 받아온다.
    // const foodData = await axios.get(
    //   "https://localhost:3000/myfrigo/food/:userId",
    // );
    //받은 재료들을 POST창으로 넘기는데 어떻게 넘기지 -> url로 넘겨야될듯??
    //post로 url로 /post/당근,양배추,김치 이런식으로 넘김 -> 그럼 Post에서 useParmas를 사용해서 데이터를 가져오고 인풋창에 넣기
    navigate(
      `/post/${["당근", "양배추", "김치", "족발", "사골국물", "콜라"].join()}`,
    );
  };

  const onVaild = (data) => {
    // if (data) {
    //   const { foodName, NeedCheck } = data;
    //   axios
    //     .post(
    //       "https://localhost:3000/myfrigo/food",
    //       { foodName, NeedCheck },
    //       {
    //         headers: { "Content-Type": "application/json" },
    //         withCredentials: true,
    //       },
    //     )
    //     .then((res) => {
    //    //유통기한에 따른 원 색상 변경
    //    const date = res.foodDate;
    //    if (date > 0) {
    //      return setColor("green");
    //    } else if (-4 <= date < 0) {
    //      return setColor("yellow");
    //    } else {
    //      return setColor("red");
    //    }
    //  })
    //
    //
    //     .catch((err) => console.log(err));
    // } else {
    //   setErrorMessage("정확한 값을 입력하세요");
    // }
  };

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <Box>
          <Wrapper>
            {coldFood.map((food, index) => (
              <Circle
                color={color}
                // layoutId={index + ""}
                key={index}
                // onClick={() => setId(index + "")}
                drag
                dragElastic={1}
                dragMomentum={false}
                dragConstraints={{ right: 600 }}
              />
            ))}
          </Wrapper>

          <MyFrigo src={MyfrigoImg} />
          <Wrapper>
            {coldFood.map((food, index) => (
              <Circle
                color={color}
                // layoutId={String(index + 10)}
                key={index}
                // onClick={() => setId(String(index + 10))}
                drag
                dragElastic={1}
                dragMomentum={false}
                dragConstraints={{ right: 600 }}
              />
            ))}
          </Wrapper>
          <AnimatePresence>
            {id ? (
              <Overlay
                onClick={() => setId(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Modal
                  action="https://localhost:3000/myfrigo/food"
                  onSubmit={handleSubmit(onVaild)}
                  layoutId={id}
                >
                  <Input
                    {...register("foodName", {
                      required: "Foodname is required",
                    })}
                    placeholder="식품명을 입력하세요."
                  ></Input>
                  <Input
                    type="date"
                    {...register("date", { required: "Date is requied" })}
                  ></Input>
                  <Btn>Add</Btn>
                </Modal>
              </Overlay>
            ) : null}
          </AnimatePresence>
          {isLogin ? (
            <BtnBox>
              <AddBtn layoutId="enroll" onClick={() => setId("enroll")}>
                등록
              </AddBtn>
              <PostBtn onClick={QuickPost}>내 냉장고를 부탁해</PostBtn>
            </BtnBox>
          ) : null}
        </Box>
      )}
    </>
  );
}

export default Myfrigo;
