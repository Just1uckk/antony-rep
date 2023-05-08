import { createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";



const toolkitSlice = createSlice({
    name: "toolkit",
    initialState: {
        logined: "",
        clientModalState: false,
        orderModalState: false,
        orderMaterialAdditionalState: false,
        orderMaterialAdditionalIndex: '',
        clientsAllList: [],
        tempOrderInfo: {
            ordID:'',
            ready:false,
            given:false,
            clName:'',
            clDiscount:'',
            clPhoneNum:'+380',
            fullPrice:'',
            paid:'',
            leftover:'',
            status:'',
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
        additionalWorkPush(initialState, {payload:data}) {
            console.log(data)
            console.log(initialState.tempMaterialInfo[initialState.orderMaterialAdditionalIndex].drilling)
            if(data[0] === 1) {
                initialState.tempMaterialInfo[initialState.orderMaterialAdditionalIndex].drilling.push(data)
            } else {
                initialState.tempMaterialInfo[initialState.orderMaterialAdditionalIndex].painting.push(data)
            }
        },
        userLogined(initialState, data) {
        initialState.logined = data
        },
        openModal(initialState, {payload:propName}){
            if(typeof propName === 'object' && !Array.isArray(propName) && propName !== null){
            console.log (propName)
            initialState[propName.name] = !initialState[propName.name]
            initialState.orderMaterialAdditionalIndex = propName.index
            } else {
            initialState[propName] = !initialState[propName] 
        }
        },
        tempOrderSave(initialState, data) {
            initialState.tempOrderInfo = data;
        },
        orderStateUpdate(initialState, {payload:data}) {
            console.log(data)
            initialState.tempOrderInfo[data.propName] = data.value;
        },
        orderMaterialUpdate(initialState, {payload:data}) {
            console.log(data)
            if(data.propName === "checkbox"){
                initialState.tempMaterialInfo[data.index][data.propName] = data.value;
            } else {
            initialState.tempMaterialInfo[data.index][data.propName] = data.value;
        }
        },
        orderMaterialAddNewObject(initialState) {
            console.log('object added')
            const body = { checkbox: false, num: initialState.tempMaterialInfo.length + 1, count: '', material: '', thickness: '', width: '', height: '', edge: '', drilling: [], painting: [] }
            initialState.tempMaterialInfo.push(body)
        },
        orderMaterialRemoveAddition(initialState, {payload:data}) {
            const rowIndex= data.rowIndex
            const propName= data.propName
            const index = data.index
            console.log(rowIndex, propName, index)
            console.log(initialState.tempMaterialInfo[rowIndex][propName])
            initialState.tempMaterialInfo[rowIndex][propName].splice(index, 1)
        }
    }
})

export default toolkitSlice.reducer
export const {orderMaterialRemoveAddition, additionalWorkPush, openModal, orderMaterialAddNewObject, orderMaterialUpdate, orderStateUpdate, tempOrderSave, userLogined, uploadNewClient, getClientsData} = toolkitSlice.actions
