import React from "react";
import Head from "next/head";

const UnderConstruction = () => {
  return (
    <>
      <Head>
        <title>Chatsman | Home</title>
        <meta
          name="description"
          content="Talk your friend and family with ease"
        />
        <link rel="shortcut icon" href="/icons/favicon.png" />
      </Head>
      <section className="w-full h-screen flex justify-center items-center p-8">
        <div className="text-3xl">
          Beta version has been over, Final version will be released soon🔥!
        </div>
      </section>
    </>
  );
};

export default UnderConstruction;
