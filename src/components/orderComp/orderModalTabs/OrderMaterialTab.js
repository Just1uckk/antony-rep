import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  orderDeleteMaterial,
  orderDeleteStatusUpdate,
  orderMaterialAddNewObject,
  orderMaterialUpdate,
} from "../../toolkitSlice";
import OrderMaterialAdditionalModal from "./OrderMaterialAdditionalModal";
import OrderAdditionalMapping from "./OrderAdditionalMapping";
import DeleteIcon from '@mui/icons-material/Delete';

const MaterialBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
`;

const OrderMaterialTab = () => {
  const deleteElement = useSelector((state)=>state.toolkit.orderMaterialDelete)? '': 'none';
  const rows = useSelector((state) => state.toolkit.tempMaterialInfo);
  const dispatch = useDispatch();

  const materialChange = (index, propName, value) => {
    const data = { index, propName, value };
    if (propName === "count" && isNaN(value)) {
    } else if (propName === "width" && isNaN(value)) {
    } else if (propName === "height" && isNaN(value)) {
    } else {
      dispatch(orderMaterialUpdate(data));
    }
  };

  const dispDrill = rows.filter((row) => row.drilling.length).length
    ? ""
    : "none";
  const dispPaint = rows.filter((row) => row.painting.length).length
    ? ""
    : "none";

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {/* блок материала */}
        <MaterialBlock>
          <Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: "auto" }}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ display: deleteElement }}></TableCell>
                    <TableCell>№</TableCell>
                    <TableCell align="center">Кіль. *</TableCell>
                    <TableCell align="center">Матеріал *</TableCell>
                    <TableCell align="center">Товщ *</TableCell>
                    <TableCell align="center">Шир.мм *</TableCell>
                    <TableCell align="center">Вис.мм *</TableCell>
                    <TableCell align="center">Обробка *</TableCell>
                    <TableCell align="center" sx={{ display: dispDrill }}>
                      Свердлення
                    </TableCell>
                    <TableCell align="center" sx={{ display: dispPaint }}>
                      Додатково
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ display: deleteElement }}>
                        <IconButton
                           onClick={() => {dispatch(orderDeleteMaterial(index))}}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.num}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          sx={{ width: "50px" }}
                          value={row.count}
                          onChange={(e) => {
                            materialChange(index, "count", e.target.value);
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Select
                          size="small"
                          value={row.material}
                          onChange={(e) => {
                            materialChange(index, "material", e.target.value);
                          }}
                        >
                          <MenuItem value={1}>Б\Ц</MenuItem>
                          <MenuItem value={2}>Діамант</MenuItem>
                          <MenuItem value={3}>Дзеркало</MenuItem>
                          <MenuItem value={4}>Бронза</MenuItem>
                          <MenuItem value={5}>Графіт</MenuItem>
                          <MenuItem value={6}>Триплекс</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <Select
                          size="small"
                          value={row.thickness}
                          onChange={(e) => {
                            materialChange(index, "thickness", e.target.value);
                          }}
                        >
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={12}>12</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          sx={{ width: "70px" }}
                          onChange={(e) => {
                            materialChange(index, "width", e.target.value);
                          }}
                          value={row.width}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          sx={{ width: "70px" }}
                          onChange={(e) => {
                            materialChange(index, "height", e.target.value);
                          }}
                          value={row.height}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Select
                          size="small"
                          value={row.edge}
                          onChange={(e) => {
                            materialChange(index, "edge", e.target.value);
                          }}
                        >
                          <MenuItem value={1}>Шліфовка</MenuItem>
                          <MenuItem value={2}>Поліровка</MenuItem>
                          <MenuItem value={3}>Збиття фаски</MenuItem>
                          <MenuItem value={4}>Фацет 10</MenuItem>
                          <MenuItem value={5}>Фацет 15</MenuItem>
                          <MenuItem value={6}>Глубока фаска</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell sx={{ display: dispDrill }}>
                        {/* {row.drilling} */}
                        <OrderAdditionalMapping
                          rowIndex={index}
                          propName={"drilling"}
                        />
                      </TableCell>
                      <TableCell sx={{ display: dispPaint }}>
                        {/* {row.painting} */}
                        <OrderAdditionalMapping
                          rowIndex={index}
                          propName={"painting"}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            dispatch(
                              openModal({
                                name: "orderMaterialAdditionalState",
                                index,
                              })
                            );
                          }}
                          size="small"
                          variant="contained"
                        >
                          +
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ marginTop: 2 }}>
            <Button
            sx={{marginLeft: 3}}
              size="small"
              variant="contained"
              onClick={() => {
                dispatch(orderMaterialAddNewObject());
              }}
            >
              Додати Матеріал
            </Button>
            <Button
            sx={{marginLeft: 3}}
              size="small"
              variant="outlined"
              onClick={() => {
                dispatch(orderDeleteStatusUpdate());
              }}
            >
              Видалити елемент
            </Button>
            </Box>
          </Box>
        </MaterialBlock>
      </Box>
      <OrderMaterialAdditionalModal />
    </div>
  );
};

export default OrderMaterialTab;
