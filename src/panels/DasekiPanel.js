import React, { useState } from 'react'

import VertConnectedInput from '../components/VertConnectedInput'
import LabeledCheckbox from '../components/LabeledCheckbox'
import InOutBtnGroup from '../components/InOutBtnGroup'

import Col from "react-bootstrap/Col"
import * as PayloadHandler from '../PayloadHandler'
import { isButtonClicked, toggleButtonColor } from '../DOMHelper'


export default function DasekiPanel() {

    const [b1Val, setB1Val] = useState(false)
    const [b2Val, setB2Val] = useState(false)
    const [b3Val, setB3Val] = useState(false)
    const [b4Val, setB4Val] = useState(false)
    const [b5Val, setB5Val] = useState(false)
    const [b6Val, setB6Val] = useState(false)


    const [t1Val, setT1Val] = useState(false)
    const [t2Val, setT2Val] = useState(false)
    const [t3Val, setT3Val] = useState(false)
    const [t4Val, setT4Val] = useState(false)
    const [t5Val, setT5Val] = useState(false)
    const [t6Val, setT6Val] = useState(false)


    function onInClick(inButton, outButton) {
        
        if(isButtonClicked(outButton)) {
            toggleButtonColor(outButton)
        }

        let xhrReqs = []

        if(!isButtonClicked(inButton)) {
            var payloads = []
            var completePayload = ""

            function createBoolPayload(id, value)  {
                var payload = PayloadHandler.createPayloadBool(id, value)
                payloads.push(payload)
            }

            function createPayload(id, value) {
                var payload = PayloadHandler.createPayload(id, value)
                payloads.push(payload)

            }

            createBoolPayload(`dase-b1`, b1Val)
            createBoolPayload(`dase-b2`, b2Val)
            createBoolPayload(`dase-b3`, b3Val)
            createBoolPayload(`dase-b4`, b4Val)
            createBoolPayload(`dase-b5`, b5Val)
            createBoolPayload(`dase-b6`, b6Val)

            createPayload(`dase-t1`, t1Val)
            createPayload(`dase-t2`, t2Val)
            createPayload(`dase-t3`, t3Val)
            createPayload(`dase-t4`, t4Val)
            createPayload(`dase-t5`, t5Val)
            createPayload(`dase-t6`, t6Val)

            completePayload = PayloadHandler.combinePayloads(payloads)
            xhrReqs.push(PayloadHandler.setPayload("DASEKI", completePayload))
        }
        xhrReqs.push(PayloadHandler.triggerAnimation("DASEKI", "Toggle"))

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
        xhrReqs.push(PayloadHandler.triggerAnimation("DASEKI", "Out"))
        PayloadHandler.executeXHR(xhrReqs)
        window.document.activeElement.blur()
    }

    return (
    <Col xs={4} className="control-panel">
        <h5 className="txt-panel-label">打席</h5>
        
        <LabeledCheckbox
        text="B1"
        handleOnChange={e => setB1Val(e)}
        />
        <LabeledCheckbox
        text="B2"
        handleOnChange={e => setB2Val(e)}
        />
        <LabeledCheckbox
        text="B3"
        handleOnChange={e => setB3Val(e)}
        />
        <LabeledCheckbox
        text="B4"
        handleOnChange={e => setB4Val(e)}
        />
        <LabeledCheckbox
        text="B5"
        handleOnChange={e => setB5Val(e)}
        />
        <LabeledCheckbox
        text="B6"
        handleOnChange={e => setB6Val(e)}
        />

        <VertConnectedInput
            firstText="T1"
            secondText="T2"
            mb={0}
            onFirstTextChange={e => setT1Val(e)}
            onSecondTextChange={e=> setT2Val(e)}
        />
        <VertConnectedInput
            firstText="T3"
            secondText="T4"
            mb={0}            
            onFirstTextChange={e => setT3Val(e)}
            onSecondTextChange={e=> setT4Val(e)}
        />
        <VertConnectedInput
            firstText="T5"
            secondText="T6"
            mb={0}
            onFirstTextChange={e => setT5Val(e)}
            onSecondTextChange={e=> setT6Val(e)}
        />


        <InOutBtnGroup
            onInClick={(inButton, outButton) => onInClick(inButton, outButton)}
            onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}
        /> 
    </Col>
  )
}


export function DasekiPanel2() {
    

    function onInClick() {
        console.log("Clicked IN from DASEKI")
    }

    function onOutClick() {
        console.log("Clicked OUT from DASEKI")
    }    

    function CreateCheckboxes() {
        const checkboxes = [];

        for(let i = 0; i < 6; i++) {
            checkboxes.push(
                <LabeledCheckbox key={`daseki-checkbox-${i}`} text={`B${i+1}`} inline/>
            )
        }
        return checkboxes;
    }

    function CreateInputs() {
        const inputs = [];

        for(let i = 0; i < 3; i++) {
            inputs.push(
                <VertConnectedInput 
                    firstText={`T${i+1}`} 
                    secondText={`T${i+4}`} 
                    key={`daseki-input-${i+1}`}/>
            )
        }
        return inputs;
    }

    return (
    <Col xs={4} className="control-panel">
        <h5 className="txt-panel-label">打席</h5>
        {CreateCheckboxes()}
        {CreateInputs()}
        

        <InOutBtnGroup
            onInClick={() => onInClick()}
            onOutClick={() => onOutClick()}/>


    </Col>
  )
}
