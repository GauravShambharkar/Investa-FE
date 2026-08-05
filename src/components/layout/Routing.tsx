import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../features/home/components/Home";
import Explore from "../../features/explore/components/Explore";
import SubscriptionPlans from "../../features/plans/components/SubscriptionPlans";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/news" replace />} />
      <Route path="/news" element={<Home />} />
      <Route path="/blogs" element={<Navigate to="/news" replace />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/plans" element={<SubscriptionPlans />} />
    </Routes>
  );
};

export default Routing;
