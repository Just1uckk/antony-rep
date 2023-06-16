import React, {  useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, openModal, uploadEditClient } from "../toolkitSlice";
import { uploadNewClient } from "../toolkitSlice";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { ToastContainer, toast } from "react-toastify";

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
  const notify = (e) => toast(e);

  const editClientId = useSelector((state) => state.toolkit.clientEditIndex)
  const clientsList = useSelector((state) => state.toolkit.clientsAllList);

    const handleClose = () => {
        dispatch(openModal({name: 'clientAddModalState',id:"", value: ''}));
        setclientsName('');setclientsNum('');setclientsDiscount('')
      };

    const setName = useSelector((state) => state.toolkit.clientAddModalName)
    const dispatch = useDispatch();
    const [clientsName, setclientsName] = useState('');
    const [clientsNum, setclientsNum] = useState("");
    const [clientsDiscount, setclientsDiscount] = useState();

    useEffect(() => {
      if(editClientId&&clientsList){
        const foundClient = clientsList.find((obj) => obj.id === editClientId);
        setclientsName(foundClient.Name)
        setclientsNum(foundClient.phoneNum)
        setclientsDiscount(foundClient.discount)
      }
    },[editClientId, clientsList])

    const discountSet = (value) => {
      if(value <= 100 && !isNaN(value)){
        setclientsDiscount(value)
      }
      return
    }

    const phoneSet = (value) => {
      if(value.length <= 10 && !isNaN(value)){
        setclientsNum(value)
      }
      return
    }

      useEffect(() => {
        if(setName && !clientsName){
            setclientsName(setName)
        }},[setName, clientsName])

    const groupClientInfo = () => {
      const id = Date.now();
      const newClient = {
        Name: clientsName,
        discount: clientsDiscount,
        id: id,
        phoneNum: clientsNum,
      };
      if (clientsName && clientsNum && id) {
        handleClose();
        dispatch(uploadNewClient(newClient));
        setclientsDiscount("");
        setclientsName("");
        setclientsNum("");
      } else {
        notify(`Поля мають бути заповнені`);
      }
      dispatch(fetchClients())
    };

    const groupEditInfo = async () => {
      const newClient = {
        Name: clientsName,
        discount: clientsDiscount,
        id: editClientId,
        phoneNum: clientsNum,
      };
      if (clientsName && clientsNum) {
        handleClose();
        dispatch(uploadEditClient(newClient));
        setclientsDiscount("");
        setclientsName("");
        setclientsNum("");
      } else {
        notify(`Поля мають бути заповнені`);
      }
      dispatch(fetchClients())
    };
  
    return (
      <React.Fragment>
        <Modal open={useSelector((state) => state.toolkit.clientAddModalState)} onClose={handleClose}>
          <Box sx={{ ...style, width: 350 }}>
            <TextField
              sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
              fullWidth
              variant="outlined"
              value={clientsName}
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
              onChange={(e) => phoneSet(e.target.value)}
            ></TextField>
            <TextField
              sx={{ my: 1, bgcolor: "white", borderRadius: 4, paddingBottom: "10px" }}
              fullWidth
              variant="outlined"
              value={clientsDiscount?clientsDiscount:""}
              label="Знижка"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"> % </InputAdornment>
                )}}
              onChange={(e) => discountSet(e.target.value)}
            ></TextField>
            <Button
             sx={{display: !editClientId?"":"none"}}
              variant="contained"
              onClick={() => {
                groupClientInfo();
              }}
            >
              Додати Клієнта
            </Button>
            <Button
            color="success"
            sx={{display: editClientId?"":"none"}}
              variant="contained"
              onClick={() => {
                groupEditInfo();
              }}
            >
              Оновити Клієнта
            </Button>
            <ToastContainer/>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
