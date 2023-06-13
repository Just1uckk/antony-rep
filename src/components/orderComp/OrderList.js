import { Box } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

const OrderList = () => {
  return (
    <div>
      <Box sx={{width:"100%",height:"85vh",backgroundColor:"white", borderRadius: "4px", zIndex:2, padding:2}}>
      <Box sx={{width: "100%", display: "flex", boxSizing: "border-box", flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={0.5}>
          <Item>№</Item>
        </Grid>
        <Grid item xs={1.7} sx={{height:"30px"}}>
          <Item>Ім'я та телефон замовника</Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item>Дата замовлення</Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item>Термін виконання</Item>
        </Grid>
        <Grid item xs={1.2}>
          <Item>Вартість</Item>
        </Grid>
        <Grid item xs={1.3}>
          <Item>Залишок до сплати</Item>
        </Grid>
        <Grid item xs={1.3}>
          <Item>Стан замовлення</Item>
        </Grid>
        <Grid item xs={1.3}>
          <Item>Монтаж</Item>
        </Grid>
        <Grid item xs={2.3}>
          <Item>Інфо</Item>
        </Grid>
      </Grid>
    </Box>
      </Box>
    </div>
  )
}

export default OrderList
