import React, { useEffect, useState } from "react";
import SingleQuote from "./SingleQuote";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { categories } from "../utils/categories";
import CategoriesMenu from "./CategoriesMenu";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ConfirmDeleteModal from "./confirmDelete";
import AddQuoteModal from "./addQuoteModal";

const Quotes2 = () => {
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

  const { category } = useSelector((state) => state.category);

  console.log("current category", currentCategory);

  const getData = async () => {
    try {
      let quotesArr = [];
      const quotesRef = collection(db, "quotes");

      const querySnapshot = await getDocs(quotesRef);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        quotesArr.push({ id: doc.id, data: doc.data() });
      });

      setAllQuotes(quotesArr);

      // console.log('all quotes', quotesArr);

      setQuotes(quotesArr);
      // console.log('quotesArr', quotesArr);
      // console.log('quotes', quotes);

      let books = [];
      quotes?.forEach((item) => {
        // console.log('item', item);
        books.push(item.data.book);
      });

      const uniqueBooks = [...new Set(books)];

      // console.log('unique', uniqueBooks);

      setBooksArr([...uniqueBooks]);

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
      setQuotes(allQuotes); // Reset to all quotes if "All" is selected
    } else {
      const filtered = allQuotes.filter(
        (item) => item?.data?.category === currentCategory
      );
      setQuotes(filtered);
    }
  };

  console.log("quotes", quotes?.length);

  const deleteQuote = (deleteId) => {
    deleteDoc(doc(db, "quotes", deleteId))
      .then(() => {
        setLoading(true);
        setOpenConfirmDeleteModal(false);
        setTimeout(() => {
          setLoading(false);
          setDeleteId("");
          setCurrentCategory("");
        }, 1000);
        Swal.fire({
          icon: "success",
          title: "Operation successful",
          text: "Quote has been successfully deleted",
          confirmButtonColor: "#16a34a",
          confirmButtonText: "Ok"
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpenModal(true);
          setIsEdit(false);
        }}
        className="px-4 py-2 bg-blue-500 text-white font-bold text-xs uppercase rounded shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Add New Quote
      </button>

      <CategoriesMenu
        setCurrentCategory={setCurrentCategory}
        changeCategory={changeCategory}
      />

      <span>
        {currentCategory}: {quotes?.length > 0 ? quotes?.length : 0} showing
      </span>

      {quotes?.map((quote, index) => (
        <SingleQuote
          key={quote?.id}
          index={index}
          quote={quote}
          setOpenConfirmDeleteModal={setOpenConfirmDeleteModal}
          setDeleteId={setDeleteId}
          setOpenModal={setOpenModal}
          setIsEdit={setIsEdit}
          setEditId={setEditId}
        />
      ))}

      <AddQuoteModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        isEdit={isEdit}
        editId={editId}
        setLoading={(props) => setLoading(props)}
        books={booksArr}
      />

      <ConfirmDeleteModal
        openConfirmDeleteModal={openConfirmDeleteModal}
        closeConfirmDeleteModal={() => setOpenConfirmDeleteModal(false)}
        confirmDelete={() => deleteQuote(deleteId)}
      />
    </div>
  );
};

export default Quotes2;
