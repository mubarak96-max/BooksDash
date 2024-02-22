import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export default function SingleQuote({
  index,
  quote,
  setDeleteId,
  setOpenConfirmDeleteModal,
  setIsEdit,
  setOpenModal,
  setEditId
}) {
  //   console.log("quote", quote?.data?.quote);
  return (
    <div className="my-5">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          {index + 1}) {quote?.data?.quote.substring(0, 30)}... (
          {quote?.data?.book})
        </AccordionSummary>
        <AccordionDetails>{quote?.data?.quote}</AccordionDetails>
        <AccordionActions>
          <Button
            onClick={() => {
              setIsEdit(true);
              setOpenModal(true);
              setEditId(quote?.id);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setDeleteId(quote?.id);
              setOpenConfirmDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
