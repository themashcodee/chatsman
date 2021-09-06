import React from "react";
import Link from "next/link";

const RedirectSection = ({ label, link, line, switchTo }) => {
  return (
    <article className="w-full mt-auto py-5 flex flex-col gap-2 select-none">
      <h1 className="font-medium text-center text-3xl">{label}</h1>
      <p className="text-cblack-5 dark:text-cwhite-darker text-xs md:text-sm text-center">
        {line}
        <span className="font-medium text-cblack-3 dark:text-white">
          <Link href={link} replace={true}>
            {switchTo}
          </Link>
        </span>
      </p>
    </article>
  );
};

export default RedirectSection;
