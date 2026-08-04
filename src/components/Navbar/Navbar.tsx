import { NavLink } from "react-router-dom";
import Routing from "../routing/Routing";
import {
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();

  // Instant local storage cached auth state to eliminate login button layout jump on refresh
  const [cachedSignedIn, setCachedSignedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem("investa_is_signed_in") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        localStorage.setItem("investa_is_signed_in", "true");
        setCachedSignedIn(true);
      } else {
        localStorage.removeItem("investa_is_signed_in");
        setCachedSignedIn(false);
      }
    }
  }, [isLoaded, isSignedIn]);

  // Use Clerk state when loaded; fallback to fast local storage cache on frame 1
  const authenticated = isLoaded ? !!isSignedIn : cachedSignedIn;

  return (
    <>
      <div className="w-[70%] h-25 mx-auto flex flex-col justify-center max-[850px]:w-[90%]">
        <div className="flex items-center justify-between border px-5 py-3 rounded-full">
          <NavLink to="/" className="flex items-center">
            <img src="investa.svg" alt="InvestaLogo" className="size-10" />
          </NavLink>

          {/* right side navigation elements */}
          <div className="flex gap-2 max-[550px]:hidden">
            <div className="p-1 ycenter rounded-full">
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-100 bg-blue-500 transition-all ease-in-out duration-250 px-4 py-1 rounded-full ycenter font-medium"
                    : "text-[white] transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] font-medium"
                }
              >
                Blogs
              </NavLink>
            </div>

            <div className="p-1 ycenter rounded-full">
              <NavLink
                to="/plans"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-100 bg-blue-500 transition-all ease-in-out duration-250 px-4 py-1 rounded-full ycenter font-medium"
                    : "text-[white] transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] font-medium"
                }
              >
                Plans
              </NavLink>
            </div>

            {authenticated && (
              <div className="border p-1 ycenter rounded-full flex items-center gap-2">
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-100 bg-blue-500 transition-all ease-in-out duration-250 px-4 py-1 rounded-full ycenter font-medium"
                      : "text-[white] transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] font-medium"
                  }
                >
                  Explore
                </NavLink>

                {isLoaded ? (
                  <UserButton />
                ) : (
                  <div className="size-7 rounded-full bg-[#27272a] border border-[#3f3f46]/50 animate-pulse shrink-0" />
                )}
              </div>
            )}

            {!authenticated && (
              <div className="flex gap-2">
                <SignInButton>
                  <div className="p-1 ycenter rounded-full">
                    <button className="text-[white] cursor-pointer transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] font-medium">
                      Login
                    </button>
                  </div>
                </SignInButton>
                <SignUpButton>
                  <div className="border p-1 ycenter rounded-full">
                    <button className="text-[white] cursor-pointer transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] font-medium">
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
