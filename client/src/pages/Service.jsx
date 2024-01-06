import React from "react";
import { useAuth } from "../store/auth";

const Service = () => {
  const { service } = useAuth();
  return (
    <>
      <section>
        <div>
          <h1 className="text-5xl">Services</h1>
        </div>
      </section>
      <div className="flex gap-3 ">

      {service.map((item, index) => {
        return (
          <div className="flex flex-col gap-4  bg-blue-200">
            <h2 className="text-3xl">{item.service}</h2>
            <p>{item.price}</p>
            <p>{item.provider}</p>
            <p>{item.description}</p>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default Service;
