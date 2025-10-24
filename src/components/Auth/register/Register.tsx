import { useEffect } from "react";

const Register = () => {
  useEffect(() => {
    console.log("Register component rendered");
  }, []);

  return (
    <div className="allcenter border w-[70%] h-screen mx-auto text-7xl">
      Register
    </div>
  );
};

export default Register;
