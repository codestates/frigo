import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Item = styled.ul`
  list-style: none;
  width: 100%;
  align-items: center;
  text-align: center;
  padding-top: 50px;
`;

const FoodImg = styled.img`
  //background-color: ${(props) => props.theme.bgColor.black};
  cursor: pointer;
  width: 60%;
  display: block;
  margin: 0px auto;
  //display: inline-block;
  padding-bottom: 10px;
`;

const ManualList = styled.li``;

const NameLine = styled.div`
  font-size: 30px;
  padding-top: 20px;
  //width: 50%;
  //display: absolute;
  display: block;
  text-align: center;
`;

const DtlsLine = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  padding-top: 20px;
  width: 60%;
  //align-items: center;
  display: inline-block;
  text-align: left;
`;

function RecipeListItem({ id, name, img_path, dtls, math }) {
  //console.log(math);

  // let navigate = useNavigate();
  // const handleClick = () => {
  //   navigate(`/${id}`);
  // }

  return (
    <Item>
      {/* <FoodImg src={img_path} onClick={handleClick} /> */}
      <FoodImg src={img_path} />
      <NameLine>{name}</NameLine>
      <DtlsLine>{dtls}</DtlsLine>
    </Item>
  );
}

export default RecipeListItem;
