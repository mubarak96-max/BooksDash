import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Alert,
  CircularProgress,
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
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
import { db, storage } from "../../firebase";
import { booksCategories } from "./BookCategories";

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
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [theme, setTheme] = useState("");

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageProgress, setImageProgress] = useState(null);
  const [bookName, setBookName] = useState("");

  useEffect(() => {
    if (isEdit) {
      const quotesDocRef = doc(db, "Books", editId);
      getDoc(quotesDocRef)
        .then((doc) => {
          const data = doc.data();
          setCategory(data?.category);
          setImageUrl(data?.imageUrl);
          setTitle(data?.title);
          setAuthor(data?.author);
          setTheme(data?.theme);
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        })
        .catch((error) => console.log(error));
    } else {
      setImageUrl("");
      setTitle("");
      setAuthor("");
      setTheme("");
      setCategory("");
    }
  }, [editId]);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/books/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setBookName(file.name);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (e.target.name === "book image") return setImageProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (e.target.name === "book image") return setImageUrl(downloadURL);
        });
      }
    );
  };

  const handleSubmit = async () => {
    if (title === "") {
      setError("book title is required");
      setShowError(true);
    } else if (category === "") {
      setError("fill in the category");
      setShowError(true);
    } else if (author === "") {
      setError("provide the author");
      setShowError(true);
    } else {
      try {
        const data = {
          title,
          author,
          theme,
          lessons: [],
          category: category,
          imageUrl
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

        setImageUrl("");
        setTitle("");
        setAuthor("");
        setTheme("");
        setCategory("");

        setImageProgress(null);

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
                  {booksCategories?.map((item) => (
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
              <InputLabel sx={{ marginBottom: 1, fontWeight: "600" }}>
                Book File
              </InputLabel>
              <div>
                <div className="flex">
                  {/* <label htmlFor='name'>Add Banner Image</label> */}

                  <input
                    onChange={(e) => handleUpload(e)}
                    className="px-4 py-2 focus:border focus:border-blue-500"
                    type="file"
                    id=""
                    name="book image"
                    // accept=".pdf"
                  />

                  <img
                    src={imageUrl}
                    alt="uploaded file"
                    className="h-[70px] w-[50px] border border-gray-500 p-2 border-dotted"
                  />
                </div>

                {imageProgress < 100 && (
                  <div className="outerbar">
                    <CircularProgress
                      variant="determinate"
                      value={imageProgress}
                    />
                  </div>
                )}
              </div>
            </Box>

            <Box sx={{ marginY: 2 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Title"
                size="small"
                multiline
                variant="outlined"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                sx={{ marginBottom: 1 }}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Author"
                size="small"
                multiline
                variant="outlined"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                sx={{ marginBottom: 1 }}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Theme"
                size="small"
                multiline
                variant="outlined"
                value={theme}
                maxRows={7}
                onChange={(e) => {
                  setTheme(e.target.value);
                }}
                sx={{ marginBottom: 1 }}
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
