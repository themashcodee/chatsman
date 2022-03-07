import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 512 512"
    >
      <rect width="512" height="512" fill="url(#paint0_linear)" rx="100"></rect>
      <rect
        width="263.906"
        height="263.906"
        x="249.095"
        y="70"
        fill="#fff"
        rx="40"
        transform="rotate(43.033 249.095 70)"
      ></rect>
      <circle cx="218.296" cy="214.953" r="19.001" fill="#FF928B"></circle>
      <circle cx="292.13" cy="214.953" r="19.001" fill="#FF928B"></circle>
      <path
        stroke="#FF928B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M164.574 274.513c30.877 37.415 110.001 89.498 179.478-1.491"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="24"
          x2="468"
          y1="26"
          y2="476"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9C9C"></stop>
          <stop offset="1" stopColor="#FF4646"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Icon;
