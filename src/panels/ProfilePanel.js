import React, { useState } from 'react'
import InOutBtnGroup from '../components/InOutBtnGroup'
import ListView from '../components/ListView'

import {profile} from '../data/profile'

import Col from 'react-bootstrap/Col';
import * as PayloadHandler from '../PayloadHandler'
import { isButtonClicked, toggleButtonColor } from '../DOMHelper'

export default function ProfilePanel() {
  const [listValue, setListValue] = useState(null)

  function onInClick(inButton, outButton) {
    if(isButtonClicked(outButton)) {
      toggleButtonColor(outButton)
    }

    let xhrReqs = []

    if(!isButtonClicked(inButton)) {
      var payload = JSON.stringify(profile[0][listValue])
      
      payload = payload.slice(1, payload.length-1);
      xhrReqs.push(PayloadHandler.setPayload("PROFILE", payload))
    }
    xhrReqs.push(PayloadHandler.triggerAnimation("PROFILE", "Toggle"))

    PayloadHandler.executeXHR(xhrReqs)
    toggleButtonColor(inButton)
    window.document.activeElement.blur()
  }


  function onOutClick(inButton, outButton) {
    if(isButtonClicked(inButton)) {
      toggleButtonColor(inButton)
    }

    toggleButtonColor(outButton);
    let xhrReqs = [];
    xhrReqs.push(PayloadHandler.triggerAnimation("PROFILE", "Out"));	
    PayloadHandler.executeXHR(xhrReqs);
    window.document.activeElement.blur();
  }

  return (
    <Col xs={3} className="control-panel">
      <h5 className="txt-panel-label">プロフィル</h5>
      <ListView 
        data={profile}
        handleOnChange={val => setListValue(val)}
      />

      <InOutBtnGroup 
        onInClick={(inButton, outButton) => onInClick(inButton, outButton)}
        onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}
      />
    </Col>
  )
}
