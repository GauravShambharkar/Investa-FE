import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import SubscriptionPlans from "../Plans/SubscriptionPlans";
import ProtectedRoute from "../Auth/ProtectRoute/ProtectRoute";
import GetStarted from "../Explore/Explore";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Home />} />
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <GetStarted />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Routing;
