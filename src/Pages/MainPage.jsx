import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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


//проверка на вход в систему
const MainPage = () => {
  const [searchValue, setSearchValue]= useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
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
      <Box sx={{ zIndex: 2 }}>
        <Box sx={{boxSizing: "border-box",p:1.25,backgroundColor:"white", width:"15%", mb:1.5, borderRadius:'4px'}}>
        <TextField
        value={searchValue}
        fullWidth
        variant="outlined"
        size='small'
        label="Пошук по номеру"
        onChange={(e)=>{setSearchValue(e.target.value)}}
        />
        </Box>
        <CollapsibleTable search={searchValue} />
      </Box>
    </div>
  );
};

export default MainPage;
