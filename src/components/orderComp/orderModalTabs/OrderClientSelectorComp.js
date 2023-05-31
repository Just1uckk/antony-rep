import React from 'react'
import { Autocomplete, Box, Button, TextField, createFilterOptions } from "@mui/material";
import { InfoBlock } from '../../StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, openModal, orderStateUpdate } from '../../toolkitSlice';

const filter = createFilterOptions();

const OrderClientSelectorComp = () => {
  const dispatch = useDispatch();
  const clientsList = useSelector((state) => state.toolkit.clientsAllList);
  const clientsID = useSelector((state) => state.toolkit.tempOrderInfo.clID);
  const foundClient = clientsID ? clientsList.find(obj => obj.id === clientsID): {};

  const openUserModal = async () => {
    dispatch(fetchClients());
    dispatch(openModal('clientModalState'))
}

const updateStatus = (propName, value) => {
  if (propName === 'dateStart' || propName=== 'dateFinish') {
    const data = { propName, value: value.toString() };
    dispatch(orderStateUpdate(data));
  } else {
    const data = { propName, value };
    dispatch(orderStateUpdate(data));
  }
};


// const [value, setValue] = React.useState(null);

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
      <Autocomplete
      value={foundClient.Name?foundClient.Name:""}
      onChange={(event, newValue) => {
        if (newValue && newValue.id) {
          dispatch(orderStateUpdate({propName: "clID", value: newValue.id}))
        }
        if (newValue === null) {
          dispatch(orderStateUpdate({propName: "clID", value: ""}))
        }
        if (typeof newValue === 'string') {
          // setValue({
          //   Name: newValue,
          // });
        } else if (newValue && newValue.inputValue) {
          dispatch(openModal({name: 'clientAddModalState', value: newValue.inputValue}))
        } else {
          // setValue(newValue);
        }
      }}
      // options - list of options, params - value from input field
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.Name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            Name: `Add "${inputValue}"`,
          });
        }
        return filtered;
      }}
      options={clientsList}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.Name;
      }}
      renderOption={(props, option) => <li {...props}>{option.Name}</li>}
      sx={{ width: "60%" }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} 
        size="small"
        id="filled-basic"
        variant="outlined"
        />
      )}
    />
    </InfoBlock>
    <InfoBlock>
      <p>Скидка, %</p>
      <TextField disabled
        sx={{ width: "60%" }}
        size="small"
        id="filled-basic"
        variant="outlined"
        value={foundClient.discount?foundClient.discount:""}
        onChange={(e) => updateStatus("clDiscount", e.target.value)}
      />
    </InfoBlock>
    <InfoBlock>
      <p>Телефон</p>
      <TextField disabled
        sx={{ width: "60%" }}
        size="small"
        id="filled-basic"
        variant="outlined"
        value={foundClient.phoneNum?foundClient.phoneNum:""}
        onChange={(e) => updateStatus("clPhoneNum", e.target.value)}
      />
    </InfoBlock>
    <InfoBlock 
    style={{display:"flex", justifyContent:"end"}}
    >
      <Button
      size="small"
      variant="outlined"
      onClick={()=>{openUserModal()}}
      >
        Список клієнтів
      </Button>
    </InfoBlock>
  </Box>
  )
}

export default OrderClientSelectorComp