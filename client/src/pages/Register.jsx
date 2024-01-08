import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../store/auth';

import "../index.css";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  //Handling the input value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user)
  };
  //Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Register Successfully");
        navigate('/login');
      }
    } catch (err) {
      toast.error("Register: ", err.message);
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
          <h1 className="text-2xl mb-4">Registration Form</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                placeholder="username"
                id="username"
                required
                autoComplete="off"
                onChange={handleInput}
                className="w-full h-10 border-2 border-b-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="email"
                id="email"
                required
                autoComplete="off"
                onChange={handleInput}
                className="w-full h-10 border-2 border-b-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                value={user.phone}
                placeholder="phone"
                id="phone"
                required
                autoComplete="off"
                onChange={handleInput}
                className="w-full h-10 border-2 border-b-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="password"
                id="password"
                required
                autoComplete="off"
                onChange={handleInput}
                className="w-full h-10 border-2 border-b-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-400 px-2 py-1 rounded-sm mt-5 hover:bg-green-700 text-white"
            >
              Register Now
            </button>
          </form>
        </main>
      </section>
    </>
  );
};

export default Register;
