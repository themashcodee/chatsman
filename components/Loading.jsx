import Favicon from "./icons/Favicon";

import React from "react";

const Loading = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center p-4">
      <div className="w-32 h-32 md:w-48 md:h-48">
        <Favicon />
      </div>
    </section>
  );
};

export default Loading;
