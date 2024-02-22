import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Alert,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Switch,
  TextField
} from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase";

const SubmitButton = styled(Button)(({ theme }) => ({
  color: "white",
  background: "blue",
  marginBottom: 3,
  marginTop: 2,
  display: "block",
  textAlign: "center"
}));

const CancelButton = styled(Button)(({ theme }) => ({
  color: "white",
  background: "red",
  marginBottom: 3,
  marginTop: 2,
  marginLeft: 8,
  display: "block",
  textAlign: "center"
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const categories = [
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

export default function AddBookModal({
  openModal,
  handleClose,
  isEdit,
  editId,
  setLoading,
  books
}) {
  const [book, setBook] = useState("");
  const [category, setCategory] = useState("");
  const [quote, setQuote] = useState("");
  const [isNewBook, setIsNewBook] = useState(false);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isEdit) {
      const quotesDocRef = doc(db, "Books", editId);
      getDoc(quotesDocRef)
        .then((doc) => {
          const data = doc.data();
          setBook(data?.book);
          setCategory(data?.category);
          setQuote(data?.quote);
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        })
        .catch((error) => console.log(error));
    } else {
      setBook("");
      setCategory("");

      setQuote("");
    }
  }, [editId]);

  const handleSubmit = async () => {
    if (book === "") {
      setError("book is required");
      setShowError(true);
    } else if (category === "") {
      setError("fill in the category");
      setShowError(true);
    } else if (quote === "") {
      setError("provide the quote");
      setShowError(true);
    } else {
      try {
        const data = {
          book,
          category: category,
          quote: quote
        };

        if (isEdit) {
          const quotesRef = doc(db, "Books", editId);

          updateDoc(quotesRef, data).then(() => {
            setLoading(true);
            handleClose();
          });

          setSuccess("Successfully edited");
        } else {
          await addDoc(collection(db, "Books"), data);

          setSuccess("Successfully added");
        }

        setLoading(true);

        setSuccess("Success", "quote uploaded successfully");

        Swal.fire({
          icon: "success",
          title: "Operation successful",
          text: `Book has been successfully ${isEdit ? "edited" : "created"}`,
          confirmButtonColor: "#16a34a",
          confirmButtonText: "Ok"
        });
        handleClose();

        setBook("");
        setCategory("");

        setQuote("");

        setTimeout(() => {
          setSuccess("");
          setLoading(false);
        }, 300);
      } catch (error) {
        console.log("Error", `Failed to upload due to ${error}`);

        // setLoading(false);
      }
    }
  };

  // console.log('quotes', quotes);
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Box sx={{}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Category:{category}
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
                      key={item.id}
                      value={item.category}
                      onClick={() => {
                        // console.log();
                        setCategory(item.category);
                      }}
                    >
                      {item.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ marginY: 2 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Quote"
                multiline
                variant="outlined"
                value={quote}
                onChange={(e) => {
                  setQuote(e.target.value);
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <SubmitButton
              variant="outline"
              sx={{ display: "block", textAlign: "center" }}
              onClick={handleSubmit}
            >
              Submit
            </SubmitButton>
            <CancelButton onClick={handleClose}>Cancel</CancelButton>
          </Box>

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="warning">{error}</Alert>}
        </Box>
      </Modal>
    </div>
  );
}
