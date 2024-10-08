// Importing React Icons
import { CiUser } from "react-icons/ci";

// Importing React Packages
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Importing Hooks
import { useUser } from "../../hooks/useUser";
import { useRefresh } from "../../hooks/useRefresh";

// Importing Local Files
import "./Styles/Styles.css";

export default function Signup() {
  // Custom Hooks
  const { signup } = useUser();
  const { getCompanyDetails } = useRefresh();

  // useNavigate
  const navigate = useNavigate();

  // useState
  const [companyDetails, setCompanyDetails] = useState({});
  const [error, setError] = useState("");

  // useEffect
  useEffect(() => {
    let cards = document.getElementById("card-signup");
    cards.onmousemove = function (e) {
      let x = e.pageX - cards.offsetLeft;
      let y = e.pageY - cards.offsetTop;

      cards.style.setProperty("--x", x + "px");
      cards.style.setProperty("--y", y + "px");
    };

    const handleRefresh = async () => {
      const response = await getCompanyDetails();

      if (!response?.company && !response?.owner && !response?.logo) {
        navigate("/companyDetails");
      }

      setCompanyDetails({
        company: response?.company || "",
        owner: response?.owner || "",
        logo: response?.logo || "",
      });

      if (localStorage.getItem("authToken")) navigate("/admin");
    };

    handleRefresh();
  }, []);

  // Functions
  const handleUsernameChange = async (e) => {
    setError("");
    const value = e.target.value;
    const lastIdx = value[value.length-1];

    if(lastIdx === " ") setError("No Spaces Allowed in UserName");
    if(value.includes(" ")) setError("No Spaces Allowed in UserName");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    setError("");
    
    // Validation
    const { firstName, lastName, userName, email, password, confirmPass } = data;
    
    if (!firstName || !lastName || !userName || !email || !password || !confirmPass) {
      setError("All fields are required.");
      return;
    }

    if(userName.includes(" ")){
      setError("No Spaces Allowed in userName");
      return;
    }

    
    // Check if passwords match
    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
    
    const fullName = firstName + ' ' + lastName;

    delete data.confirmPass;
    delete data.firstName;
    delete data.lastName;
    data.fullName = fullName;

    const user = await signup(data);

    if (user === "success") {
      navigate("/admin");
    } else if (typeof user === "string") {
      setError(user);
      return;
    }

    if (user) {
      navigate("/admin");
    } else {
      setError("Error While SigningUp");
      return;
    }
  };

  return (
    <div className="text-lg text-white bg-[#222] flex justify-center items-center w-lvw min-h-lvh p-5">
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
              {companyDetails.logo ? (
                <img src={companyDetails.logo} alt="logo" className="w-32 h-32 rounded-full" />
              ) : (
                <CiUser className="w-32 h-32 text-white" />
              )}
            </div>

            <span className="text-3xl tracking-widest font-semibold text-white">{companyDetails.company || "Company Name"}</span>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="relative flex flex-col gap-8"
          >
            <div className="flex gap-5">
              <section className="relative">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="peer w-full px-5 py-2 rounded-full outline-none"
                />
                <label
                  htmlFor="firstName"
                  className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full peer-valid:-top-4 peer-valid:left-4 peer-valid:backdrop-blur-sm peer-valid:rounded-full duration-700 cursor-pointer"
                >
                  First Name
                </label>
              </section>

              <section className="relative">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="peer w-full px-5 py-2 rounded-full outline-none"
                  />
                <label
                  htmlFor="lastName"
                  className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full peer-valid:-top-4 peer-valid:left-4 peer-valid:backdrop-blur-sm peer-valid:rounded-full duration-700 cursor-pointer"
                  >
                  Last Name
                </label>
              </section>
            </div>

            <section className="relative">
              <input
                type="text"
                name="userName"
                id="userName"
                required
                onChange={(e) => handleUsernameChange(e)}
                className="peer w-full px-5 py-2 rounded-full outline-none"
              />
              <label
                htmlFor="userName"
                className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full peer-valid:-top-4 peer-valid:left-4 peer-valid:backdrop-blur-sm peer-valid:rounded-full duration-700 cursor-pointer"
              >
                User Name
              </label>
            </section>

            <section className="relative">
              <input
                type="email"
                name="email"
                id="email"
                required
                className="peer w-full px-5 py-2 rounded-full outline-none"
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full peer-valid:-top-4 peer-valid:left-4 peer-valid:backdrop-blur-sm peer-valid:rounded-full duration-700 cursor-pointer"
              >
                Email ID
              </label>
            </section>

            <section className="relative">
              <input
                type="password"
                name="password"
                id="password"
                required
                className="peer w-full px-5 py-2 rounded-full outline-none"
              />
              <label
                htmlFor="password"
                className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full peer-valid:-top-4 peer-valid:left-4 peer-valid:backdrop-blur-sm peer-valid:rounded-full duration-700 cursor-pointer"
              >
                Password
              </label>
            </section>

            <section className="relative">
              <input
                type="password"
                name="confirmPass"
                id="confirmPass"
                required
                className="peer w-full px-5 py-2 rounded-full outline-none"
              />
              <label
                htmlFor="confirmPass"
                className="absolute top-2 left-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:backdrop-blur-sm peer-focus:rounded-full peer-valid:-top-4 peer-valid:left-4 peer-valid:backdrop-blur-sm peer-valid:rounded-full duration-700 cursor-pointer"
              >
                Confirm Password
              </label>
            </section>

            {/* Show Error */}
            {error && (
              <span className="absolute bottom-12 left-32 text-red-600">
                {error}
              </span>
            )}

            {/* Signup */}
            <button className="text-white bg-green-600 px-5 py-2 rounded-lg">
              Signup
            </button>
          </form>

          {/* Login */}
          <section className="relative flex flex-col gap-5">
            <hr className="opacity-50" />
            <span className="absolute -top-4 left-[140px] text-white backdrop-blur-md px-2">
              Already A User?
            </span>
            <Link
              to="/login"
              state={companyDetails}
              className="font-semibold text-xl text-center bg-white w-full px-5 py-2 rounded-lg"
            >
              Login to Existing Account
            </Link>
          </section>

          <span className="text-center text-2xl text-white opacity-50">Company Owner - {companyDetails.owner || "Owner Name"}</span>
        </div>
      </div>
    </div>
  );
}
