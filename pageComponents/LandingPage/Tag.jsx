import React from "react";

function Tag({ tagTitle }) {
  return (
    <div className="bg-white rounded-full px-4 py-1 m-2 flex items-center">
      <img
        src="appIcons/Checkmark.svg"
        height="20"
        width="20"
        alt="checkmark"
      />
      <span className="ml-2">{tagTitle}</span>
    </div>
  );
}

export default Tag;
