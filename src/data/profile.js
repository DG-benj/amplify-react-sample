export var data = []
export const profileUrl = "http://ec2-13-231-220-57.ap-northeast-1.compute.amazonaws.com:5000/api/v1/cp-test-data/profile"
export var count = 0

export function getPlayerData(PlayerDataReceivedCallback) {
    var xhr = new XMLHttpRequest()

    xhr.open("GET", profileUrl + "/getAllPlayers")
    
    xhr.onload = (e) => {
        data = JSON.parse(xhr.responseText)['PlayerData']
        PlayerDataReceivedCallback(data)
        // console.log(data)
    }
    xhr.send()
}

export const profile = [
    {
        "Player1": {
            "pro-logo": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/2NbxCH5AXJZ8yl3R2hVHps_w110h106.png",
            "pro-no": "78",
            "pro-name": "Kirito",
            "pro-age":"23",
            "pro-dajyun":"6",
            "pro-position":"6",
            "pro-team": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/0Ap5jxj0imR5OFozW7PnC0_w788h80.png"
        },
        "Player2": {
            "pro-logo": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/2NbxCH5AXJZ8yl3R2hVHps_w110h106.png",
            "pro-no":"10",
            "pro-name":"Sakuragi",
            "pro-age":"20",
            "pro-dajyun":"10",
            "pro-position":"4",
            "pro-team": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/0Ap5jxj0imR5OFozW7PnC0_w788h80.png"
        },
        "Player3": {
            "pro-logo": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/2NbxCH5AXJZ8yl3R2hVHps_w110h106.png",
            "pro-no":"21",
            "pro-name":"Sena",
            "pro-age":"19",
            "pro-dajyun":"8",
            "pro-position":"21",
            "pro-team": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/0Ap5jxj0imR5OFozW7PnC0_w788h80.png"
        }, 
        "Player4": {
            "pro-logo": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/2NbxCH5AXJZ8yl3R2hVHps_w110h106.png",
            "pro-no":"00",
            "pro-name":"Ayanokouji",
            "pro-age":"18",
            "pro-dajyun":"9",
            "pro-position":"0",
            "pro-team": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/0Ap5jxj0imR5OFozW7PnC0_w788h80.png"
        },
        "Player5": {
            "pro-logo": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/2NbxCH5AXJZ8yl3R2hVHps_w110h106.png",
            "pro-no":"11",
            "pro-name":"Kuroko",
            "pro-age": "18",
            "pro-dajyun":"2",
            "pro-position":"3",
            "pro-team": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/0Ap5jxj0imR5OFozW7PnC0_w788h80.png"
        },
        "Player6": {
            "pro-logo": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/2NbxCH5AXJZ8yl3R2hVHps_w110h106.png",
            "pro-no":"77",
            "pro-name":"Ryoma",
            "pro-age":"20",
            "pro-dajyun":"9",
            "pro-position":"5",
            "pro-team": "//image.singular.live/e60d88de3f8a74cbc43762f50a80cccf/images/0Ap5jxj0imR5OFozW7PnC0_w788h80.png"
        }
    }  
];