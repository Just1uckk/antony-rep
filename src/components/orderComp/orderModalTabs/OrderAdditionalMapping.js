import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { orderMaterialRemoveAddition } from '../../toolkitSlice';
import { sandblastingDecode, workDecode } from '../../WorkDecoding';

const OrderAdditionalMapping = (props) => {
    const rows = useSelector((state) => state.toolkit.tempMaterialInfo)
    const deleteElement = useSelector((state)=>state.toolkit.orderMaterialDelete)? '': 'none';
    const dispatch = useDispatch();
    const propName = props.propName
    const rowIndex = props.rowIndex

      let data = []

for(let i=0; i<=rows[rowIndex][propName].length-1; i++) {
    if(rows[rowIndex][propName][i].work === 1){
        data.push([
            `ø ${rows[rowIndex][propName][i].valueOne}-${rows[rowIndex][propName][i].valueTwo} од.`
        ])} else if (rows[rowIndex][propName][i].work === 3 ) {
            data.push([
                `${workDecode[rows[rowIndex][propName][i].work -1].prop} ${rows[rowIndex][propName][i].valueOne}`
        ])} else if (rows[rowIndex][propName][i].work === 4 ) {
            data.push([
                `${workDecode[rows[rowIndex][propName][i].work -1].prop} ${rows[rowIndex][propName][i].valueOne} ${rows[rowIndex][propName][i].valueTwo}`
        ])} else if (rows[rowIndex][propName][i].work === 5 ) {
            data.push([
                `${workDecode[rows[rowIndex][propName][i].work -1].prop} ${sandblastingDecode[rows[rowIndex][propName][i].valueOne -1].prop}`
        ])} else {
            data.push([
                `${workDecode[rows[rowIndex][propName][i].work -1].prop}`
            ])}
}

  return (
    <Box>
        {data.map((row, index) => (
            <Box key={index} sx={{display: 'flex', alignItems: 'center'}}>
                {row}
                <IconButton
                sx={{display: deleteElement}}
                onClick={() => {dispatch(orderMaterialRemoveAddition({rowIndex, propName, index}))}}
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
        ))}
      </Box>
  )
}

export default OrderAdditionalMapping
