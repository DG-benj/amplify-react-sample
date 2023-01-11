// import https from "https"

export const oneshotUrl = "https://ec2-13-231-220-57.ap-northeast-1.compute.amazonaws.com:5000"

// const GET = {
//     hostname: oneshotUrl,
//     port: "443",
//     path: "/api/v1/cp-test-data/oneshot/",
//     method: "GET",
//     headers: {
//         'Accept': 'application/json'
//     }
// }

// export function GETrequest(apiCall) {
//     console.log("test")
//     GET.path = `/api/v1/cp-test-data/oneshot/${apiCall}`
//     var req = https.request(GET, (res) =>{
//         console.log(`statusCode: ${res.statusCode}`)

//         let data = '';
//         res.on('data', (chunk) => {
//             data += chunk;
//         })

//         res.on('end', () => {
//             const responseJson = JSON.parse(data);
//             console.log(responseJson);
//         })
//     })

//     console.log(req);
//     req.on('error', (error) => {
//         console.error(error);
//     })
// }

export var data = []

export function getPlayerData(PlayerDataReceivedCallback) {
    var xhr = new XMLHttpRequest()

    xhr.open("GET", oneshotUrl + "/getAllPlayers")
    
    xhr.onload = (e) => {
        data = JSON.parse(xhr.responseText)['PlayerData']
        PlayerDataReceivedCallback(data)
        // console.log(data)
    }
    xhr.send()
}


//#region 

// reference for GET req
// https://zetcode.com/javascript/xmlhttprequest/

// function getDataCount(getCountCallback) {    
//     var xhr = new XMLHttpRequest();    
    
//     xhr.open("GET", url + "/getPlayerCount", true);
//     // xhr.setRequestHeader("Content-Type", "application/json")
    
//     xhr.onload = (event) => {
//         const countJSON = JSON.parse(xhr.responseText)
//         count = countJSON['playerCount']
//         // console.log(count)
//         getCountCallback(count)
//     }
//     console.log("getting data count")
//     xhr.send()
// }

// function getPlayerData() {
    
//     getDataCount((count) => {
//         for(let i = 0; i < count; i++) {
//             const xhr = new XMLHttpRequest()
//             xhr.open("GET", url + `/getPlayer?playerIndex=${i+1}`)
    
//             xhr.onload = (event) => {
//                 data.push(JSON.parse(xhr.responseText))
//                 console.log(JSON.parse(xhr.responseText))
//             }
//             xhr.send()
//         }   
//     })
// }
// getPlayerData()

// export const oneShotData = [
//     {
//         "Player1": {
//             "1shot-no": "78",
//             "1shot-name": "Kirito",
//             "1shot-age":"23",
//             "1shot-dajyun":"6",
//             "1shot-position":"6", 
//             "1shot-ritu1":".123",
//             "1shot-ritu2":"(329-98)",
//             "1shot-hon":"98",
//             "1shot-ten":"3",
//             "1shot-tou":"45"
//         },
//         "Player2": {
//             "1shot-no":"10",
//             "1shot-name":"Sakuragi",
//             "1shot-age":"20",
//             "1shot-dajyun":"10",
//             "1shot-position":"4", 
//             "1shot-ritu1":".009",
//             "1shot-ritu2":"(91-88)",
//             "1shot-hon":"23",
//             "1shot-ten":"1",
//             "1shot-tou":"20"
//         },
//         "Player3": {
//             "1shot-no":"21",
//             "1shot-name":"Sena",
//             "1shot-age":"19",
//             "1shot-dajyun":"8",
//             "1shot-position":"21", 
//             "1shot-ritu1":".672",
//             "1shot-ritu2":"(568-100)",
//             "1shot-hon":"67",
//             "1shot-ten":"9",
//             "1shot-tou":"89"
//         }, 
//         "Player4": {
//             "1shot-no":"00",
//             "1shot-name":"Ayanokouji",
//             "1shot-age":"18",
//             "1shot-dajyun":"9",
//             "1shot-position":"0", 
//             "1shot-ritu1":".899",
//             "1shot-ritu2":"(898-88)",
//             "1shot-hon":"190",
//             "1shot-ten":"10",
//             "1shot-tou":"99"
//         },
//         "Player5": {
//             "1shot-no":"11",
//             "1shot-name":"Kuroko",
//             "1shot-age": "18",
//             "1shot-dajyun":"2",
//             "1shot-position":"3", 
//             "1shot-ritu1":".234",
//             "1shot-ritu2": "(2-23)",
//             "1shot-hon":"2",
//             "1shot-ten": "1",
//             "1shot-tou": "3"
//         },
//         "Player6": {
//             "1shot-no":"77",
//             "1shot-name":"Ryoma",
//             "1shot-age":"20",
//             "1shot-dajyun":"9",
//             "1shot-position":"5", 
//             "1shot-ritu1":".787",
//             "1shot-ritu2":"(772-99)",
//             "1shot-hon":"77",
//             "1shot-ten":"7",
//             "1shot-tou":"8"
//         }
//     }
    
// ];
// #endregion