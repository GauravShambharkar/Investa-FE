import { NavLink } from "react-router-dom";
import Routing from "./Routing";
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
        <div className="flex items-center justify-between border border-[#27272a] px-5 py-3 rounded-full bg-[#18181c]/60 backdrop-blur-md">
          <NavLink to="/news" className="flex items-center">
            <img src="/investa.svg" alt="Investa Logo" className="size-10" />
          </NavLink>

          {/* Right side navigation elements */}
          <div className="flex items-center gap-3">
            {/* Re-added News & Blogs item */}
            <div className="p-1 flex items-center gap-1">
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-100 bg-blue-500 transition-all ease-in-out duration-250 px-4 py-1.5 rounded-full flex items-center font-medium text-[14px]"
                    : "text-white transition-all ease-in-out duration-250 px-4 py-1.5 flex items-center rounded-full hover:bg-[#dfdfdf1f] font-medium text-[14px]"
                }
              >
                News
              </NavLink>
            </div>

            <div className="p-1 flex items-center gap-1">
              <NavLink
                to="/plans"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-100 bg-blue-500 transition-all ease-in-out duration-250 px-4 py-1.5 rounded-full flex items-center font-medium text-[14px]"
                    : "text-white transition-all ease-in-out duration-250 px-4 py-1.5 flex items-center rounded-full hover:bg-[#dfdfdf1f] font-medium text-[14px]"
                }
              >
                Plans
              </NavLink>
            </div>

            {authenticated && (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-100 bg-blue-500 transition-all ease-in-out duration-250 px-4 py-1.5 rounded-full flex items-center font-medium text-[14px]"
                      : "text-white transition-all ease-in-out duration-250 px-4 py-1.5 flex items-center rounded-full hover:bg-[#dfdfdf1f] font-medium text-[14px]"
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
              <div className="flex items-center gap-2">
                <SignInButton>
                  <button className="text-white cursor-pointer transition-all ease-in-out duration-200 px-4 py-1.5 rounded-full hover:bg-[#dfdfdf1f] font-medium text-[14px]">
                    Login
                  </button>
                </SignInButton>

                {/* Highlighted Sign Up Button in Brand Blue */}
                <SignUpButton>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-[14px] px-5 py-1.5 rounded-full transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer">
                    Sign Up
                  </button>
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
