import React from 'react'
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
import { Box, ButtonGroup, Divider, IconButton, Tooltip } from '@mui/material';

const ButtonGroupMainPage = () => {
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
      dispatch(handleExitOrders())
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
        { icon: <PersonAddIcon />, name: 'Список Клієнтів', onClick: openUserModal },
        { icon: <LibraryAddIcon />, name: 'Додати замовлення', onClick: openOrderModal},
        { icon: <RefreshIcon />, name: 'Оновити базу', onClick: updateDB},
        { icon: <SearchIcon />, name: 'Пошук', onClick: openSearch},
        { icon: <ExitToAppIcon />, name: 'Вийти', onClick: handleExit},
      ];

  return (
    <Box
    sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}
    >
    <ButtonGroup 
    sx={{ position: 'absolute', bottom: 16, right: 16, backgroundColor: 'white'}}
    variant="outlined" aria-label="outlined primary button group">
      {actions.map((action) => (
        <Box sx={{display:"flex"}} key={action.name}>
                  <Divider orientation="vertical" flexItem sx={{height: '100%'}}/>
                  <Tooltip title={action.name}>
          <IconButton 
          onClick = {()=>{action.onClick()}}
          >
          {action.icon}
        </IconButton>
        </Tooltip>
        </Box>
        ))}
    </ButtonGroup>
    </Box>
  )
}

export default ButtonGroupMainPage
