import styled from "styled-components";
import Logo from "../Images/logo.png";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = styled.div`
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgColor.green};
  height: 80px;
`;
const NavLeftSide = styled.div``;
const NavRightSide = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 90px;
  height: 90px;
`;
const Menus = styled.ul`
  display: flex;
`;
const Menu = styled.li`
  font-size: ${(props) => props.theme.fontSize.small};
  padding: 10px 30px;
  position: relative;
  &:hover {
    color: ${(props) => props.theme.bgColor.cyan};
  }
`;

const Line = styled(motion.span)`
  position: absolute;
  width: 75px;
  height: 3px;
  top: 35px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor.cyan};
`;

function Nav({ isLogin }) {
  const loginMatch = useMatch("/");
  const signUpMatch = useMatch("/signup");
  const myFrigoMatch = useMatch("/myfrigo");
  const recipeMatch = useMatch("/recipe");
  const postMatch = useMatch("/post/*");
  const profileMatch = useMatch("/mypage");
  const logoutMatch = useMatch("/logout");
  const navigate = useNavigate();

  return (
    <Navbar>
      <NavLeftSide>
        <Link to="/">
          <Img src={Logo}></Img>
        </Link>
      </NavLeftSide>
      <NavRightSide>
        {isLogin ? (
          <Menus>
            <Link to="/">
              <Menu>Home {loginMatch ? <Line layoutId="line" /> : null}</Menu>
            </Link>
            <Link to="/mypage">
              <Menu>
                My page {profileMatch ? <Line layoutId="line" /> : null}
              </Menu>
            </Link>
            <Link to="/myfrigo">
              <Menu>
                My frigo {myFrigoMatch ? <Line layoutId="line" /> : null}
              </Menu>
            </Link>
            <Link to="/recipe">
              <Menu>
                Recipe {recipeMatch ? <Line layoutId="line" /> : null}
              </Menu>
            </Link>
            <Link to="/post">
              <Menu>Post {postMatch ? <Line layoutId="line" /> : null}</Menu>
            </Link>
            <Link to="/logout">
              <Menu>
                Logout {logoutMatch ? <Line layoutId="line" /> : null}
              </Menu>
            </Link>
          </Menus>
        ) : (
          <Menus>
            <Link to="/">
              <Menu>Login {loginMatch ? <Line layoutId="line" /> : null}</Menu>
            </Link>
            <Link to="/signup">
              <Menu>
                Signup {signUpMatch ? <Line layoutId="line" /> : null}
              </Menu>
            </Link>
            <Link to="/myfrigo">
              <Menu>
                My frigo {myFrigoMatch ? <Line layoutId="line" /> : null}
              </Menu>
            </Link>
            <Link to="/recipe">
              <Menu>
                Recipe {recipeMatch ? <Line layoutId="line" /> : null}
              </Menu>
            </Link>
            <Link to="/post">
              <Menu>Post {postMatch ? <Line layoutId="line" /> : null}</Menu>
            </Link>
          </Menus>
        )}
      </NavRightSide>
    </Navbar>
  );
}

export default Nav;
