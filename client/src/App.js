import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Myfrigo from "./Routes/Myfrigo";
import Recipe from "./Routes/Recipe";
import Post from "./Routes/Post";
import QuickPost from "./Routes/QuickPost";
import Nav from "./Components/Nav";
import MyPage from "./Routes/Mypage";
import Logout from "./Routes/Logout";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [userinfo, setUserinfo] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = async () => {
    const data = await axios.get("https://localhost:3000/auth", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (data) {
      setIsLogin(true);
      setUserinfo(data.data.data.userInfo);
      navigate("/");
    }
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleLogout = () => {
    axios.post("https://localhost:3000/logout").then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      navigate("/");
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
      {isLogin ? <Nav isLogin={isLogin} /> : <Nav />}
      <Routes>
        <Route
          path="/"
          element={<Login handleResponseSuccess={handleResponseSuccess} />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/myfrigo" element={<Myfrigo isLogin={isLogin} />}></Route>
        <Route path="/mypage" element={<MyPage userinfo={userinfo} />}></Route>
        <Route path="/recipe" element={<Recipe />}></Route>
        <Route path="/post" element={<Post />}>
          <Route path=":tags" element={<QuickPost />} />
        </Route>
        <Route
          path="/logout"
          element={<Logout handleLogout={handleLogout} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
