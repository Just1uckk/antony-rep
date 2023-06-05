import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Modal } from '@mui/material';
import { clientsDelete, fetchClients, openModal } from '../toolkitSlice';

const style = {
    boxSizing: 'borderBox',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // minWidth: '80vw',
    // minHeight: '50vh',
    width: "auto",
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: "4px",
    boxShadow: 24,
    padding: 3,
  };

export default function ClientsDeleteModal () {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(openModal('clientsDeleteModal'))};
  return (
    <React.Fragment>
      <Modal
        open={useSelector((state) => state.toolkit.clientsDeleteModal)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2>Ви бажаєте видалити цього клієнта?</h2> 
        <Box sx={{display:'flex', justifyContent:'space-between', paddingTop: 2}}>
            <Button
            color="error"
            size='small'
            variant="contained"
            onClick={() => {dispatch(clientsDelete()); dispatch(fetchClients()); dispatch(openModal('clientsDeleteModal'))}}
            >Так</Button>
            <Button
            size='small'
    variant="contained"
            onClick={() => handleClose()}
            >{`Ні`}</Button>
        </Box>
        </Box>
    </Modal>   
    </React.Fragment>
  )
}

