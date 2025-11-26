import { NavLink } from "react-router-dom";
import Routing from "../routing/Routing";
import {
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";

import { useEffect } from "react";

const Navbar = () => {
  const { isSignedIn } = useUser();

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-[70%] h-25 mx-auto  flex flex-col justify-center max-[850px]:w-[90%] ">
        <div className="flex items-center justify-between border px-5 py-3 rounded-full ">
          <NavLink to="/" className="flex items-center">
            <img src="investa.svg" alt="InvestaLogo" className="size-10" />
          </NavLink>

          {/* right side navigation elements */}

          <div className="flex gap-2  max-[550px]:hidden">
            <div className="p-1 ycenter rounded-full ">
              <NavLink
                to="/plans"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-100 bg-blue-500 transition-all ease-in-out duration-250 px-4 py-1 rounded-full ycenter"
                    : "text-[white] transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] "
                }
              >
                Plans
              </NavLink>
            </div>

            {isSignedIn && (
              <div className="border p-1 ycenter rounded-full flex gap-2">
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-100 bg-blue-500 transition-all ease-in-out duration-250 px-4 py-1 rounded-full ycenter"
                      : "text-[white] transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] "
                  }
                >
                  Explore
                </NavLink>
                <UserButton />
              </div>
            )}

            {!isSignedIn && (
              <div className="flex gap-2">
                <SignInButton>
                  <div className="p-1 ycenter rounded-full ">
                    <button className="text-[white] cursor-pointer transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52]">
                      Login
                    </button>
                  </div>
                </SignInButton>
                <SignUpButton>
                  <div className="border  p-1 ycenter rounded-full ">
                    <button className="text-[white] cursor-pointer transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52]">
                      SignUp
                    </button>
                  </div>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
      <Routing />
    </>
  );
};

export default Navbar;
