import React from "react";
import { useAuth } from "../store/auth";

const Service = () => {
  const { service } = useAuth();
  return (
    <>
      <div className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Services</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Get the following services from me
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {service.map((elem) => (
            <article key={elem._id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={elem.price} className="text-gray-500">
                  {elem.price}
                </time>
                <a
                 
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {elem.provider}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">

                    <span className="absolute inset-0" />
                    {elem.service}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{elem.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Service;
