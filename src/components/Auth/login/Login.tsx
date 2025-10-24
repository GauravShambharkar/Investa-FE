import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    console.log("Login component rendered");
  }, []);
  return (
    <>
      <div className="allcenter border w-[70%] h-screen mx-auto text-7xl ">
        Login
      </div>
    </>
  );
};

export default Login;
