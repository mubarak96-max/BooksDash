import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography
} from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../firebase";
import AddQuoteModal from "./addQuoteModal";
import ConfirmDeleteModal from "./confirmDelete";
// import { FaArrowCircleUp } from 'react-icons/fa';

const categories = [
  {
    id: "all",
    category: "All"
  },
  {
    id: "12s",
    category: "Love and Dating"
  },
  {
    id: "1bs",
    category: "Productivity"
  },
  {
    id: "pos",
    category: "Purposeful Living"
  },
  {
    id: "motv",
    category: "Motivation"
  },
  {
    id: "1cs",
    category: "Self control"
  },
  {
    id: "coom",
    category: "Communication Skills"
  },
  {
    id: "1ls",
    category: "Interpersonal Relationships"
  },
  {
    id: "5sk",
    category: "Mindfulness"
  },
  {
    id: "con489",
    category: "Confidence"
  },
  {
    id: "1s",
    category: "Financial Education"
  },
  {
    id: "9qs",
    category: "Mental strength"
  }
];

const AddButton = styled(Button)(({ theme }) => ({
  color: "white",
  background: "blue",
  marginBottom: 3,
  marginTop: 2,
  display: "block",
  textAlign: "center"
}));

const HomeButton = styled(Button)(({ theme }) => ({
  color: "white",
  background: "darkred",
  marginBottom: 3,
  marginTop: 2,
  marginLeft: 8,
  display: "block",
  textAlign: "center"
}));

const Quotes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [booksArr, setBooksArr] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [visible, setVisible] = useState(false);

  const [currentCategory, setCurrentCategory] = useState("Love and Dating");
  const [allQuotes, setAllQuotes] = useState([]);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

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
  }, [loading, currentCategory]);

  let navigate = useNavigate();

  const changeCategory = () => {
    if (currentCategory === "All") {
      setQuotes(allQuotes); // Reset to all quotes if "All" is selected
    } else {
      const filtered = allQuotes.filter(
        (item) => item?.data?.category === currentCategory
      );
      setQuotes(filtered);
    }
  };

  // const changeCategory1 = () => {
  //   const filtered = quotes?.filter(
  //     (item) => item?.data?.category === currentCategory
  //   );

  //   console.log("filtered", currentCategory, filtered);

  //   setQuotes(filtered);

  //   console.log("qqquuootes", quotes);
  // };

  const deleteQuote = (deleteId) => {
    deleteDoc(doc(db, "quotes", deleteId))
      .then(() => {
        setLoading(true);
        setOpenConfirmDeleteModal(false);
        setTimeout(() => {
          setLoading(false);
          setDeleteId("");
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginY: 2,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <AddButton
          onClick={() => {
            setOpenModal(true);
            setIsEdit(false);
          }}
        >
          Add Quotes
        </AddButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "row"
        }}
      >
        <Box>
          <h3 className="text-lg font-medium text-center text-blue-600">
            {allQuotes?.length} {currentCategory} Quotes
          </h3>

          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentCategory} // Control the selected value
                label="Category"
                onChange={(event) => {
                  setCurrentCategory(event.target.value);
                  setTimeout(() => changeCategory(), 100); // Adjust timing if necessary
                }}
                sx={{
                  height: 40,

                  display: "flex",
                  alignItems: "center",
                  paddingX: 4,
                  paddingY: 2,
                  marginY: 2
                }}
              >
                {categories?.map((item) => (
                  <MenuItem
                    key={item.category}
                    value={item.category}
                    onClick={() => {
                      // console.log();
                      setCurrentCategory(item.category);

                      // setTimeout(() => changeCategory(), 1000);
                    }}
                  >
                    {item.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            style={{
              position: "fixed",
              padding: "1rem 2rem",
              fontSize: "20px",
              bottom: "40px",
              right: "40px",
              backgroundColor: "#0C9",
              color: "#fff",
              textAlign: "center"
            }}
          >
            Scroll to top
          </button>
          {quotes?.map((quote, index) => (
            <Card
              sx={{
                width: 320,
                height: 380,
                marginRight: 5,
                marginBottom: 5,
                marginX: 2,
                border: "2px solid lightblue",
                overflowY: "scroll"
              }}
            >
              <CardContent
                sx={{
                  overflow: "hidden",
                  overflowY: "scroll",
                  overflowX: "hidden"
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {/* <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black'
                  }}
                ></span> */}
                  Number: {index + 1}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {/* <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black'
                  }}
                ></span> */}
                  {quote?.data?.quote}
                </Typography>

                <Typography variant="p">
                  <span style={{ color: "darkblue" }}>{quote?.data?.book}</span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ marginTop: 1 }}
                >
                  #{quote?.data?.category}
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      setIsEdit(true);
                      setEditId(quote?.id);
                      setOpenModal(true);
                    }}
                  >
                    <div className="flex items-center px-3 py-2 space-x-1 text-green-500 border border-green-500 rounded-md w-fit hover:text-white hover:bg-green-700 hover:cursor-pointer">
                      Edit
                    </div>
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setOpenConfirmDeleteModal(true);
                      setDeleteId(quote?.id);
                    }}
                  >
                    <div className="flex items-center px-3 py-2 space-x-1 text-red-500 border border-red-500 rounded-md w-fit hover:text-white hover:bg-red-700 hover:cursor-pointer">
                      Delete
                    </div>
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          ))}
        </Box>
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
      </Box>
    </>
  );
};

export default Quotes;
