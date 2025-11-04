import { NavLink } from "react-router-dom";
import Routing from "../routing/Routing";

const Navbar = () => {
  return (
    <>
      <div className="w-[70%] h-25 mx-auto  flex flex-col justify-center max-[850px]:w-[90%] ">
        <div className="flex items-center justify-between border px-5 py-2 rounded-full ">
          <NavLink to="/" className="flex gap-1">
            <img src="logoipsum-249.png" alt="InvestaLogo" className="size-5" />
            Investa
          </NavLink>

          {/* right side navigation elements */}

          <div className="flex gap-2  max-[550px]:hidden">
            <div className="border p-1 ycenter rounded-full ">
              <NavLink
                to="/getStarted"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 transition-all ease-in-out duration-250 px-4 py-1 rounded-full ycenter"
                    : "text-[white] transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] "
                }
              >
                getStarted
              </NavLink>
            </div>
            <div className="border p-1 ycenter rounded-full ">
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 transition-all ease-in-out duration-250 px-4 py-1 rounded-full ycenter"
                    : "text-[white] transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] "
                }
              >
                Login
              </NavLink>
            </div>
            <div className="border p-1 ycenter rounded-full ">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 transition-all ease-in-out duration-250 px-4 py-1 rounded-full ycenter"
                    : "text-[white] transition-all ease-in-out duration-250 px-4 py-1 ycenter rounded-full hover:bg-[#dfdfdf52] "
                }
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Routing />
    </>
  );
};

export default Navbar;
