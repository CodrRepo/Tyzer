import React, { useEffect } from "react";

import gsap from "gsap";

const PieChart = ({ percentage, color }) => {
  // useEffect(() => {
  //   const pieElement = document.querySelectorAll(".pie");

  //   gsap.to(pieElement[1], { duration: 0.7, "--p": percentage, rotate: "180deg" }); // Change '--p' to 90 over 1 second

  //   gsap.to(pieElement[1], { duration: 1, "--c": color }, "-=1"); // Change '--c' to 'lightgreen' over 1 second
  // }, [percentage, color]);
  return (
    <div className="w-[160px] flex items-center justify-center bg-blue-500">
      <div className="h-full w-[160px]  flex items-center justify-center font-semibold text-lg rounded-full absolute top-0 left-0">
        {percentage}%
      </div>
      <div className="relative pie animate"></div>
    </div>
  );
};

export default PieChart;
