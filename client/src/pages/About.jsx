import React, { useState } from "react";
import { useAuth } from "../store/auth";

const About = () => {
  const { user } = useAuth();
  const people = [
    {
      name: 'Manoj Shrestha',
      role: 'MERN Stack Developer',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8UlOCdQtYpMQ4gJrYMorUrqZ87wiah0i4g&usqp=CAU',
    },
    // More people...
  ]

  return (
    <section>
      {user.username ? <p>Hello, {user.username}</p> : <p>Please Login First</p>}
      <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Me</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Still a junior in MERN Stack development but can progress really faster after getting opportunity.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </section>
  );
};

export default About;
