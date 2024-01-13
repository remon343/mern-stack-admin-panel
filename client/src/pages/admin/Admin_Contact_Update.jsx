import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import {toast} from 'react-toastify';

const Admin_Contact_Update = () => {
    const {authorization_token,API} = useAuth(); 
    const params = useParams();
    const [contact, setContact] = useState({
        username : "",
        email : "",
        message : ""
    })
    const handleChange = (e) =>{
        setContact({...contact, [e.target.name] : e.target.value});
    }
    const getSingleContactData = async() =>{
        try{

            const res = await fetch(`${API}/api/admin/contact/${params.id}`,{
                method : "GET",
                headers : {
                    Authorization : authorization_token
                }
            })
            if(!res.ok){
                throw new Error("Cannot fetch data");
            }else{
                const data = await res.json();
                setContact(data.msg);
                toast.success("Contact fetched successfully")
            }
        }catch(err){
            toast.error(err.message);
        }
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await fetch(`${API}/api/admin/contacts/edit/${params.id}`,{
                method : 'PUT',
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : authorization_token
                },
                body : JSON.stringify(contact)
            })
            if(!res.ok){
                throw new Error(err.message)
            }else{
                const data = await res.json();
                toast.success("Contact Updated Successfully");
                getSingleContactData();
            }
        }catch(err){
            toast.error("Contact Update : ",err.message)
        }
    }
    useEffect(()=>{
        getSingleContactData();
    },[])
  return (
    <>
    <section className="flex p-4 gap-10">
        <form className="flex flex-col gap-3 px-10" onSubmit={handleSubmit}>
          <h1 className="text-4xl">Update Contact Data</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={contact.username}
              onChange={handleChange}
              className="border-2 border-b-blue-400"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="border-2 border-b-blue-400"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message">Message</label>
            <input
              type="message"
              name="message"
              value={contact.message}
              onChange={handleChange}
              className="border-2 border-b-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded-lg"
          >
            Update
          </button>
        </form>
      </section>
    </>
  )
}

export default Admin_Contact_Update