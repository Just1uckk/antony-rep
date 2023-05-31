import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../toolkitSlice";
import { Grid, TextField } from "@mui/material";


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
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const clientsList = useSelector(
    (state) => state.toolkit.clientsAllList
  );
  const searchList = searchInput
    ? clientsList.filter((data) => data === searchInput)
    : clientsList;

  const handleClose = () => {
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
            maxHeight: "75vh",
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
            sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "60vh" }}
          >
            {searchList &&
              searchList.map((data, index) => (
                <Box key={index}>
                  <Grid
                    container
                    sx={{
                      justifyContent: "space-between",
                      height: "30px",
                    }}
                  >
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
                    <Grid item={true} xs={2} sx={{ textAlign: "right" }}>
                      {data.discount.toString()}
                    </Grid>
                    <Grid item={true} xs={0.01}></Grid>
                  </Grid>
                </Box>
              ))}
          </Box>
          <Button
          variant="contained"
          onClick={() => {
            dispatch(openModal("clientAddModalState"))
          }}
        >
          Додати Клієнта
        </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NestedClientsListModal;
