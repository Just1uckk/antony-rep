import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { additionalWorkPush, openModal } from "../../toolkitSlice";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  padding: 4,
};

export default function OrderMaterialAdditionalModal() {
  const notify = (e) => toast(e);
  const dispatch = useDispatch();

  const [work, setWork] = useState("");
  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");

  const handleClose = () => {
    setWork('')
    setValueOne('')
    setValueTwo('')
    dispatch(openModal("orderMaterialAdditionalState"));
  };

  const handleSave = () => {
    let value
    if(work){
    if(work === 1 && valueOne && valueTwo) {
    value = {work, valueOne, valueTwo}
  } else if (work === 3 && valueOne ) {
    value = {work, valueOne}
  } else if (work === 4 && valueOne  && valueTwo ) {
    value = {work, valueOne, valueTwo}
  } else if (work === 5 && valueOne ) {
    value = {work, valueOne}
  } else if (work === 1||work === 3||work === 4||work === 5){
    notify('усі поля мають бути заповнені')
    return
  } else { 
    value = {work}
  }
  dispatch(additionalWorkPush(value))
  setWork('')
    setValueOne('')
    setValueTwo('')
}
setWork('')
    setValueOne('')
    setValueTwo('')
    dispatch(openModal("orderMaterialAdditionalState"));
}

  return (
    <div>
      <Modal
        open={useSelector(
          (state) => state.toolkit.orderMaterialAdditionalState
        )}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p style={{paddingBottom:"10px"}}>Оберіть роботу:</p>
          <FormControl variant="standard" fullWidth sx={{paddingBottom:"10px"}}>
          <InputLabel id='workLabel'>Робота</InputLabel>
          <Select
           label="Робота"
            labelId='workLabel'
            size="small"
            value={work}
            onChange={(e) => {
              setWork(e.target.value);
              setValueOne("");
              setValueTwo("");
            }}
          >
            <MenuItem value={1}>Свердлення</MenuItem>
            <MenuItem value={10}>Виріз на Полотні</MenuItem>
            <MenuItem value={2}>Уф.Друк</MenuItem>
            <MenuItem value={3}>Фарбування</MenuItem>
            <MenuItem value={4}>Подвійне Фарбування</MenuItem>
            <MenuItem value={5}>Піскуоструй</MenuItem>
            <MenuItem value={6}>Гартування</MenuItem>
            <MenuItem value={7}>Порізка Лазером</MenuItem>
            <MenuItem value={8}>Поклійка Оракала</MenuItem>
            <MenuItem value={9}>Поклійка Броні</MenuItem>
          </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{paddingBottom:"10px",display: [work === 1 ? "" : "none"] }}>
          <InputLabel id='diamLabel'>Діаметр</InputLabel>
          <Select
          labelId='diamLabel'
          label="Діаметр"
            value={valueOne}
            size="small"
            onChange={(e) => {
              setValueOne(e.target.value);
            }}
          >
            <MenuItem value={5}>ø5</MenuItem>
            <MenuItem value={6}>ø6</MenuItem>
            <MenuItem value={7}>ø7</MenuItem>
            <MenuItem value={8}>ø8</MenuItem>
            <MenuItem value={9}>ø9</MenuItem>
            <MenuItem value={10}>ø10</MenuItem>
          </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{paddingBottom:"10px",display: [work === 1 ? "" : "none"] }}>
          <InputLabel id='countLabel'>Кількість</InputLabel>
          <Select
          label="Кількість"
          labelId='countLabel'
            sx={{ display: [work === 1 ? "" : "none"] }}
            value={valueTwo}
            size="small"
            onChange={(e) => {
              setValueTwo(e.target.value);
            }}
          >
            <MenuItem value={1}>1 од.</MenuItem>
            <MenuItem value={2}>2 од.</MenuItem>
            <MenuItem value={3}>3 од.</MenuItem>
            <MenuItem value={4}>4 од.</MenuItem>
            <MenuItem value={5}>5 од.</MenuItem>
            <MenuItem value={6}>6 од.</MenuItem>
            <MenuItem value={7}>7 од.</MenuItem>
            <MenuItem value={8}>8 од.</MenuItem>
            <MenuItem value={9}>9 од.</MenuItem>
            <MenuItem value={10}>10 од.</MenuItem>
          </Select>
          </FormControl>
          <TextField
          fullWidth
            sx={{ display: [work === 3 || work === 4 ? "" : "none"] }}
            value={valueOne}
            size="small"
            onChange={(e) => {
              setValueOne(e.target.value);
            }}
          ></TextField>
          <TextField
          fullWidth
            sx={{ display: [work === 4 ? "" : "none"] }}
            value={valueOne}
            size="small"
            onChange={(e) => {
              setValueOne(e.target.value);
            }}
          ></TextField>
          <FormControl variant="standard" fullWidth sx={{paddingBottom:"10px",display: [work === 5 ? "" : "none"] }}>
          <InputLabel id='sandingLabel'>Площа</InputLabel>
          <Select
          label="Площа"
          labelId='sandingLabel'
            value={valueOne}
            size="small"
            onChange={(e) => {
              setValueOne(e.target.value);
            }}
          >
            <MenuItem value={1}>Повний Фоновий</MenuItem>
            <MenuItem value={2}>3/4 Фоновий</MenuItem>
            <MenuItem value={3}>Половина Фоновий</MenuItem>
            <MenuItem value={4}>1/4 Фоновий</MenuItem>
            <MenuItem value={5}>Фігурний</MenuItem>
          </Select>
          </FormControl>
          <Button
          variant="contained"
          onClick={handleSave}
          >Додати</Button>
          <ToastContainer/>
        </Box>
      </Modal>
    </div>
  );
}
