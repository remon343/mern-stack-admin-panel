import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';

const Admin_Users = () => {
  const [users, setUsers] = useState([]);
  const { authorization_token } = useAuth();
  const getAllUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/users", {
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
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorization_token,
          },
        }
      );
      // const data = await res.json();
      if(res.ok){
        getAllUsers();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editUser = async(id) =>{
    try{
        const res = await fetch(`http://localhost:3000/api/admin/users/edit/${id}`,{
          method : 'PUT',
          headers : {
            Authorization : authorization_token
          }
        })
          
    }catch(err){
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <h1>Admin User Data</h1>
      <table border="1">
        <thead>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Functionalities</th>
        </thead>
        {users.map((curUser, index) => {
          return (
            <tr key={index}>
              <td>{curUser.username}</td>
              <td>{curUser.email}</td>
              <td>{curUser.phone}</td>
              <td className="bg-green-500 text-white"><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
              <td
                className="bg-red-700 text-white rounded-lg"
                onClick={() => {
                  deleteUser(curUser._id);
                }}
              >
                Delete
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default Admin_Users;
