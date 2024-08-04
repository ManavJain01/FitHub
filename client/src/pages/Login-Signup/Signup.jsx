// Importing React Icons
import { CiUser } from "react-icons/ci";

// Importing React Packages
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

// Importing Hooks
import { useUser } from "../../hooks/useUser";

// Importing Local Files
import './Styles/Styles.css'

export default function Signup() {
  // Custom Hooks
  const { signup } = useUser();


  // useState
  const [logo, setLogo] = useState('')

  // useEffect
  useEffect(() => {
    let cards = document.getElementById('card-signup');
    cards.onmousemove = function(e){
      let x = e.pageX - cards.offsetLeft;
      let y = e.pageY - cards.offsetTop;

      cards.style.setProperty('--x', x+'px');
      cards.style.setProperty('--y', y+'px');
    }
  }, [])

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validation
    const { userName, email, password, confirmPass } = data;
    if (!userName || !email || !password || !confirmPass) {
      alert("All fields are required.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPass) {
      alert("Passwords do not match.");
      return;
    }

    const user = await signup(data);

    if(user){
      
    }
  }

  return (
    <div className="text-lg text-white bg-[#222] flex justify-center items-center w-lvw h-lvh p-5">
      <div
        id="card-signup"
        className="relative bg-[#2d2d2d] w-[30rem] min-h-[30rem] px-8 py-5 rounded-lg shadow-lg
          before:absolute before:top-[--y] before:left-[--x] before:content-[''] before:opacity-0 hover:before:opacity-100 before:rounded-full
          overflow-hidden"
      >
        <div className="z-20 relative text-black flex flex-col gap-8 rounded-lg">
          {/* Company Details */}
          <div className="flex flex-col items-center gap-5">
            <div>
              {logo
                ? ""
                : <CiUser className="size-16 text-white" />
              }
            </div>

            <div className="text-white flex justify-between gap-5 flex-wrap w-full">
              <span>Company Name</span>
              <span>Owner Name</span>
            </div>
          </div>

          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-8">
            <section className="relative">
              <input type="text" name="userName" id="userName" className="peer w-full px-5 py-2 rounded-full outline-none" />
              <label htmlFor="userName" className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full duration-700">User Name</label>
            </section>

            <section className="relative">
              <input type="email" name="email" id="email" className="peer w-full px-5 py-2 rounded-full outline-none" />
              <label htmlFor="email" className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full duration-700">Email ID</label>
            </section>

            <section className="relative">
              <input type="password" name="password" id="password" className="peer w-full px-5 py-2 rounded-full outline-none" />
              <label htmlFor="password" className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full duration-700">Password</label>
            </section>

            <section className="relative">
              <input type="password" name="confirmPass" id="confirmPass" className="peer w-full px-5 py-2 rounded-full outline-none" />
              <label htmlFor="confirmPass" className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full duration-700">Confirm Password</label>
            </section>

            {/* Signup */}
            <div className="flex gap-5 justify-between flex-wrap">
              <Link to="/" className="text-white bg-blue-600 w-fit px-5 py-2 rounded-lg">Go Back</Link>

              <button className="text-white bg-green-600 w-fit px-5 py-2 rounded-lg">Signup</button>
            </div>
          </form>



          {/* Login */}
          <section className="relative flex flex-col gap-5">
            <hr className="opacity-50" />
            <span className="absolute -top-4 left-[140px] text-white backdrop-blur-md px-2">Already A User?</span>
            <Link to='/login' className="font-semibold text-xl text-center bg-white w-full px-5 py-2 rounded-lg">Login to Existing Account</Link>
          </section>
        </div>
      </div>
    </div>
  )
}