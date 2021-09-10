import Favicon from "./icons/Favicon";

import React from "react";

const Loading = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center p-4">
      <div className="w-48 h-48">
        <Favicon />
      </div>
    </section>
  );
};

export default Loading;
