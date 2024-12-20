// Importing React Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

// Importing React Packages
import {Link} from 'react-router-dom';
import { useState } from 'react';

// Importing Custom Hooks
import { useRefresh } from "../../../../hooks/useRefresh";
import { useUser } from "../../../../hooks/useUser";

export default function HamMenu({cart = {}, user = {}}) {
  // Custom Hooks
  const { isLogin, logout } = useUser();

  // Variables
  const firstName = user?.name?.substring(0, user.name.indexOf(' ')) || user?.name;

  // useState
  const [openMenu, setOpenMenu] = useState(false);
  const [isPaymentSuccessfull, setIsPaymentSuccessfull] = useState(true);

  return (
    <div className="z-[999999] sticky top-0 left-0 bg-black flex items-center justify-between gap-10 px-10 py-5">
      <Link to="/" className="font-semibold text-2xl">{import.meta.env.VITE_REACT_APP_WebsiteName || "Please enter website name"}</Link>

      <button onClick={() => setOpenMenu(!openMenu)}>{
        openMenu
          ? <RxCross2 className="size-7" />
          : <GiHamburgerMenu className="size-7" />
      }</button>

      {openMenu
        && <div className="absolute top-[50px] right-0 text-lg bg-black bg-opacity-50 backdrop-blur-md flex flex-col gap-5 w-[250px] p-5 rounded-lg shadow-md shadow-gray-900">
          {isLogin
            && <span className="text-center hover:text-white/50 duration-500">Hi, {firstName ? firstName : "User"}</span>
          }
          {isPaymentSuccessfull
            && <Link to="/admin" className="text-center hover:text-white/50 duration-500">Admin</Link>
          }
          <Link to="/pricing" className="text-center hover:text-white/50 duration-500">Pricing</Link>

          <section className="relative flex item justify-center">
            <Link to="/cart" className="text-center hover:text-white/50 duration-500">Cart</Link>
            {cart?.length > 0
              && <div className="absolute -top-1 right-[74px] text-[10px] bg-blue-700 flex items-center justify-center w-[14px] h-[14px] rounded-full">{cart?.length}</div>
            }
          </section>
        
          {!isLogin
            ? <>
              <Link to="/login" className="text-center hover:text-white/50 duration-500">Login</Link>
              <Link to="/signup" className="text-center hover:text-white/50 duration-500">Signup</Link>
            </>
            :<button onClick={() => logout()} className="text-center hover:text-red-500/50 duration-500">Logout</button>
          }
        </div>
      }
    </div>
  )
}