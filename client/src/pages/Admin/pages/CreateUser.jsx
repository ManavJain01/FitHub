import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  let customer = {};

  const handleChange = (event) => {
    customer = { ...customer, [event.target.name]: event.target.value };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //check if entered email is already exist

    //check if username is available or not

    navigate("../customers");

    console.log(customer);
  };

  return (
    <div className="bg-blue-950  mx-auto p-10 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Enter Details</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Name</label>
            <input
              type="text"
              name="name"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Email</label>
            <input
              type="email"
              name="email"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Username</label>
            <input
              type="text"
              name="username"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Phone</label>
            <input
              type="number"
              name="phone"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Phone"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Password</label>
            <input
              type="password"
              name="password"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Privilege</label>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              name="privilege"
              onChange={handleChange}
              required
            >
              <option value="">Select Privilege</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Birthday</label>
            <input
              type="date"
              name="birthday"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Join Date</label>
            <input
              type="date"
              name="join_date"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">Amount Paid</label>
            <input
              type="text"
              name="payment"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="₹"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-white">
              Aadhaar Number
            </label>
            <input
              type="number"
              name="aadhar"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="xxxx-xxxx-xxxx"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Link
            to="../customers"
            className="px-6 py-2 bg-gray-500 text-black rounded-lg hover:bg-gray-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;