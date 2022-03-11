import styled from "styled-components";
import { useState } from "react";
import { getRecipe } from "../api";
import Loading from "../Components/Loading";
import RecipeListItem from "../Components/RecipeListItem";

const RecipeList = styled.ul``;

const Wrapper = styled.div`
  width: 92%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchbarContainer = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 30px;
`;

const SearchInput = styled.input`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: left;
  justify-content: center;
  width: 80%;
  height: 2rem;
  padding-left: 10px;
  border: 2px solid;
  border-radius: 3px;
`;

const SearchButton = styled.button`
  background-color: ${(props) => props.theme.bgColor.skyblue};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.small};
  width: 15%;
  height: 2.4rem;
  margin-right: 40px;
  border: 2px solid;
  border-radius: 5px;
  cursor: pointer;
`;

const EmptyRecipeHolder = styled.span`
  padding-top: 50px;
  font-size: ${(props) => props.theme.fontSize.medium};
`;

function Recipe() {
  const [recipes, setRecipes] = useState({});
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleOnKeyPress = () => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    const list = await getRecipe(keyword);
    setRecipes(list.COOKRCP01);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <SearchbarContainer>
            <SearchInput
              onChange={handleChange}
              onkeyPress={handleOnKeyPress}
              placeholder={"재료의 이름으로 레시피를 검색하세요"}
            />
            <SearchButton onClick={handleClick}>Search</SearchButton>
          </SearchbarContainer>
          {recipes?.row ? (
            <RecipeList>
              {recipes?.row?.map((item, i) => (
                <RecipeListItem
                  key={i}
                  id={item.RCP_SEQ}
                  name={item.RCP_NM}
                  img_path={item.ATT_FILE_NO_MAIN}
                  dtls={item.RCP_PARTS_DTLS}
                  math={item}
                />
              ))}
            </RecipeList>
          ) : (
            <EmptyRecipeHolder>
              사용할 재료가 포함된 레시피가 검색됩니다
            </EmptyRecipeHolder>
          )}
        </Wrapper>
      )}
    </>
  );
}

export default Recipe;
