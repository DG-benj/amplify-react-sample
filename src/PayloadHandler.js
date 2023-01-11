const url = "https://app.singular.live/apiv1/control/4y6FT8tm6X2bKsiQBWtZIN";


export function createPayload(id, value) {
    return `"${id}": "${value}"`
}

export function createPayloadBool(id, bool) {
    return `"${id}": ${bool}`
}

export function combinePayloads(payloads) {
    var payload = "";

    for(let x in payloads) {
        console.log(payloads[x])
        payload += (`${payloads[x]},`)
    }
    payload = payload.slice(0, payload.length-1);

    return payload;
}

export function executeXHR(xhrReqs) {
    let data = "[";

    for(let i = 0; i < xhrReqs.length; i++) {
        data += xhrReqs[i];
        data += ',';
    }

    data = data.slice(0, data.length-1);
    data += "]";

    console.log(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
}

export function setPayload(targetComp, payload) {
    var setPayloadJSON = `{"compositionName":"${targetComp}","controlNode":{"payload":{${payload}}}}`;
    return setPayloadJSON;
}

export function triggerAnimation(targetComp, command) {
    var OneShotJson =`{"compositionName": "${targetComp}", "animation": {"action": "play","to": "${command}"} }`;
	return OneShotJson;
}