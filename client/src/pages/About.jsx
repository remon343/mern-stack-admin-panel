import React, { useState } from "react";
import { useAuth } from "../store/auth";

const About = () => {
  const { user } = useAuth();

  return (
    <section>
      {user.username ? <p>Hello, {user.username}</p> : <p>Loading...</p>}
    </section>
  );
};

export default About;
