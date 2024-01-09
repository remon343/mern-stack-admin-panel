import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";

const Admin_Contacts = () => {
  const {authorization_token} = useAuth();
  const [contacts, setContacts] = useState([
    {
      username: "",
      email: "",
      message: "",
    },
  ]);
  const getAllContacts = async () => {
    try{
      const res = await fetch("http://localhost:3000/api/admin/contacts",{
        method : "GET",
        headers : {
          Authorization : authorization_token
        }});
        if(!res.ok){
          throw new Error("Cannot fetch data");
        }else{
          const data = await res.json();
          setContacts(data.contacts);
        } 
    }catch(err){
      toast.error(err.message);
    }
  };
  const deleteContact = async (id) => {
    try{
      const res = await fetch(`http://localhost:3000/api/admin/contacts/delete/${id}`,{
        method : "DELETE",
        headers: {
          Authorization : authorization_token
        }
      });
      if(!res.ok){
        throw new Error("Cannot delete data");
      }else{
        getAllContacts();
        toast.success("Contact deleted successfully");
      }
    }catch(err){
      toast.error(err.message);
    }
  };
  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <h1>Admin Contact Data</h1>
      <table border="1">
        <thead>
          <tr>

          <th>Username</th>
          <th>Email</th>
          <th>Message</th>
          <th>Functionalities</th>
          </tr>
        </thead>
        <tbody>

        {contacts.map((curContact, index) => {
          return (
            <tr key={index}>
              <td>{curContact.username}</td>
              <td>{curContact.email}</td>
              <td>{curContact.message}</td>
              <td className="bg-green-500 text-white">
                <Link to={`/admin/contacts/${curContact._id}/edit`}>Edit</Link>
              </td>
              <td
                className="bg-red-700 text-white rounded-lg"
                onClick={() => {
                  deleteContact(curContact._id);
                }}
                >
                Delete
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </>
  );
};

export default Admin_Contacts;
