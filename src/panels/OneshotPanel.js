import React, { useState, useEffect }from 'react'
import InOutBtnGroup from "../components/InOutBtnGroup"
import ListView from "../components/ListView"
import EditButton from "../components/EditButton"

import { getPlayerData } from '../data/oneShot'

import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import * as PayloadHandler from '../PayloadHandler'
import { isButtonClicked, toggleButtonColor } from '../DOMHelper'

export default function OneShotPanel() {
    const [listValue, setListValue] = useState(null)
    const [options, setOptions] = useState([])
    const [test, setTest] = useState(0)

    useEffect(() => {
        if(options.length !== 0) {
            return
        }
        getPlayerData((data) => {
            setOptions(data)
        })
    }, [options.length])


    function handleListView(data) {
        return (<ListView 
        data={options} 
        handleOnChange={value => setListValue(value)}
    />)
    }

    
    function onInClick(inButton, outButton) {

        if(isButtonClicked(outButton)) {
            toggleButtonColor(outButton)
        }

        let xhrReqs =[]

        if(!isButtonClicked(inButton)) {
            const index  = listValue;
            console.log(index)
            console.log(options[index]["Player"])
            var payload = JSON.stringify(options[index]["Player"])

            payload = payload.slice(1, payload.length-1)
            xhrReqs.push(PayloadHandler.setPayload("1Shot", payload))
        }
        xhrReqs.push(PayloadHandler.triggerAnimation("1SHOT", "Toggle"))

        PayloadHandler.executeXHR(xhrReqs)
        toggleButtonColor(inButton)
        window.document.activeElement.blur()
    }
    
    function onOutClick(inButton, outButton) {
        setTest(test+1)

        if(isButtonClicked(inButton)) {
            toggleButtonColor(inButton)
        }

        toggleButtonColor(outButton)
        let xhrReqs = []
        xhrReqs.push(PayloadHandler.triggerAnimation("1SHOT", "Out"))
        PayloadHandler.executeXHR(xhrReqs)
        window.document.activeElement.blur()
    }

  return (
    <Col xs={3} className="control-panel">
        
        <Col className="stack-parent">
            <div>
                <h5 className="txt-panel-label">
                1Shot
                </h5>
            </div>
            <div><EditButton dataName="OneShot Data" data={options}/></div>
        </Col>

        {handleListView()}

        <InOutBtnGroup 
            onInClick={(inButton, outButton) => onInClick(inButton, outButton)}
            onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}
        />
    </Col>
  )
}



