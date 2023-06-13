import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../toolkitSlice";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFont from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFont.pdfMake.vfs

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "85vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};


export default function OrderPrintModal() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(openModal("orderPrintModalState"));
  };

const tableData = useSelector((state) => state.toolkit.orderPrintTable)

  return (
    <div>
      <Modal
        open={useSelector((state) => state.toolkit.orderPrintModalState)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div style={{display: "flex", justifyContent: "center"}}>
        <embed id='orderPdf' style={{width: "100%", height: "85vh"}} type='application/pdf' src={tableData}/>
        </div>
        </Box>
      </Modal>
    </div>
  );
}
