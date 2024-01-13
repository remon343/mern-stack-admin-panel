import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Admin_Users = () => {
  const [users, setUsers] = useState([]);
  const { authorization_token, API } = useAuth();
  const getAllUsers = async () => {
    try {
      const res = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorization_token,
        },
      });
      if (!res.ok) {
        throw new Error("Cannot fetch data");
      }
      const data = await res.json();
      setUsers(data.users);
      console.log("table");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization_token,
        },
      });
      // const data = await res.json();
      if (res.ok) {
        getAllUsers();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error deleting user");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <h1>Admin User Data</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action1
              </th>
              <th scope="col" className="px-6 py-3">
                Action2
              </th>
            </tr>
          </thead>
          {users.map((curUser, index) => {
            return (
              <tbody key={index}>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {curUser.username}
                  </th>
                  <td className="px-6 py-4">{curUser.email}</td>
                  <td className="px-6 py-4">{curUser.phone}</td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                  </td>
                  <td
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => {
                      deleteUser(curUser._id);
                    }}
                  >
                    Delete
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Admin_Users;
