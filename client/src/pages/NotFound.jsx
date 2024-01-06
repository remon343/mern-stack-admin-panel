import React from "react";

const NotFound = () => {
  return (
    <>
      <section className="flex justify-center items-center flex-col h-screen text-gray-400">
        <h1 className="text-4xl">Page Not Found</h1>
        <h3 className="text-sm font-bold">You have entered invalid URL.</h3>
      </section>
    </>
  );
};

export default NotFound;
