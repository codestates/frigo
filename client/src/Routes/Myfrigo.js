import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyfrigoImg from "../Images/myfrigo.png";
import Loading from "../Components/Loading";

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
  grid-template-columns: repeat(4, 1fr);
  background-color: inherit;
  height: 600px;
  margin-top: 100px;
  width: 600px;
  border: 5px solid black;
  padding: 10px;
`;

const Circle = styled(motion.div)`
  background-color: ${(props) => props.color};
  margin-bottom: 10px;
  height: 90px;
  width: 90px;
  place-self: center;
  border-radius: 100px;
  border: 2px solid ${(props) => props.theme.bgColor.black};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Modal = styled(motion.div)`
  width: 350px;
  height: 350px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.bgColor.green};
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  position: absolute;
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
  margin: 15px 2px 2px 2px;
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

const ExitBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  border: 2px solid black;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
`;

const ModalBtnBox = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  margin-bottom: 5px;
`;

function Myfrigo({ isLogin, accessToken }) {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [newIngre, setNewIgre] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, isLoading] = useState(false);
  const [foodList, setFoodList] = useState([
    { foodName: "당근", foodRemain: "green" },
    { foodName: "양파", foodRemain: "yellow" },
    { foodName: "부추", foodRemain: "red" },
    { foodName: "치킨", foodRemain: "green" },
    { foodName: "족발", foodRemain: "yellow" },
    { foodName: "두부", foodRemain: "red" },
    { foodName: "양상추", foodRemain: "yellow" },
    { foodName: "양배추", foodRemain: "green" },
    { foodName: "생수", foodRemain: "green" },
    { foodName: "오렌지", foodRemain: "yellow" },
    { foodName: "포도", foodRemain: "green" },
    { foodName: "망고", foodRemain: "red" },
    { foodName: "파인애플", foodRemain: "green" },
    { foodName: "식초", foodRemain: "green" },
    { foodName: "간장", foodRemain: "red" },
    { foodName: "피망", foodRemain: "yellow" },
    { foodName: "소금", foodRemain: "yellow" },
  ]);

  //마이프리고 접속시 DB에서 데이터 받아오는 코드
  useEffect(() => {
    isLoading(true);
    axios
      .get("http://localhost:4000/myfrigo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        withCredentials: true,
      })
      .then((res) => {
        isLoading(false);
        const realFoodList = res.data;
        setFoodList(realFoodList);
      });
  }, []);

  const QuickPost = () => {
    navigate(`/post/${foodList.map((food) => food.foodName).join()}`);
  };

  const onChangeIngredient = (e) => {
    setIngredient(e.target.value);
  };

  const onChangeNewIngre = (e) => {
    setNewIgre(e.target.value);
  };

  const onChangeExpriyDate = (e) => {
    setExpiryDate(e.target.value);
  };

  const onChangeNewExpiry = (e) => {
    setNewExpiry(e.target.value);
  };

  const handleEdit = () => {
    console.log("EDIT");
    axios
      .patch(
        `http://localhost:4000/food`,
        {
          foodName: ingredient,
          foodDate: expiryDate,
          newFoodName: newIngre,
          newFoodDate: newExpiry,
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
        axios
          .get("http://localhost:4000/myfrigo", {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
            withCredentials: true,
          })
          .then((res) => {
            const realFoodList = res.data;
            setFoodList(realFoodList);
            // console.log(realFoodList);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    console.log("DELETE");
    axios
      .delete(`http://localhost:4000/food`, {
        data: {
          foodName: ingredient,
          foodDate: expiryDate,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        withCredentials: true,
      })
      .then((res) => {
        axios
          .get("http://localhost:4000/myfrigo", {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
            withCredentials: true,
          })
          .then((res) => {
            const realFoodList = res.data;
            setFoodList(realFoodList);
            // console.log(realFoodList);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = () => {
    console.log("ADD");
    axios
      .post(
        "http://localhost:4000/food",
        { foodName: ingredient, foodDate: expiryDate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        axios
          .get("http://localhost:4000/myfrigo", {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
            withCredentials: true,
          })
          .then((res) => {
            const realFoodList = res.data;
            setFoodList(realFoodList);
            console.log(realFoodList);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <MyFrigo src={MyfrigoImg} />
          <Wrapper>
            {foodList.map((food, index) => (
              <Circle
                color={food.foodRemain}
                key={index}
                drag
                dragElastic={1}
                dragMomentum={false}
              >
                {food?.foodName}
              </Circle>
            ))}
          </Wrapper>
          {show ? (
            <Modal>
              <ExitBtn onClick={() => setShow(false)}>X</ExitBtn>
              {open ? (
                <Title>기존 내용</Title>
              ) : (
                <Title>식품 추가 및 삭제</Title>
              )}
              <Input
                onChange={onChangeIngredient}
                required={true}
                placeholder="식품명을 입력하세요."
              ></Input>
              <Input
                onChange={onChangeExpriyDate}
                type="date"
                required={true}
              ></Input>
              {open ? (
                <>
                  <Title>변경 내용</Title>
                  <Input
                    onChange={onChangeNewIngre}
                    required={true}
                    placeholder="식품명을 입력하세요."
                  ></Input>
                  <Input
                    onChange={onChangeNewExpiry}
                    type="date"
                    required={true}
                  ></Input>
                </>
              ) : null}
              <ModalBtnBox>
                {open ? null : <Btn onClick={handleAdd}>Add</Btn>}
                {open ? (
                  <Btn
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    뒤로가기
                  </Btn>
                ) : (
                  <Btn
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    Edit
                  </Btn>
                )}
                {open ? <Btn onClick={handleEdit}>Confrim</Btn> : null}
                {open ? null : <Btn onClick={handleDelete}>Delete</Btn>}
              </ModalBtnBox>
            </Modal>
          ) : null}
          {isLogin ? (
            <BtnBox>
              <AddBtn onClick={() => setShow(true)}>재료</AddBtn>
              <PostBtn onClick={QuickPost}>내 냉장고를 부탁해</PostBtn>
            </BtnBox>
          ) : null}
        </Box>
      )}
    </>
  );
}

export default Myfrigo;
