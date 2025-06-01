import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span
      className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold inline-block"
    >
      {text}
    </span>
  );
};

export default HighlightText;
