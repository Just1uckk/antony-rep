import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus } from '../store/GloabalOrdersList'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase'

const MainTableStatus = ({infoRow}) => {
    const dispatch = useDispatch();
    const getOrdData = useSelector((state) => state.globalOrders.orders)
    const indexOfOrder = getOrdData.findIndex(obj => obj.ranID === infoRow.ranID)
    const onChange = (value) => {
        if(getOrdData.length && indexOfOrder !== -1){
        dispatch(changeStatus({index: indexOfOrder, value: value }))
        deleteDoc(doc(db, "orders", infoRow.ranID));
        setDoc(doc(db, "orders", infoRow.ranID), {
            ranID:infoRow.ranID,
            ordID:infoRow.ordID,
            dateStart:infoRow.dateStart,
            dateFinish:infoRow.dateFinish,
            clID:infoRow.clID,
            fullPrice:infoRow.fullPrice,
            paid:infoRow.paid,
            status: value,
            fullPaid:infoRow.fullPaid,
            installation:infoRow.installation,
            delivery:infoRow.delivery,
            adress:infoRow.adress,
            comments:infoRow.comments,
            material: infoRow.material
        });
    }
    }

  return (
    <FormControl fullWidth >
          <Select
                size="small"
                value={infoRow.status}
                onChange={(e) => onChange(e.target.value)}
              >
                <MenuItem value={1}>Офіс</MenuItem>
                <MenuItem value={2}>Порізка</MenuItem>
                <MenuItem value={3}>Обробка</MenuItem>
                <MenuItem value={4}>Свердлення</MenuItem>
                <MenuItem value={5}>Граф. роботи</MenuItem>
                <MenuItem value={9}>Гартування</MenuItem>
                <MenuItem value={6}>Готово</MenuItem>
                <MenuItem value={7}>Монтаж</MenuItem>
                <MenuItem value={8}>Отриман</MenuItem>
              </Select>
          </FormControl>
  )
}

export default MainTableStatus
