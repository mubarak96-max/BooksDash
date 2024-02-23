import React, { useEffect, useState } from "react";
import SingleBook from "./SingleBook";
import AddBookModal from "./AddBookModal";
import BookCategories from "./BookCategories";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Books = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [booksArr, setBooksArr] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const getData = async () => {
    try {
      let booksArr = [];
      const booksRef = collection(db, "Books");

      const querySnapshot = await getDocs(booksRef);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        booksArr.push({ id: doc.id, data: doc.data() });
      });

      setAllBooks(booksArr);

      // console.log('all quotes', quotesArr);

      setBooks(booksArr);
      // console.log('quotesArr', quotesArr);
      // console.log('quotes', quotes);

      // const filtered = uniqueBooks?.filter((item)=>item.)
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [loading]);

  useEffect(() => {
    changeCategory();
  }, [currentCategory]);

  const changeCategory = () => {
    console.log("changed");

    if (currentCategory === "All") {
      setBooks(allBooks); // Reset to all quotes if "All" is selected
    } else {
      const filtered = allBooks.filter(
        (item) => item?.data?.category === currentCategory
      );
      setBooks(filtered);
    }
  };

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

      <BookCategories
        setCurrentCategory={setCurrentCategory}
        changeCategory={changeCategory}
      />

      {books?.map((book) => (
        <SingleBook
          key={book?.id}
          title={book?.data?.title}
          author={book?.data?.author}
          category={book?.data?.category}
          imageSrc={book?.data?.imageUrl}
          description={book?.data?.theme}
        />
      ))}

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
