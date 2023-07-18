import pdfMake from "pdfmake/build/pdfmake";
import pdfFont from "pdfmake/build/vfs_fonts"
import moment from "moment";
import dayjs from "dayjs";
pdfMake.vfs = pdfFont.pdfMake.vfs

export const OrderUnfinishedTableGen = (valueClients, valueOrders) => {
    const clientsList = valueClients;
    const getOrdData = valueOrders;

    const dateConvert = (date) => {
        require('dayjs/locale/uk')
        const dateNew = moment(Number(date))
        const correctDate = dayjs(dateNew).locale('uk').format( "DD MM YYYY");
        return correctDate;
      };

      const statusValue = (row) => {
        switch(row.status) {
            case 1 : return "Офіс";
            case 2 : return "Порізка";
            case 3 : return "Обробка";
            case 4 : return "Свердлення";
            case 5 : return "Граф. роботи";
            case 10 : return "Фарбування";
            case 6 : return "Готово";
            case 7 : return "Монтаж";
            case 8 : return "Отриман";
            case 9 : return "Гартування";
            default : return "";
        }
      }

      const temperingSearch = (row) => {
        const tempering = []
        row.material.forEach((material) => {
            const temp = material.painting.find((obj) => obj.work ===  6)
        if (temp){
            tempering.push(temp)
        }})
        return(tempering.length?{text:"ТАК", fontSize: 10, bold: true}:{text:"", fontSize: 10})
      }

      function tableBody () {
      const table = 
    [[
        {text:'№',style: 'tableHeader', fontSize: 10},
        {text:"Ім'я та Номер",style: 'tableHeader', fontSize: 10},
        {text:'Початок',style: 'tableHeader', fontSize: 10},
        {text:'Завершення',style: 'tableHeader', fontSize: 10},
        {text:'Статус',style: 'tableHeader', fontSize: 10},
        {text:'Гарт.',style: 'tableHeader', fontSize: 10},
        {text:'Доставка\nМонтаж',style: 'tableHeader', fontSize: 10},
        {text:'Коментарі',style: 'tableHeader', fontSize: 10}
    ],]
      
        getOrdData.forEach((row) => {
            const foundClient = clientsList.find((obj) => obj.id === row.clID);
            if(row.status !== 8 && row.status !== 6){
        table.push(
            [
                {text: `${row.ordID}`, fontSize: 10}, 
                {text:`${foundClient.Name} \n ${foundClient.phoneNum}`, fontSize: 10}, 
                {text: `${dateConvert(row.dateStart)}`, fontSize: 10}, 
                {text: `${dateConvert(row.dateFinish)}`, fontSize: 10}, 
                {text:`${statusValue(row)}`, fontSize: 10},
                temperingSearch(row),
                {text: `${row.installation?"Монтаж":""} ${row.delivery?"Доставка":""}`, fontSize: 10}, 
                {text: `${row.comments}`, fontSize: 10}
            ],
        )}
    })
      return table
    }

    const table = {
        content: [
            {
                margin: [ -20, -30, 0, 0 ],
            table: {
                widths: [20, 110, 60, 60, 40, 25, 50, 120],
                    body :  tableBody(),
                    },
                },
            ]
    }
    return(table)
}