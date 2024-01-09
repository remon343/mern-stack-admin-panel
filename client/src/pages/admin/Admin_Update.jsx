import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";

const Admin_Update = () => {
  const { authorization_token } = useAuth();
  const params = useParams();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  //get the user on edit button
  const getSingleUserData = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/user/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorization_token,
          },
        }
      );
      if(!res.ok){
        throw new Error("Cannot get user data");
      }else{
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      toast.error("User Update : ", err.message);
    }
  };

  // on submitting the form
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const res = await fetch(`http://localhost:3000/api/admin/users/edit/${params.id}`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Authorization : authorization_token
        },
        body : JSON.stringify(profile)
      })
      if(!res.ok){
        throw new Error("Cannot update error.Go back and try again");
      }else{
        const data = await res.json();
        setProfile({
          username : data.username,
          email : data.email,
          phone : data.phone
        });
        toast.success("User updated successfully"); 
      }
    }catch(err){
      toast.error("Update error: ", err.message)
    }
  }

  useEffect(()=>{
    getSingleUserData();
  },[])
  return (
    <>
      <section className="flex p-4 gap-10">
        <form className="flex flex-col gap-3 px-10" onSubmit={handleSubmit}>
          <h1 className="text-4xl">Update User Data</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={profile.username}
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
              value={profile.email}
              onChange={handleChange}
              className="border-2 border-b-blue-400"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Mobile</label>
            <input
              type="phone"
              name="phone"
              value={profile.phone}
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
  );
};

export default Admin_Update;
