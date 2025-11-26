import { SignUp } from "@clerk/clerk-react";
import { useEffect } from "react";

const Register = () => {
  useEffect(() => {
    console.log("Register component rendered");
  }, []);

  return (
    <div className="allcenter rounded-2xl border w-[70%] h-screen mx-auto text-7xl">
      <SignUp forceRedirectUrl="/explore" />
    </div>
  );
};

export default Register;
