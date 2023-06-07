import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../toolkitSlice";
import { Divider, Grid, IconButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ClientsDeleteModal from "./ClientsDeleteModal";
import SettingsIcon from '@mui/icons-material/Settings';


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

const NestedClientsListModal = (state) => {
  const [deleteClients, setDeleteClients] = useState(false)
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const clientsList = useSelector(
    (state) => state.toolkit.clientsAllList
  );
  const searchTest = useMemo(() => {
    const nameSearch = clientsList.filter((obj) => obj.Name.includes(searchInput));
    const numberSearch = clientsList.filter((obj) => obj.phoneNum.includes(searchInput));
    const found = nameSearch.concat(numberSearch)
    if(searchInput){
      return found
    } else {return clientsList}
  },[searchInput, clientsList])

  const handleClose = () => {
    setDeleteClients(false)
    dispatch(openModal("clientModalState"));
  };

  return (
    <div>
      <Modal
        open={useSelector((state) => state.toolkit.clientModalState)}
        onClose={handleClose}
      >
        <Box
          sx={{
            ...style,
            width: "800px",
            maxHeight: "80vh",
            paddingRight: "30px",
          }}
        >
          <Box>
            <TextField
              sx={{ my: 1, bgcolor: "white", borderRadius: 4 }}
              fullWidth
              variant="filled"
              value={searchInput}
              label="Пошук"
              type="string"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            ></TextField>
          </Box>
          <Box sx={{backgroundColor:"WhiteSmoke", height: "50px",                      alignItems:"center", display:"flex", marginBottom: "10px"}}>
            <Grid
                    container
                    sx={{
                      justifyContent: "space-between",
                      height: "30px",
                      fontStyle:"italic",
                    }}
                  >
                    <Grid xs={1} sx={{
                      display: deleteClients ? "" : "none"
                    }} item={true}></Grid>
                    <Grid xs={0.01} item={true}></Grid>
                    <Grid
                    item={true}
                      xs={4}
                      sx={{
                        alignSelf: "center",
                        textAlign: "left",
                      }}
                    >
                      Ім'я Клієнта
                    </Grid>
                    <Grid item={true} xs={4} sx={{ alignSelf: "center" }}>
                      Номер телефону
                    </Grid>
                    <Grid
                    item={true}
                      xs={2}
                      sx={{
                        alignSelf: "center",
                        textAlign: "right",
                      }}
                    >
                      Скидка
                    </Grid>
                    <Grid item={true} xs={0.4}></Grid>
                  </Grid>
            </Box>
          <Box
            sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "60vh"}}
          >
            {searchTest &&
              searchTest.map((data, index) => (
                <Box key={index}>
                  <Grid
                    container
                    sx={{
                      justifyContent: "space-between",
                      height: "30px",
                    }}
                  >
                    <Grid 
                    sx={{
                      display: deleteClients ? "" : "none"
                    }}
                    item={true}>
                       <IconButton
                       color="error"
                           onClick={() => {dispatch(openModal({name: 'clientsDeleteModal', value: data.id}))}}
                        >
                          <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid 
                    sx={{
                      display: deleteClients ? "" : "none"
                    }}
                    item={true}>
                    <IconButton
                           onClick={() => {dispatch(openModal({name: "clientAddModalState", id:data.id}))}}
                        >
                          <SettingsIcon />
                        </IconButton>
                        </Grid>
                    <Grid xs={0.01} item={true}></Grid>
                    <Grid
                    item={true}
                      xs={4}
                      sx={{
                        alignSelf: "center",
                        justifySelf: "left",
                        textAlign: "left",
                      }}
                    >
                      {data.Name}
                    </Grid>
                    <Grid item={true} xs={4} sx={{ alignSelf: "center" }}>
                      {data.phoneNum}
                    </Grid>
                    <Grid item={true} xs={2} sx={{ alignSelf: "center", textAlign: "right" }}>
                      {data.discount.toString()} {data.discount?"%":""}
                    </Grid>
                    <Grid item={true} xs={0.01}></Grid>
                  </Grid>
                </Box>
              ))}
          </Box>
          <Box sx={{paddingBottom:"10px",display: clientsList.length&&!searchTest.length?"":"none"}}>
                    <p>Не було знайдено клієнтів по запиту.</p>
                  </Box>
          <Box
          sx={{
            display: clientsList.length?"none":"",
            padding: "15px"
        }}
          >
            <p>
              Додайте першого клієнта.
            </p>
          </Box>
          <Divider sx={{ width: "100%" }} />
          <Box sx={{height:"15px", display:"flex", justifyContent:"space-between"}}></Box>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Button
          variant="contained"
          onClick={() => {
            dispatch(openModal("clientAddModalState"))
          }}
        >
          Додати Клієнта
        </Button>
        <IconButton
          variant="contained"
          onClick={() => {
            setDeleteClients(!deleteClients)
          }}
        >
         <SettingsIcon/>
        </IconButton>
        </Box>
        <ClientsDeleteModal/>
        </Box>
      </Modal>
    </div>
  );
};

export default NestedClientsListModal;
