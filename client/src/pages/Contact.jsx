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
  const {user, API} = useAuth();
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
    const response = await fetch(`${API}/api/form/contact`,{
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

        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <h1 className="text-4xl">Contact Form</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">Username</label>
            <input
              type="text"
              name="username"
              value={contact.username}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Message</label>
            <textarea
              name="message"
              value={contact.message}
              onChange={handleChange}
              cols="30"
              rows="10"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;
