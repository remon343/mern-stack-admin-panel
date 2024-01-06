import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from"../store/auth";
import {toast} from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  // Handling the input value
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        toast.success("Login Successfully");
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (err) {
      toast.error("Login : ", err.message);
    }
  };
  return (
    <>
      <section className="flex gap-10">
        <div className="w-1/2 p-5 flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1546198632-9ef6368bef12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Register Image"
            className="rounded-lg"
          />
        </div>
        <main className="w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-2xl mb-4">Login Form</h1>
          <form action="" onSubmit={handleSubmit}>
            '
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={user.email}
                required
                autoComplete="off"
                onChange={handleChange}
                className="w-full h-10 border-2 border-b-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={user.password}
                required
                autoComplete="off"
                onChange={handleChange}
                className="w-full h-10 border-2 border-b-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-400 px-2 py-1 rounded-sm mt-5 hover:bg-green-700 text-white"
            >
              Log In
            </button>
          </form>
        </main>
      </section>
    </>
  );
};

export default Login;
