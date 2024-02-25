import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Alert, CircularProgress, TextField, styled } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

export default function AdsModal({
  openModal,
  handleClose,
  editId,
  setLoading
}) {
  const [adsNumber, setAdsNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (true) {
      const adShowTimeDocRef = doc(db, "AdShowTimes", "6qHEBKjQYlgTP1I2ELEh");
      getDoc(adShowTimeDocRef)
        .then((doc) => {
          const data = doc.data();
          setAdsNumber(data?.adsNumber);
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        })
        .catch((error) => console.log(error));
    }
  }, [editId, setLoading]);

  const handleSubmit = async () => {
    if (adsNumber === "") {
      setError("Ads Number is required");
    } else {
      try {
        const adShowTimeRef = doc(db, "AdShowTimes", "6qHEBKjQYlgTP1I2ELEh");
        await updateDoc(adShowTimeRef, {
          adsNumber: adsNumber
        });

        setLoading(true);
        Swal.fire({
          icon: "success",
          title: "Operation successful",
          text: "Ad Show Time has been successfully updated",
          confirmButtonColor: "#16a34a",
          confirmButtonText: "Ok"
        });
        handleClose();
        setTimeout(() => {
          setSuccess("");
          setLoading(false);
        }, 300);
      } catch (error) {
        console.log("Error", `Failed to update due to ${error}`);
        setError(`Failed to update due to ${error}`);
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
          <TextField
            fullWidth
            id="outlined-basic"
            label="Ads Number"
            size="small"
            variant="outlined"
            value={adsNumber}
            onChange={(e) => {
              setAdsNumber(e.target.value);
            }}
            sx={{ marginBottom: 2 }}
          />

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
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Modal>
    </div>
  );
}
