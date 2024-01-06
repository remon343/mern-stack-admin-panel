import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Admin_Layout = () => {
  return (
    <>
      <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users"> users </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts"> contacts </NavLink>
              </li>
              <li>services</li>
              <li>home</li>
            </ul>
          </nav>
      </header>
          <Outlet />
    </>
  );
};

export default Admin_Layout;
