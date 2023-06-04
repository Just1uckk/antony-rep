import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NestedClientsListModal from "../components/clientList/ClientListModal";
import { Box, TextField } from "@mui/material";
import BasicSpeedDial from "../components/SpeedDialCustom";
import OrderCreateModal from "../components/orderComp/orderModalTabs/OrderCreateModal";
import CollapsibleTable from "../components/orderComp/OrderMainPageTable";
import { ClientAddModal } from "../components/clientList/ClientAddModal";
import { fetchOrders } from "../components/store/GloabalOrdersList";
import { fetchClients } from "../components/toolkitSlice";
import OrderPrintModal from "../components/orderComp/OrderPrintModal";
import { useState } from "react";
import { auth } from "../components/Firebase";
import OrderDeleteModal from "../components/orderComp/orderModalTabs/OrderDeleteModal";
import Slide from '@mui/material/Slide';


//проверка на вход в систему
const MainPage = () => {
  const checked = useSelector((state) => state.toolkit.orderMainPageSearch);
  const [searchValue, setSearchValue]= useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useMemo(()=>{
    setSearchValue("")
  }, [checked])
  
  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        dispatch(fetchClients());
        dispatch(fetchOrders());
      } else {
        navigate("/login");
      }
    });
  });

  return (
    <div>
      <Box style={{ position: "absolute", right: "5%", top: "-235px" }}>
        <NestedClientsListModal />
        <OrderDeleteModal/>
        <ClientAddModal />
        <OrderCreateModal />
        <OrderPrintModal />
        <BasicSpeedDial />
      </Box>
      <Box sx={{ zIndex: 2}}>
        <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
        <Box sx={{position: "absolute" ,boxSizing: "border-box",p:1.25, paddingTop: '20px',backgroundColor:"white", width:"30%", mb:1.5, borderRadius:'0 0 4px 4px', left:"35%", top: "0px"}}>
        <TextField
        value={searchValue}
        fullWidth
        variant="outlined"
        size='small'
        label="Пошук по номеру"
        onChange={(e)=>{setSearchValue(e.target.value)}}
        />
        </Box>
        </Slide>
        <CollapsibleTable search={searchValue} />
      </Box>
    </div>
  );
};

export default MainPage;
