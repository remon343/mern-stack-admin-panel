import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header className="flex bg-blue-400 justify-center items-center h-16 text-white px-2 sticky z-10">
        <div className="container items-center">
          <NavLink to="/">Manoj</NavLink>
        </div>
        <nav>
          <ul className="flex gap-7 items-center">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/service">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">LogOut</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">LogIn</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
