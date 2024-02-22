import React, { useState } from "react";
import SingleBook from "./SingleBook";
import AddBookModal from "./AddBookModal";

const Books = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [booksArr, setBooksArr] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  return (
    <div>
      <button
        onClick={() => {
          setOpenModal(true);
          setIsEdit(false);
        }}
        className="px-4 py-2 mb-6 bg-blue-500 text-white font-bold text-xs uppercase rounded shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Add New Book
      </button>

      <SingleBook
        title="Title Book"
        author="Test Author"
        category="Confidence"
        imageSrc="https://cdn.pixabay.com/photo/2024/02/08/20/31/smoking-8561797_1280.jpg"
        description="This component will include an image at the top, followed by a title, author, description, and three buttons at the bottom, as requested."
      />

      <AddBookModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        isEdit={isEdit}
        editId={editId}
        setLoading={(props) => setLoading(props)}
        books={booksArr}
      />
    </div>
  );
};

export default Books;
