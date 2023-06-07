import pdfMake from "pdfmake/build/pdfmake";
import pdfFont from "pdfmake/build/vfs_fonts"
import { edgeDecode, materialDecode, sandblastingDecode, workDecode } from "../WorkDecoding";
import moment from "moment";
import dayjs from "dayjs";
pdfMake.vfs = pdfFont.pdfMake.vfs

export const OrderPrintTableGen = (row, foundClient) => {
    const dateConvert = (date) => {
        require('dayjs/locale/uk')
        const dateNew = moment(Number(date))
        const correctDate = dayjs(dateNew).locale('uk').format( "dd DD MMM YYYY");
        return correctDate;
      };

      const drillingMap = (row, propName) => {
        const drillingCell = []
        row.drilling.map((drilling) => (
            drillingCell.push({text: `${propName ? 'ø' : ''} ${propName ? drilling.valueOne : drilling.valueTwo} ${propName ? '' : 'од.'}`, fontSize: 10})
            ))
            return (
                drillingCell
            )
      }

      const additionalMap = (row) => {
        const additionalCell = []
        row.painting.map((painting) => {
            if(painting.work === 3 ) {
                    additionalCell.push({text:`${workDecode[painting.work-1].prop} ${painting.valueOne}`, fontSize: 10})
                } else if (painting.work === 4 ) {
                    additionalCell.push( {text:`${workDecode[painting.work-1].prop} ${painting.valueOne} ${painting.valueTwo}`, fontSize: 10})
                } else if (painting.work === 5 ) {
                    additionalCell.push({text:`${workDecode[painting.work-1].prop} ${sandblastingDecode[painting.valueOne-1].prop}`, fontSize: 10})
                } else if (painting.work === 6) {
                } else {
                    additionalCell.push({text:`${workDecode[painting.work-1].prop}`, fontSize: 10})}
                    return (painting.work)
        })
            
            return (
                additionalCell
            )
      }

      const temperingSearch = (row) => {
        const tempering = row.painting.find(obj => obj.work ===  6)
        return(tempering?{text:"Так", fontSize: 10}:{text:"Ні", fontSize: 10})
      }

      function tableBody () {
      const table = 
    [
        [{text:'Матеріал (Дов. * Шир.)',style: 'tableHeader',rowSpan: 2, fontSize: 10},{text:'Кіль.',style: 'tableHeader',rowSpan: 2, fontSize: 10},{text:'Обробка Кромки',style: 'tableHeader',rowSpan: 2, fontSize: 10},{text:'Свердлення',style: 'tableHeader',colSpan: 2, fontSize: 10},{},{text:'Гарт.',style: 'tableHeader',rowSpan: 2, fontSize: 10},{text:'Додаткові Роботи',style: 'tableHeader',rowSpan: 2, fontSize: 10}],
                        ['','','',{text:'діам.', fontSize: 10},{text:'кіль.', fontSize: 10},'',''],
    ]
      
      row.material.map((row) => (
        table.push(
            [
                {text: `${materialDecode[row.material-1].prop} "${row.thickness}" (${row.height}*${row.width})`, fontSize: 10},{text:`${row.count}`, fontSize: 10},{text:`${edgeDecode[row.edge-1].prop}`, fontSize: 10},drillingMap(row, 'holeDiam'),drillingMap(row, ''),temperingSearch(row),additionalMap(row)
            ],
        )
      ))
      return table
    }
    
    function tableHeader () {
        const header = 
      [
          [{text: `№: ${row.ordID}`,fontSize: 10, bold: true},{text: `${row.delivery?"Доставка:":""} ${row.installation?row.adress:""}`,fontSize: 10}],
          [{text: `Замовник: ${foundClient.Name}`,fontSize: 10},{text: `${row.installation?"Монтаж":""}`,fontSize: 10}],
          [{text: `Від: ${dateConvert(row.dateStart)}`,fontSize: 10},{text: `Дата Відгрузки: ${dateConvert(row.dateFinish)}`,fontSize: 10, bold: true}],
      ]
        return header
      }

    const order = []

    order.push([{
        table: {
            widths: [250, 250],
            body :  tableHeader(),
                },
                layout: 'noBorders'
            },
        {
            table: {
                widths: [125, 30, 80, 30, 30, 30, 125],
                body :  tableBody()
            }
        },{text:'\n'},{text:'\n'}]) 
        order.push([{
            table: {
                widths: [250, 250],
                body :  tableHeader(),
                    },
                    layout: 'noBorders'
                },
            {
                table: {
                    widths: [125, 30, 80, 30, 30, 30, 125],
                    body :  tableBody()
                }
            }])
            if(row.installation || row.delivery ){
                        order.push([{text:'\n'},{text:'\n'},{
                            table: {
                                widths: [250, 250],
                                body :  tableHeader(),
                                    },
                                    layout: 'noBorders'
                                },
                        {
                            table: {
                                widths: [125, 30, 80, 30, 30, 30, 125],
                                body :  tableBody()
                            }
                        }])
                    };
        

//additional orders for different jobs. TBI

//     const vitjaCount=[]
//     const olegCount =[]

//     const additionalTables = () => {
//     for(let i=1; i<=row.material.length; i++){
//         console.log(`loop1`)
//         if(row.material[i-1].painting){
//         for(let n=1; n<=row.material[i-1].painting.length; n++){
//             console.log(`loop2`)
//             if(row.material[i-1].painting[n-1].work === 2||row.material[i-1].painting[n-1].work === 7||row.material[i-1].painting[n-1].work === 8||row.material[i-1].painting[n-1].work === 9){console.log(`if`); vitjaCount.push(`${row.material[i-1].painting[n-1].work}`) } else if(row.material[i-1].painting[n-1].work === 3||row.material[i-1].painting[n-1].work === 4||row.material[i-1].painting[n-1].work === 5){console.log(`if`); olegCount.push(`${row.material[i-1].painting[n-1].work}`) }
//         }} else {break}       
//     }
//     if(row.installation){
//         order.push([{text:'\n'},{text:'\n'},{...ordNumber},{...ordClient},{...ordDates},{
//             table: {
//                 widths: [125, 30, 80, 30, 30, 30, 125],
//                 body :  tableBody()
//             }
//         }])
//     };
//     if(vitjaCount){
//         order.push([{text:'\n'},{text:'\n'},{...ordNumber},{...ordClient},{...ordDates},{
//             table: {
//                 widths: [125, 30, 80, 30, 30, 30, 125],
//                 body :  tableBody()
//             }
//         }])
//     };
//     if(olegCount){
//         order.push([{text:'\n'},{text:'\n'},{...ordNumber},{...ordClient},{...ordDates},{
//             table: {
//                 widths: [125, 30, 80, 30, 30, 30, 125],
//                 body :  tableBody()
//             }
//         }])
//     }
// }

    const table = {
        content: order
    }
    return(table)
}