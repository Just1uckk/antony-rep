import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import getClients, { db } from "./Firebase";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { fetchOrders } from "./store/GloabalOrdersList";

export const fetchClients = createAsyncThunk(
    'toolkit/fetchClients',
    async function () {
        const data = await getClients(db);
        return data
    },
  );

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        err: "",
        isLoading: "",
        clientAddModalState: false,
        clientAddModalName: '',
        clientModalState: false,
        orderDeleteModal: false,
        clientEditIndex: "",
        orderModalState: false,
        orderMainPageSearch: false,
        clientsDeleteModal: false,
        clientsCurrentDelete: "",
        orderPrintModalState: false,
        orderMaterialAdditionalState: false,
        orderMaterialAdditionalIndex: '',
        orderSelectClient: false,
        orderPrintTable:"",
        clientsAllList: [],
        makeThemRed: false,
        orderMaterialDelete: false,
        tempOrderInfo: {
            ranID:'',
            ordID:'',
            clID:'',
            status: 1,
            dateStart: '',
            dateFinish: '',
            fullPrice:'',
            fullPaid:false,
            paid:'',
            installation:false,
            delivery:false,
            adress:'',
            comments:''
        },
        tempMaterialInfo: [
            // { num: 1, count:2, material:3, thickness:4, width:1000, height:1000, edge: 2 }
        ]
    },
    reducers : {
        getClientsData(initialState, data) {
            initialState.clientsAllList = data
        },
        orderDeleteStatusUpdate(initialState){
            initialState.orderMaterialDelete = !initialState.orderMaterialDelete
        },
        orderDeleteMaterial (initialState, {payload:index}) {
            initialState.tempMaterialInfo.splice(index, 1)
        },
        uploadNewClient(initialState, data){
            const id = data.payload.id.toString()
            const cName = data.payload.Name.toString()
            const cDiscount = data.payload.discount
            const cId = data.payload.id.toString()
            const cPhoneNum = data.payload.phoneNum.toString()
            setDoc(doc(db, "clients", id), {
                Name: cName,
                discount: cDiscount,
                id: cId,
                phoneNum: cPhoneNum
            });
        },
        uploadEditClient(initialState, {payload:data}){
            deleteDoc(doc(db, "clients", data.id));
            setDoc(doc(db, "clients", data.id), {
                Name: data.Name,
                discount: data.discount,
                id: data.id,
                phoneNum: data.phoneNum
            });
        },
        uploadNewOrder(initialState){ 
            const notify = (e) => toast(e);
            if(initialState.tempOrderInfo.ordID&&initialState.tempOrderInfo.dateStart&&initialState.tempOrderInfo.dateFinish&&initialState.tempOrderInfo.clID&&initialState.tempOrderInfo.status) {
            const ranID = nanoid()
            setDoc(doc(db, "orders", ranID), {
            ranID,
            ordID:initialState.tempOrderInfo.ordID,
            dateStart:initialState.tempOrderInfo.dateStart,
            dateFinish:initialState.tempOrderInfo.dateFinish,
            clID:initialState.tempOrderInfo.clID,
            fullPrice:initialState.tempOrderInfo.fullPrice,
            paid:initialState.tempOrderInfo.paid,
            status:initialState.tempOrderInfo.status,
            installation:initialState.tempOrderInfo.installation,
            delivery:initialState.tempOrderInfo.delivery,
            fullPaid:initialState.tempOrderInfo.fullPaid,
            adress:initialState.tempOrderInfo.adress,
            comments:initialState.tempOrderInfo.comments,
            material: initialState.tempMaterialInfo.filter((element)=>{
                if(element.width && element.height && element.count && element.material && element.thickness){return true}
                return false
            })
            });
            Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '')
            initialState.tempOrderInfo.delivery = false
            initialState.tempOrderInfo.status = 1
            initialState.tempOrderInfo.installation = false
            initialState.tempOrderInfo.fullPaid = false
            initialState.tempMaterialInfo = [];      
            initialState.orderModalState = !initialState.orderModalState
            initialState.makeThemRed = false
        } else {
            notify(`Поля мають бути заповнені`); 
            initialState.makeThemRed = true
        }
        },
        additionalWorkPush(initialState, {payload:data}) {
            if(data.work === 1) {
                initialState.tempMaterialInfo[initialState.orderMaterialAdditionalIndex].drilling.push(data)
            } else {
                initialState.tempMaterialInfo[initialState.orderMaterialAdditionalIndex].painting.push(data)
            }
        },
        userLogined(initialState, data) {
        initialState.logined = data
        },
        openModal(initialState, {payload:propName}){
            if(typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='orderMaterialAdditionalState'){
            initialState[propName.name] = !initialState[propName.name]
            initialState.orderMaterialAdditionalIndex = propName.index
            } else if(typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='clientModalState'){
            initialState[propName.name] = !initialState[propName.name]
            initialState.orderSelectClient = propName.value
            } else if(typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='orderPrintModalState'){
            initialState[propName.name] = !initialState[propName.name]
            initialState.orderMaterialAdditionalIndex = propName.index
            } else if (typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='clientAddModalState') {
                initialState.clientEditIndex = propName.id
                initialState.clientAddModalName = propName.value
                initialState[propName.name] = !initialState[propName.name]
            } else if (typeof propName === 'object' && !Array.isArray(propName) && propName !== null && propName.name ==='clientsDeleteModal') {
                initialState[propName.name] = !initialState[propName.name]
                initialState.clientsCurrentDelete = propName.value
            } else if (typeof propName === 'object' && !Array.isArray(propName) && propName !== null) {
                initialState[propName.name] = !initialState[propName.name]
                initialState.orderPrint = propName.value
        } else {
            initialState[propName] = !initialState[propName] 
        }
        },
        tempOrderSave(initialState, data) {
            initialState.tempOrderInfo = data;
        },
        orderStateUpdate(initialState, {payload:data}) {
            initialState.tempOrderInfo[data.propName] = data.value;
        },
        orderMaterialUpdate(initialState, {payload:data}) {
            initialState.tempMaterialInfo[data.index][data.propName] = data.value;
        },
        orderMaterialAddNewObject(initialState) {
            const body = { num: initialState.tempMaterialInfo[initialState.tempMaterialInfo.length - 1] ? initialState.tempMaterialInfo[initialState.tempMaterialInfo.length - 1].num + 1 : 1, count: '', material: '', thickness: '', width: '', height: '', edge: 7, drilling: [], painting: [] }
            initialState.tempMaterialInfo.push(body)
        },
        orderMaterialRemoveAddition(initialState, {payload:data}) {
            const rowIndex= data.rowIndex
            const propName= data.propName
            const index = data.index
            initialState.tempMaterialInfo[rowIndex][propName].splice(index, 1)
        },
        orderModalHandleClose(initialState) {
            Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '')
            initialState.tempOrderInfo.delivery = false
            initialState.tempOrderInfo.status = 1
            initialState.tempOrderInfo.installation = false
            initialState.tempOrderInfo.fullPaid = false
            initialState.tempMaterialInfo = [];            
        },
        orderModalEdit(initialState, {payload:order}){
            initialState.tempOrderInfo = order
            initialState.tempMaterialInfo = order.material
            initialState.orderModalState = !initialState.orderModalState
        },
        orderDelete(initialState){
            deleteDoc(doc(db, "orders", initialState.tempOrderInfo.ranID));
            Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '');
            initialState.tempMaterialInfo = [];   
            initialState.orderModalState = !initialState.orderModalState;
            initialState.tempOrderInfo.status = 1
            initialState.tempOrderInfo.delivery = false
            initialState.tempOrderInfo.installation = false
            initialState.tempOrderInfo.fullPaid = false
            fetchOrders()
        },
        orderUpdate(initialState){
            const notify = (e) => toast(e);
            if(initialState.tempOrderInfo.ordID&&initialState.tempOrderInfo.dateStart&&initialState.tempOrderInfo.dateFinish&&initialState.tempOrderInfo.clID&&initialState.tempOrderInfo.status) {
            deleteDoc(doc(db, "orders", initialState.tempOrderInfo.ranID));
            setDoc(doc(db, "orders", initialState.tempOrderInfo.ranID), {
                ranID:initialState.tempOrderInfo.ranID,
                ordID:initialState.tempOrderInfo.ordID,
                dateStart:initialState.tempOrderInfo.dateStart,
                dateFinish:initialState.tempOrderInfo.dateFinish,
                clID:initialState.tempOrderInfo.clID,
                fullPrice:initialState.tempOrderInfo.fullPrice,
                paid:initialState.tempOrderInfo.paid,
                status:initialState.tempOrderInfo.status,
                fullPaid:initialState.tempOrderInfo.fullPaid,
                installation:initialState.tempOrderInfo.installation,
                delivery:initialState.tempOrderInfo.delivery,
                adress:initialState.tempOrderInfo.adress,
                comments:initialState.tempOrderInfo.comments,
                material: initialState.tempMaterialInfo.filter((element)=>{
                    if(element.width && element.height && element.count && element.material && element.thickness){return true}
                    return false
                })
                });
                Object.keys(initialState.tempOrderInfo).forEach(k => initialState.tempOrderInfo[k] = '')
                initialState.tempOrderInfo.delivery = false
            initialState.tempOrderInfo.installation = false
            initialState.tempOrderInfo.fullPaid = false
            initialState.tempOrderInfo.status = 1
                initialState.tempMaterialInfo = []; 
                initialState.makeThemRed = false     
                initialState.orderModalState = !initialState.orderModalState} else {
                    notify(`Поля мають бути заповнені`)
                    initialState.makeThemRed = true
                }
        },
        orderSaveTable(initialState, {payload:table}){
            initialState.orderPrintTable = table
        },
        handleExitClients(initialState){
            initialState.clientsAllList = ''
        },
        clientsDelete(initialState){
            deleteDoc(doc(db, "clients", initialState.clientsCurrentDelete));
        }
        },
        extraReducers: {
            [fetchClients.pending]: (initialState, action) => {
                initialState.err = null;
                initialState.isLoading = true;
              },
              [fetchClients.fulfilled]: (initialState, action) => {
                initialState.clientsAllList = action.payload;
                initialState.err = null;
                initialState.isLoading = false;
              },
              [fetchClients.rejected]: (initialState, action) => {
                initialState.err = 'error';
                console.log('client fetch error');
              },
    }
})

export default toolkitSlice.reducer
export const {orderDeleteMaterial, uploadEditClient, orderDeleteStatusUpdate, orderModalHandleClose, orderMaterialRemoveAddition, additionalWorkPush, openModal, orderMaterialAddNewObject, orderMaterialUpdate, orderStateUpdate, tempOrderSave, userLogined, uploadNewClient, getClientsData, uploadNewOrder, orderModalEdit, orderDelete, orderUpdate, orderSaveTable, handleExitClients,clientsDelete} = toolkitSlice.actions