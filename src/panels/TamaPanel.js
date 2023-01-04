import React, { useState } from 'react'
import InOutBtnGroup from '../components/InOutBtnGroup'
import LabeledInput from '../components/LabeledInput'

import Col from 'react-bootstrap/Col'
import * as PayloadHandler from '../PayloadHandler'
import { isButtonClicked, toggleButtonColor } from '../DOMHelper'


export default function TamaPanel() {

  const [inputValue, setInputValue] = useState(null)

  function onInClick(inButton, outButton) {

    if(isButtonClicked(outButton)) {
      toggleButtonColor(outButton)
    }

    let xhrReqs = []

    if(!isButtonClicked(inButton)) {
      var payload = PayloadHandler.createPayload("bso-tama", inputValue)

      xhrReqs.push(PayloadHandler.setPayload("TAMA", payload))
    }
    xhrReqs.push(PayloadHandler.triggerAnimation("TAMA", "Toggle"))
  
    PayloadHandler.executeXHR(xhrReqs)
    toggleButtonColor(inButton)
    window.document.activeElement.blur()
  }
  
  function onOutClick(inButton, outButton) {
    
    if(isButtonClicked(inButton)) {
      toggleButtonColor(inButton)
    }
    toggleButtonColor(outButton)
    let xhrReqs = []
    xhrReqs.push(PayloadHandler.triggerAnimation("TAMA", "Out"))
    PayloadHandler.executeXHR(xhrReqs)
    window.document.activeElement.blur()
  }

  return (
    <Col xs={2} className="control-panel">
        <h5 className="txt-panel-label">
            球
        </h5>
        <LabeledInput text="BSO-球" handleOnChange={(e) => setInputValue(e)}/>
        <InOutBtnGroup
            onInClick={(inButton, outButton) => onInClick(inButton, outButton)}
            onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}></InOutBtnGroup>
    </Col>
  )
}
