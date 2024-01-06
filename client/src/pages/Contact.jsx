import React, { useState } from "react";
import { useAuth } from "../store/auth";

const Contact = () => {
  const defaultContactForm = {
    username: "",
    email: "",
    message: "",
  }
  const [contact, setContact] = useState(defaultContactForm);

  const [userData, setuserData] = useState(true);
  const {user} = useAuth();
  if(userData && user){
    setContact({
      username : user.username,
      email : user.email,
      message  : ""
    });
    setuserData(false);
  }
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/form/contact",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(contact)
    })
    if(response.ok){
      window.alert("Message sent successfully.");
      setContact(defaultContactForm);
    }
  };
  return (
    <>
      <section className="flex p-4 gap-10">
        <div className="w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112754.45609277317!2d84.19801288756317!3d27.976245661001936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39950780deaf2177%3A0x33b3696137fa9dfb!2sByas!5e0!3m2!1sen!2snp!4v1701696801582!5m2!1sen!2snp"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-10">
          <h1 className="text-4xl">Contact Form</h1>
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
            <textarea
              name="message"
              value={contact.message}
              onChange={handleChange}
              cols="30"
              rows="10"
              className="border-2 border-b-blue-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;
