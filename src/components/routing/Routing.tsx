import { Route, Routes } from "react-router-dom";
import Register from "../Auth/register/Register";
import Login from "../Auth/login/Login";
import Home from "../Home/Home";
import GetStarted from "../getStarted/GetStarted";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/getStarted" element={<GetStarted />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/signin" element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default Routing;
