import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal, orderDelete } from '../../toolkitSlice';
import { Box, Button, Modal } from '@mui/material';
import { fetchOrders } from '../../store/GloabalOrdersList';

const style = {
    boxSizing: 'borderBox',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: "4px",
    boxShadow: 24,
    padding: 3,
  };

export default function OrderDeleteModal () {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(openModal('orderDeleteModal'))};

        const handleDelete = async () => {
         await dispatch(orderDelete());
          dispatch(fetchOrders()); 
          dispatch(openModal('orderDeleteModal'))
      }

  return (
    <React.Fragment>
      <Modal
        open={useSelector((state) => state.toolkit.orderDeleteModal)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h2>Ви бажаєте видалити це замовлення?</h2> 
        <Box sx={{display:'flex', justifyContent:'space-between', paddingTop: 2}}>
            <Button
            color="error"
            size='small'
            variant="contained"
            onClick={() => {handleDelete()}}
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

