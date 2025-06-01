import React from "react";

const AnimatedHeading = ({ text, highlightText }) => {
  return (
    <div className="text-center mb-3">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#ff7f50] via-[#6a5acd] to-[#32cd32] text-transparent bg-clip-text">
        {text}{" "}
        <span className="bg-gradient-to-r from-[#1F1C2C] via-[#928DAB] to-[#1F1C2C] text-transparent bg-clip-text font-extrabold">
          {highlightText}
        </span>
      </h2>
    </div>
  );
};

export default AnimatedHeading;
