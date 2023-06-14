import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { orderStateUpdate } from "../../toolkitSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { InfoBlock } from "../../StyledComponents";
import OrderClientSelectorComp from "./OrderClientSelectorComp";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

moment.updateLocale("uk", {
  week: {
    dow: 1
  }
});

const OrderInfoTab = () => {
  const dispatch = useDispatch();
  const tempOrdSave = useSelector((state) => state.toolkit.tempOrderInfo);
  const paidCoeff = 0.7;

  const updateStatus = (propName, value) => {
    if (propName === "dateStart" || propName === "dateFinish") {
      dispatch(orderStateUpdate( {propName, value: Date.parse(value)}));
    } else {
      const data = { propName, value };
      dispatch(orderStateUpdate(data));
    }
  };
  const lightUpErrors= useSelector((state) => state.toolkit.makeThemRed)
  const getOrders= useSelector((state) => state.globalOrders.orders)
  const lastOrderNum = getOrders.length? getOrders.reduce(
    (prevObj, currObj) => {
      return Number(prevObj.ordID) > Number(currObj.ordID) ? prevObj : currObj;
    }
  ): {ordID: 0};

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "spaceBetween",
            padding: "10px 0 20px 0",
          }}
        >
          <InfoBlock>
            <p>Номер Замовлення</p>
            <TextField
            error = {lightUpErrors}
              sx={{ width: "60%" }}
              size="small"
              label={`Наступний номер ${Number(lastOrderNum.ordID) + 1}`}
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.ordID ? tempOrdSave.ordID : ""}
              onChange={(e) =>
                isNaN(e.target.value)
                  ? ""
                  : // setOrdID(e.target.value)
                    updateStatus("ordID", e.target.value)
              }
            />
          </InfoBlock>
          <InfoBlock>
            <p>Стан замовлення</p>
            <FormControl fullWidth sx={{ justifyContent: "end", width: "60%" }}>
              <InputLabel
                sx={{ position: "absolute", top: -7 }}
                id="statusLabel"
              >
                Оберіть стан
              </InputLabel>
              <Select
              error = {lightUpErrors}
                labelId="statusLabel"
                size="small"
                label="Стан"
                value={tempOrdSave.status}
                onChange={(e) => updateStatus("status", e.target.value)}
              >
                {/* change MenuItems fro hardcode to .map() */}
                <MenuItem value={1}>Офіс</MenuItem>
                <MenuItem value={2}>Порізка</MenuItem>
                <MenuItem value={3}>Обробка</MenuItem>
                <MenuItem value={4}>Свердлення</MenuItem>
                <MenuItem value={5}>Граф. роботи</MenuItem>
                <MenuItem value={6}>Готово</MenuItem>
                <MenuItem value={7}>Монтаж</MenuItem>
                <MenuItem value={8}>Отриман</MenuItem>
              </Select>
            </FormControl>
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <OrderClientSelectorComp />
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "20px 0 20px 0",
          }}
        >
          <InfoBlock>
            <p>Дата початку</p>
            <LocalizationProvider
              dateAdapter={AdapterMoment}
            >
              <DatePicker
              error = {lightUpErrors}
              format="DD/MM/YYYY"
              dayOfWeekFormatter={(day) => `${day}`}
                sx={{ width: "60%" }}
                value={tempOrdSave.dateStart?moment(tempOrdSave.dateStart):""}
                onChange={(newValue) => updateStatus("dateStart", newValue)}
              />
            </LocalizationProvider>
          </InfoBlock>
          <InfoBlock>
            <p>Дата закінчення</p>
            <LocalizationProvider
              dateAdapter={AdapterMoment}
            >
              <DatePicker
              error = {lightUpErrors}
              format="DD/MM/YYYY"
              dayOfWeekFormatter={(day) => `${day}`}
                sx={{ width: "60%" }}
                value={tempOrdSave.dateFinish?moment(tempOrdSave.dateFinish):""}
                onChange={(newValue) => updateStatus("dateFinish", newValue)}
              />
            </LocalizationProvider>
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "20px 0 20px 0",
          }}
        >
          <InfoBlock>
            <p>Повна вартість</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.fullPrice}
              onChange={(e) => isNaN(e.target.value)?"":updateStatus("fullPrice", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <p>Передплата</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              label={`${paidCoeff * 100}% від вартості: ${
                tempOrdSave.fullPrice * paidCoeff
              }`}
              value={tempOrdSave.paid}
              onChange={(e) => isNaN(e.target.value)?"":updateStatus("paid", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <p>Залишок до сплати</p>
            <TextField
              disabled
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={[tempOrdSave.fullPrice] - [tempOrdSave.paid]}
            />
          </InfoBlock>
          <InfoBlock>
          <p>Повна оплата</p>
              <Switch
                checked={tempOrdSave.fullPaid}
                onChange={() =>
                  updateStatus("fullPaid", !tempOrdSave.fullPaid)
                }
              />
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "20px 0 20px 0",
          }}
        >
          <InfoBlock>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <p>Монтаж</p>
              <Switch
                checked={tempOrdSave.installation}
                onChange={() =>
                  updateStatus("installation", !tempOrdSave.installation)
                }
              />
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>Доставка</p>
              <Switch
                checked={tempOrdSave.delivery}
                onChange={() => updateStatus("delivery", !tempOrdSave.delivery)}
              />
            </Box>
          </InfoBlock>
          <InfoBlock>
            <p>Адреса монтажу</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.adress}
              onChange={(e) => updateStatus("adress", e.target.value)}
            />
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%", margin: "10 10 10 10" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: "20px 0 0 0",
          }}
        >
          <Box
            sx={{
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingBottom: "10px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              whiteSpace: "nowrap",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <p>Коментарі</p>
            <TextField
            multiline
            maxRows={4}
              sx={{ width: "85%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.comments}
              onChange={(e) => updateStatus("comments", e.target.value)}
            />
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default OrderInfoTab;
