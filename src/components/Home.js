import { Box, Button, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BasicTabs from "./Tabs";

const QuotesButton = styled(Button)(({ theme }) => ({
  color: "white",
  background: "blue",
  marginBottom: 3,
  marginTop: 2,
  display: "block",
  textAlign: "center"
}));

const Home = () => {
  let navigate = useNavigate();
  return (
    <>
      <BasicTabs />
    </>
    // <Box
    //   sx={{
    //     display: 'flex',

    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginY: 25
    //   }}
    // >
    //   <Box>
    //     <QuotesButton onClick={() => navigate('/quotes')}>
    //       Book Quotes
    //     </QuotesButton>
    //   </Box>
    // </Box>
  );
};

export default Home;
