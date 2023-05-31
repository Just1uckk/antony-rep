import { Divider, MenuItem, Select, Switch } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { orderStateUpdate } from "../../toolkitSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { InfoBlock } from "../../StyledComponents";
import OrderClientSelectorComp from "./OrderClientSelectorComp";
import { ToastContainer } from "react-toastify";



const OrderInfoTab = () => {
  const dispatch = useDispatch();
  const tempOrdSave = useSelector((state) => state.toolkit.tempOrderInfo);
  const paidCoeff = 0.7

  const updateStatus = (propName, value) => {
    if (propName === 'dateStart' || propName=== 'dateFinish') {
      const date = `${value.$M + 1}.${value.$D}.${value.$y}`
      const data = { propName, value: date };
      dispatch(orderStateUpdate(data));
    } else {
      const data = { propName, value };
      dispatch(orderStateUpdate(data));
    }
  };

  const lastOrderNum = useSelector((state) => state.globalOrders.orders).reduce((prevObj, currObj) => {
    return prevObj.ordID > currObj.ordID ? prevObj : currObj;
  });

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
              sx={{ width: "60%" }}
              size="small"
              label={`наступний номер ${Number(lastOrderNum.ordID)+1}`}
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.ordID?tempOrdSave.ordID:""}
              onChange={(e) =>
                // setOrdID(e.target.value)
                updateStatus("ordID", e.target.value)
              }
            />
          </InfoBlock>
          <InfoBlock>
            <p>Стан замовлення</p>
            <Select
            sx={{ width: "60%" }}
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
            <MenuItem value={8}>Виконано</MenuItem>
            </Select>
          </InfoBlock>
        </Box>
        <Divider sx={{ width: "100%" }} />
        <OrderClientSelectorComp/>
        <Divider sx={{ width: "100%" }} />
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "20px 0 20px 0",
          }}>
          <InfoBlock>
          <p>Дата початку</p>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"uk"}
            >
              <DatePicker
              sx={{ width: "60%" }}
              value={dayjs(tempOrdSave.dateStart)}
              onChange={(newValue) => updateStatus("dateStart", newValue)}
              />
            </LocalizationProvider>
          </InfoBlock>
          <InfoBlock>
          <p>Дата закінчення</p>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"uk"}
            >
              <DatePicker
              placeholder
              sx={{ width: "60%" }}
              value={dayjs(tempOrdSave.dateFinish)}
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
              onChange={(e) => updateStatus("fullPrice", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <p>Передплата</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              label={`${paidCoeff*100}% від вартості: ${tempOrdSave.fullPrice*paidCoeff}`}
              value={tempOrdSave.paid}
              onChange={(e) => updateStatus("paid", e.target.value)}
            />
          </InfoBlock>
          <InfoBlock>
            <p>Залишок до сплати</p>
            <TextField disabled
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={[tempOrdSave.fullPrice]-[tempOrdSave.paid]}
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
          <InfoBlock>
            <p>Коментарі</p>
            <TextField
              sx={{ width: "60%" }}
              size="small"
              id="filled-basic"
              variant="outlined"
              value={tempOrdSave.comments}
              onChange={(e) => updateStatus("comments", e.target.value)}
            />
          </InfoBlock>
        </Box>
      </Box>
      <ToastContainer/>
    </div>
  );
};

export default OrderInfoTab;
