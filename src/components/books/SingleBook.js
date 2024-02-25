import React, { useState } from "react";
import LessonsModal from "./LessonsModal";

const SingleBook = ({
  imageSrc,
  title,
  author,
  description,
  category,
  setDeleteId,
  setOpenConfirmDeleteModal,
  setIsEdit,
  setOpenModal,
  setEditId,
  id,
  index
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [openTermsModal, setOpenTermsModal] = useState(false);

  // Function to toggle the description state
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Function to truncate the description if it's longer than 50 characters and the state is set to not show the full description
  const renderDescription = () => {
    if (description.length > 100 && !showFullDescription) {
      return (
        <>
          {`${description.substring(0, 100)}... `}
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:text-blue-700"
          >
            Show More
          </button>
        </>
      );
    } else {
      return (
        <>
          {description}{" "}
          {description.length > 100 && (
            <button
              onClick={toggleDescription}
              className="text-blue-500 hover:text-blue-700"
            >
              Show Less
            </button>
          )}
        </>
      );
    }
  };

  return (
    <div className="max-w-sm my-5 rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-96" src={imageSrc} alt="Display" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          by <span className="font-semibold">{author}</span>
        </p>

        <p className="text-gray-700 text-base">
          Category: <span className="">{category}</span>
        </p>

        <p className="text-gray-700 text-base mt-4">{renderDescription()}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsEdit(true);
            setOpenModal(true);
            setEditId(id);
          }}
        >
          Edit
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setDeleteId(id);
            setOpenConfirmDeleteModal(true);
          }}
        >
          Delete
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpenTermsModal(true)}
        >
          Lessons
        </button>
      </div>

      <LessonsModal
        openTermsModal={openTermsModal}
        closeTermsModal={() => setOpenTermsModal(false)}
        itemId={id}
        index={index}
      />
    </div>
  );
};

export default SingleBook;
