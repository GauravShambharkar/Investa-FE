import { Route, Routes } from "react-router-dom";
import Register from "../Auth/register/Register";
import Login from "../Auth/login/Login";
import Home from "../Home/Home";
import GetStarted from "../Explore/Explore";
import SubscriptionPlans from "../Plans/SubscriptionPlans";
import ProtectedRoute from "../Auth/ProtectRoute/ProtectRoute";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <GetStarted />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/signup" element={<Register />} /> */}
        {/* <Route path="/signin" element={<Login />} /> */}
      </Routes>
    </>
  );
};

export default Routing;
