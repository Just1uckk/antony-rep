import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from "@mui/icons-material/Settings";
import { openModal, orderModalEdit, orderSaveTable } from "../toolkitSlice";
import PrintIcon from "@mui/icons-material/Print";
import { OrderPrintTableGen } from "./OrderPrintTableGen";
import { statusDecode } from "../WorkDecoding";
import { useMemo } from "react";

function Row(props) {
  const dispatch = useDispatch();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const clientsList = useSelector((state) => state.toolkit.clientsAllList);
  const foundClient = clientsList.find((obj) => obj.id === row.clID);
  const deadline = new Date(row.dateFinish) - Date.now();
  const rowColor = () => {
    if (row.status === 8) {
      return "LightGreen";
    } else if (deadline > 86400000 && row.status !== 8) {
      return "";
    } else if (deadline > 0 && row.status !== 8) {
      return "LemonChiffon";
    } else {
      return "MistyRose";
    }
  };

  const dateConvert = (date) => {
    const dateSplit = date.split(".");
    const correctDate = `${dateSplit[1]}.0${dateSplit[0]}.${dateSplit[2]}`;
    return correctDate;
  };

  const modalPrint = (row) => {
    const table = OrderPrintTableGen(row, foundClient);
    dispatch(orderSaveTable(table));
    dispatch(openModal("orderPrintModalState"));
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, backgroundColor: rowColor }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {" "}
          {row.ordID}
        </TableCell>
        <TableCell align="right">
          {foundClient ? foundClient.Name : ""}{" "}
          {foundClient ? foundClient.phoneNum : ""}
        </TableCell>
        <TableCell align="right">{dateConvert(row.dateStart)}</TableCell>
        <TableCell align="right">{dateConvert(row.dateFinish)}</TableCell>
        <TableCell align="right">{statusDecode[row.status - 1].prop}</TableCell>
        <TableCell align="right">{row.fullPrice}</TableCell>
        <TableCell align="right">{row.paid}</TableCell>
        <TableCell align="right">{row.fullPrice - row.paid}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                width: "100%",
                margin: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6" gutterBottom component="div">
                  Коментарі
                </Typography>
                {row.comments ? row.comments : "Нема коментарів"}
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <IconButton
                  size="small"
                  variant="contained"
                  onClick={() => {
                    modalPrint(row);
                  }}
                >
                  <PrintIcon />
                </IconButton>
                <IconButton
                  size="small"
                  variant="contained"
                  onClick={() => {
                    dispatch(orderModalEdit(row));
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ search }) {
  const ordersData = useSelector((state) => state.globalOrders.orders);
  // const orders = ordersData ? ordersData : [];
  const totalOrders = useMemo(() => {
    if (search) {
      return ordersData.filter((obj) => obj.ordID.includes(search));
    }
    return ordersData;
  }, [search, ordersData]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>№</TableCell>
            <TableCell align="right">Ім'я та Номер Телефону Клієнта</TableCell>
            <TableCell align="right">Дата Початку</TableCell>
            <TableCell align="right">Дата Завршення</TableCell>
            <TableCell align="right">Стан</TableCell>
            <TableCell align="right">Варість</TableCell>
            <TableCell align="right">Передплата</TableCell>
            <TableCell align="right">Залишок</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { totalOrders.length ? totalOrders.map((row, index) => <Row key={index} row={row} />) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
