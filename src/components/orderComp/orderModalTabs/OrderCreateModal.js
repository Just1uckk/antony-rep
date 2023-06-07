import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, orderModalHandleClose, orderUpdate, uploadNewOrder } from '../../toolkitSlice';
import OrderTabs from '../OrderTabs';
import { Button } from '@mui/material';
import { fetchOrders } from '../../store/GloabalOrdersList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '80vw',
  minHeight: '50vh',
  width: "auto",
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: "4px",
  boxShadow: 24,
  padding: " 10px 0 10px 0",
};

export default function OrderCreateModal() {
    const tempOrdSave = useSelector((state) => state.toolkit.tempOrderInfo);
    const editCheck = !tempOrdSave.ranID? 'none' : ''
    const dispatch = useDispatch();
    const handleClose = () => {
      dispatch(orderModalHandleClose())
      dispatch(openModal('orderModalState'))};

  return (
    <div>
      <Modal
        open={useSelector((state) => state.toolkit.orderModalState)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <OrderTabs/>
        <Box sx={{display: "flex", justifyContent:"space-between"}}>
        <Button
        sx={{position: 'absolute', bottom: 10, margin: "10px 0 10px 25px",width:100, display: tempOrdSave.ranID? 'none' : '' }}
        variant="contained"
        onClick={() => {dispatch(uploadNewOrder()); dispatch(fetchOrders())}}
      >
        Додати
      </Button>
      <Button
        sx={{position: 'absolute', bottom: 65, margin: "10px 0 10px 25px",width:100, display: editCheck }}
        variant="contained"
        onClick={() => {dispatch(orderUpdate());dispatch( fetchOrders())}}
      >
        Оновити
      </Button>
      <Button
        color="error"
        sx={{position: 'absolute', bottom: 10, margin: "10px 25px 10px 25px",width:100, display: editCheck }}
        variant="contained"
        onClick={() => {dispatch(openModal('orderDeleteModal'))}}
      >
        Видалити
      </Button>
      </Box>
        </Box>
      </Modal>
    </div>
  );
}