import { profileUrl } from './data/profile'
import { oneshotUrl } from "./data/oneShot"

export function createBodyPayload(bodyData) {

    let bodyPayload = `{"playerIndex": 0,`
    for(let body of bodyData) {
        console.log(body)
        bodyPayload += `${body},`
    }
    bodyPayload = bodyPayload.slice(0, bodyPayload.length-1) 
    bodyPayload += "}"
    console.log((bodyPayload))
    // console.log(bodyPayload)
    // console.log(JSON.parse(bodyPayload))
    return (JSON.parse(bodyPayload))
}

export function sendOneshotAddNewData(body) {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", oneshotUrl, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    console.log(body)
    xhr.send(JSON.stringify(body))
}

export function sendOneshotDataUpdate(body) {
    var xhr = new XMLHttpRequest()
    xhr.open("PUT", oneshotUrl, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    console.log(body)
    xhr.send(JSON.stringify(body))
}