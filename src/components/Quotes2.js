import React, { useEffect, useState } from "react";
import SingleQuote from "./SingleQuote";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { categories } from "../utils/categories";
import CategoriesMenu from "./CategoriesMenu";
import { useSelector } from "react-redux";

const Quotes2 = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [booksArr, setBooksArr] = useState([]);

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

  const changeCategory = () => {
    console.log("changed");

    if (currentCategory === "All") {
      setQuotes(allQuotes); // Reset to all quotes if "All" is selected
    } else {
      const filtered = allQuotes.filter(
        (item) => item?.data?.category === currentCategory
      );
      setQuotes(filtered);
      console.log("filtered");
    }
  };

  console.log("quotes", quotes?.length);

  return (
    <div>
      <CategoriesMenu
        setCurrentCategory={setCurrentCategory}
        changeCategory={changeCategory}
      />

      <span>
        {currentCategory}: {quotes?.length} showing
      </span>

      {quotes?.map((quote, index) => (
        <SingleQuote key={quote?.id} index={index} quote={quote} />
      ))}
    </div>
  );
};

export default Quotes2;
