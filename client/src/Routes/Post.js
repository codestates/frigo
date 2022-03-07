import styled from "styled-components";
import QuickPost from "./QuickPost";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostList = styled.ul`
  width: 100%;
  height: 100%;
  margin-top: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostItem = styled.li``;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

function Post() {
  const { tags } = useParams();
  console.log(tags);
  return (
    <>
      <Wrapper>
        <PostList>
          {Array.from({ length: 40 }, () => "포스트").map((el, i) => (
            <PostItem key={i}>{el}</PostItem>
          ))}
        </PostList>
      </Wrapper>
      {tags !== undefined ? (
        <Box>
          <QuickPost />
        </Box>
      ) : null}
    </>
  );
}

export default Post;
