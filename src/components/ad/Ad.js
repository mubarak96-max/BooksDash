import { AdminPanelSettings } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import AdsModal from "./AdModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Ad = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState([]);

  const getData = async () => {
    try {
      let arr = [];
      const booksRef = collection(db, "AdShowTimes");

      const querySnapshot = await getDocs(booksRef);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        arr.push({ id: doc.id, data: doc.data() });
      });

      setTimes(arr);

      // console.log('quotes', quotes);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  console.log("times", times);

  useEffect(() => {
    getData();
  }, [loading]);

  return (
    <div className="max-w-sm my-5 rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Number of screens per Ad</div>

        <p className="text-gray-700 text-base">
          Screens: <span className="">{times[0]?.data?.adsNumber}</span>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Edit
        </button>
      </div>

      <AdsModal
        openModal={openModal}
        setLoading={setLoading}
        editId={editId}
        handleClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Ad;
