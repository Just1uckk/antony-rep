import React from 'react'
import { Box, Button, TextField} from "@mui/material";
import { InfoBlock } from '../../StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, openModal } from '../../toolkitSlice';


const OrderClientSelectorComp = () => {
  const dispatch = useDispatch();
  const lightUpErrors= useSelector((state) => state.toolkit.makeThemRed)
  const clientsList = useSelector((state) => state.toolkit.clientsAllList);
  const clientsID = useSelector((state) => state.toolkit.tempOrderInfo.clID);
  const searchClient = clientsList.find(obj => obj.id === clientsID)
  console.log(searchClient, clientsID)
  const foundClient = searchClient ? searchClient : {Name: "", discount: "", phoneNum: ""};

  const openUserModal = async () => {
    dispatch(fetchClients());
    dispatch(openModal({name: 'clientModalState', value: true}))
}

  return (
    <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: "20px 0 20px 0",
    }}
  >
    <InfoBlock>
      <p>Ім’я клієнта</p>
      <TextField disabled
      error = {lightUpErrors}
        sx={{ width: "60%" }}
        size="small"
        id="filled-basic"
        variant="outlined"
        value={foundClient.Name}
      />
    </InfoBlock>
    <InfoBlock>
      <p>Знижка, %</p>
      <TextField disabled
      error = {lightUpErrors}
        sx={{ width: "60%" }}
        size="small"
        id="filled-basic"
        variant="outlined"
        value={foundClient.discount}
      />
    </InfoBlock>
    <InfoBlock>
      <p>Телефон</p>
      <TextField 
      error = {lightUpErrors}
      disabled 
        sx={{ width: "60%" }}
        size="small"
        id="filled-basic"
        variant="outlined"
        value={foundClient.phoneNum}
      />
    </InfoBlock>
    <InfoBlock 
    style={{display:"flex", justifyContent:"end"}}
    >
      <Button
      color={lightUpErrors?"error":'primary'}
      size="small"
      variant="contained"
      onClick={()=>{openUserModal()}}
      >
        Обрати Клієнта
      </Button>
    </InfoBlock>
  </Box>
  )
}

export default OrderClientSelectorComp