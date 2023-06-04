import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { fetchClients, handleExitClients, openModal } from './toolkitSlice';
import { useDispatch } from 'react-redux';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { fetchOrders, handleExitOrders } from './store/GloabalOrdersList';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';
import SearchIcon from '@mui/icons-material/Search';


export default function BasicSpeedDial() {
    const dispatch = useDispatch();

const openUserModal = async () => {
    dispatch(fetchClients());
    dispatch(openModal('clientModalState'))
}
const openOrderModal = async () => {
  dispatch(fetchClients());
  dispatch(fetchOrders());
    dispatch(openModal('orderModalState'))
}
const updateDB = () => {
  dispatch(fetchClients());
  dispatch(fetchOrders());
}
const handleExit = () => {
  signOut(auth); 
  dispatch(handleExitClients()); 
  dispatch(handleExitOrders())
}

const openSearch = () => {
  dispatch(openModal('orderMainPageSearch'))
}

const actions = [
  { icon: <PersonAddIcon />, name: 'Додати Клієнта', onClick: openUserModal },
  { icon: <LibraryAddIcon />, name: 'Додати замовлення', onClick: openOrderModal},
  { icon: <RefreshIcon />, name: 'Оновити базу', onClick: updateDB},
  { icon: <SearchIcon />, name: 'Пошук', onClick: openSearch},
  { icon: <ExitToAppIcon />, name: 'Вийти', onClick: handleExit},
];

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        direction = "left"
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16}}
        icon={<SpeedDialIcon sx={{color: "white"}}/>}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick = {()=>{action.onClick()}}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}