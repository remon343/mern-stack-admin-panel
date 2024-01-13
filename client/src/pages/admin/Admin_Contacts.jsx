import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";

const Admin_Contacts = () => {
  const {authorization_token, API} = useAuth();
  const [contacts, setContacts] = useState([
    {
      username: "",
      email: "",
      message: "",
    },
  ]);
  const getAllContacts = async () => {
    try{
      const res = await fetch(`${API}/api/admin/contacts`,{
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
      const res = await fetch(`${API}/api/admin/contacts/delete/${id}`,{
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
      <h1>Admin Contact Data  </h1>
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
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Action1
              </th>
              <th scope="col" className="px-6 py-3">
                Action2
              </th>
            </tr>
          </thead>
          {contacts.map((curContact, index) => {
            return (
              <tbody key={index}>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {curContact.username}
                  </th>
                  <td className="px-6 py-4">{curContact.email}</td>
                  <td className="px-6 py-4">{curContact.message}</td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/contacts/${curContact._id}/edit`}>Edit</Link>
                  </td>
                  <td
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => {
                      deleteContact(curContact._id);
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

export default Admin_Contacts;
