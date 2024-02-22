import React from "react";

const SingleBook = ({ imageSrc, title, author, description, category }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={imageSrc} alt="Display" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          by <span className="font-semibold">{author}</span>
        </p>

        <p className="text-gray-700 text-base">
          Category: <span className="">{category}</span>
        </p>

        <p className="text-gray-700 text-base mt-4">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Lessons
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
