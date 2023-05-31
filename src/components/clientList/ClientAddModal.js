import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../toolkitSlice";
import { uploadNewClient } from "../toolkitSlice";
import { nanoid } from "nanoid";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


export function ClientAddModal() {

    const handleClose = () => {
        dispatch(openModal("clientAddModalState"));

      };

    const setName = useSelector((state) => state.toolkit.clientAddModalName)
    const dispatch = useDispatch();
    const [clientsName, setclientsName] = useState('');
    const [clientsNum, setclientsNum] = useState("");
    const [clientsDiscount, setclientsDiscount] = useState("0");

      const test = useMemo(() => {
        if(setName && !clientsName){
            setclientsName(setName)
            return setName
        } else {
            return clientsName
        }},[setName])

    const groupClientInfo = async () => {
      const id = await nanoid();
      const newClient = {
        Name: clientsName,
        discount: clientsDiscount,
        id: id,
        phoneNum: clientsNum,
      };
      console.log(
        newClient.id,
        newClient.Name,
        newClient.phoneNum,
        newClient.discount
      );
      if (clientsName && clientsNum && id) {
        dispatch(uploadNewClient(newClient));
        setclientsDiscount("");
        setclientsName("");
        setclientsNum("");
      } else {
        alert(`input's can not be empty`);
      }
    };
  
    return (
      <React.Fragment>
        <Modal open={useSelector((state) => state.toolkit.clientAddModalState)} onClose={handleClose}>
          <Box sx={{ ...style, width: 350 }}>
            <TextField
              sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
              fullWidth
              variant="outlined"
              value={test}
              label="Ім'я"
              type="string"
              onChange={(e) => setclientsName(e.target.value)}
            ></TextField>
            <TextField
              sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
              fullWidth
              variant="outlined"
              value={clientsNum ? clientsNum : ""}
              label="Номер телефону"
              type="string"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+ 38 </InputAdornment>
                ),
              }}
              onChange={(e) => isNaN(e.target.value)? '' :setclientsNum(e.target.value)}
            ></TextField>
            <TextField
              sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
              fullWidth
              variant="outlined"
              value={clientsDiscount ? clientsDiscount : ""}
              label="Скидка"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"> % </InputAdornment>
                )}}
              onChange={(e) => isNaN(e.target.value)? '' :setclientsDiscount(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              onClick={() => {
                groupClientInfo();
                handleClose();
              }}
            >
              Add Client
            </Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }