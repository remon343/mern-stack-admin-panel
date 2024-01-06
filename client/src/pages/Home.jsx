import React from "react";

const Home = () => {
  return (
    <>
      <section className="flex justify-center items-center p-3">
        <div className="flex flex-col justify-center px-10">
          <h3 className="text-xl">Welcome Everyone to,</h3>
          <h1 className="text-5xl">All Round Campus</h1>
          <p className="text-sm py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam perspiciatis eos inventore! Sint, ipsa consequatur.</p>
          <div className="flex gap-6">
            <button className="bg-blue-400 px-4 py-2 text-white">Connect Now</button>
            <button className="bg-blue-400 px-4 py-2 text-white">Register</button>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1546198632-9ef6368bef12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="rounded-lg"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
