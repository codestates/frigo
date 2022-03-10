import styled from "styled-components";

const RecipeItem = styled.li`
  list-style: none;
  width: 100%;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 3px solid black;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.bgColor.green};
`;

const RecipeFoodImg = styled.img`
  //background-color: ${(props) => props.theme.bgColor.black};
  //cursor: pointer;
  width: 400px;
  display: block;
  margin: 0px auto;
  //display: inline-block;
  padding-bottom: 10px;
`;

//const ManualList = styled.li``;

const RecipeName = styled.div`
  font-size: 30px;
  padding-top: 20px;
  width: 400px;
  //display: absolute;
  display: block;
  text-align: center;
`;

const RecipeDtls = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  padding-top: 20px;
  width: 400px;
  //align-items: center;
  display: inline-block;
  text-align: left;
`;

function RecipeListItem({ id, name, img_path, dtls, math }) {
  console.log(math);

  // let navigate = useNavigate();
  // const handleClick = () => {
  //   navigate(`/${id}`);
  // }

  return (
    <RecipeItem>
      {/* <RecipeFoodImg src={img_path} onClick={handleClick} /> */}
      <RecipeFoodImg src={img_path} />
      <RecipeName>{name}</RecipeName>
      <RecipeDtls>{dtls}</RecipeDtls>
    </RecipeItem>
  );
}

export default RecipeListItem;
