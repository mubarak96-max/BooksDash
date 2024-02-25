import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, styled, TextField } from "@mui/material";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { Add, HighlightOff } from "@mui/icons-material";
import { db } from "../../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const AddButton = styled(Button)(() => ({
  color: "#fff",
  background: "green",
  marginTop: 10,
  marginBottom: 5
}));

export default function LessonsModal({
  openTermsModal,
  closeTermsModal,
  itemId
}) {
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const carsRef = doc(db, "Books", itemId);
    getDoc(carsRef).then((doc) => {
      const data = doc.data();
      setOptions(data?.lessons);
      console.log("options", options);
    });
  }, [loading]);

  const handleOption = async () => {
    try {
      const data = { option };

      const carsRef = doc(db, "Books", itemId);

      if (title === "") {
        setError("Can't submit empty field");
        return;
      }

      setError("");

      await updateDoc(carsRef, {
        lessons: arrayUnion({ title, description })
      });

      setSuccess("Option added");

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess("");
      }, 1000);

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteOption = async (itemToDelete) => {
    const carsRef = doc(db, "Books", itemId);
    await updateDoc(carsRef, {
      lessons: arrayRemove(itemToDelete)
    });
    setLoading(true);
    setSuccess("Option removed");

    setTimeout(() => {
      setLoading(false);
      setSuccess("");
    }, 2000);
  };

  return (
    <div>
      <Modal
        open={openTermsModal}
        onClose={closeTermsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              size="small"
              multiline
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              sx={{ marginX: 2, marginBottom: 3 }}
            />

            <TextField
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={description}
              size="small"
              multiline
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              sx={{ marginX: 2 }}
            />

            <Button onClick={handleOption}>
              <div className="flex items-center px-1 py-1 space-x-1 text-blue-500 border border-blue-500 rounded-md w-fit hover:text-white hover:bg-blue-500 hover:cursor-pointer">
                <Add />

                <span>Add Lesson</span>
              </div>
            </Button>
          </Box>
          {options?.length === 0 ? (
            <h2>There is no any option. Add one</h2>
          ) : (
            <Box sx={{ overflowY: "scroll", height: 400 }}>
              <Box>
                {options?.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginX: 6,
                      marginY: 2,
                      width: "100%"
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flex: 2 }}
                    >
                      <strong
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "black"
                        }}
                      >
                        {" "}
                        Lesson
                      </strong>
                      <h4
                        style={{
                          color: "darkblue",
                          fontSize: 17
                        }}
                      >
                        {item?.title}
                      </h4>

                      <h6
                        style={{
                          color: "skyblue",
                          fontSize: 15
                        }}
                      >
                        {item?.description}
                      </h6>
                    </Typography>

                    <Button
                      onClick={() => {
                        console.log("item", item);
                        deleteOption(item);
                      }}
                      sx={{ marginLeft: 20, flex: 1 }}
                    >
                      <div className="flex items-center px-1 py-1 space-x-1 text-red-500 border border-red-500 rounded-md w-fit hover:text-white hover:bg-red-500 hover:cursor-pointer">
                        <HighlightOff />

                        <span>Remove Option</span>
                      </div>
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          <Button onClick={closeTermsModal}>Close</Button>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Modal>
    </div>
  );
}
