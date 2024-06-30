import React from "react";

export const Terminal: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="h-full w-full border-x-2 border-t-2 border-gray-600 bg-gray-800">
      <div className="m-4 text-xl">{content}</div>
    </div>
  );
};