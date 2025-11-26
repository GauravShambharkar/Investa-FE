import { SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    console.log("Login component rendered");
  }, []);
  return (
    <>
      <div className="allcenter rounded-2xl border w-[70%] h-screen mx-auto text-7xl ">
        <SignIn forceRedirectUrl="/explore" />
      </div>
    </>
  );
};

export default Login;
