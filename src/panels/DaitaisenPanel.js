import React, { useState } from 'react'
import VertConnectedInput from '../components/VertConnectedInput'
import InOutBtnGroup from '../components/InOutBtnGroup'
import InputText from  '../components/InputText'
import LabeledCheckbox from '../components/LabeledCheckbox'

import Col from 'react-bootstrap/Col'

import * as PayloadHandler from '../PayloadHandler'
import { isButtonClicked, toggleButtonColor } from '../DOMHelper'



export default function DaitaisenPanel() {

    const [hidari, setHidari] = useState("")
    const [migi, setMigi] = useState("")

    const [katiLeft, setKatiLeft] = useState(false)
    const [katiRight, setKatiRight] = useState(false)

    const [tokuHidari, setTokuHidari] = useState("")
    const [tokuMigi, setTokuMigi] = useState("")

    const [omote, setOmote] = useState(false)
    const [ura, setUra] = useState(false)

    const [kai, setKai] = useState("")

    function onInClick(inButton, outButton) {

        if(isButtonClicked(outButton)) {
            toggleButtonColor(outButton)
        }

        let xhrReqs = [];

        if(!isButtonClicked(inButton)) {
            var payload = "";

            var katiLeftVal = PayloadHandler.createPayloadBool("dai-kati-l", katiLeft)
            var katiRightVal = PayloadHandler.createPayloadBool("dati-kati-r", katiRight)
            var omoteVal = PayloadHandler.createPayloadBool("dai-omote", omote)
            var uraVal = PayloadHandler.createPayloadBool("dai-ura", ura)

            var leftText = PayloadHandler.createPayload("dai-text-l", hidari)
            var rightText = PayloadHandler.createPayload("dai-text-r", migi)
            var tokuLeft = PayloadHandler.createPayload("dai-toku-l", tokuHidari)
            var tokuRight = PayloadHandler.createPayload("dai-toku-r", tokuMigi)

            var kaiVal = PayloadHandler.createPayload("dai-kai", kai)

            payload = PayloadHandler.combinePayloads([katiLeftVal, katiRightVal, omoteVal, uraVal, leftText, rightText, tokuLeft, tokuRight, kaiVal])

            xhrReqs.push(PayloadHandler.setPayload("DAITAISEN", payload));
        }
        xhrReqs.push(PayloadHandler.triggerAnimation("DAITAISEN", "Toggle"));

        PayloadHandler.executeXHR(xhrReqs);
        toggleButtonColor(inButton);
        window.document.activeElement.blur();
    }
    
    function onOutClick(inButton, outButton) {
        
        console.log(outButton);

        console.log(`FirstVal: ${hidari}`)
        console.log(`SecondVal: ${migi}`)
    }

  return (
    <Col xs={4} className="control-panel">
        <h5 className="txt-panel-label">
            だいたいせん
        </h5>

        <VertConnectedInput
            firstText="ひだり"
            secondText="みぎ"
            mb="3" mt="3"
            onFirstTextChange={(e) => setHidari(e)}
            onSecondTextChange={(e) => setMigi(e)}
        />
        <LabeledCheckbox text="Kati Left" inline="true" handleOnChange={(e)=> setKatiLeft(e)}/>
        <LabeledCheckbox text="Kati Right" inline="true" handleOnChange={(e)=> setKatiRight(e)}/>
        
        <VertConnectedInput
            firstText="とくひだり"
            secondText="とくみぎ"
            mb="3" mt="3"
            onFirstTextChange={(e) =>  setTokuHidari(e)}
            onSecondTextChange={(e) => setTokuMigi(e)}
        />
        <LabeledCheckbox text="おもて" inline="true" handleOnChange={(e)=> setOmote(e)}/>
        <LabeledCheckbox text="うら" inline="true" handleOnChange={(e)=> setUra(e)}/>

        <InputText text="回" handleOnChange={(e) => setKai(e)}/>

        <InOutBtnGroup 
             onInClick={(inButton, outButton) => onInClick(inButton, outButton)}
             onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}
        />

    </Col>
  )
}




///props variable
/// id="id"
// export default function DaitaisenPanel(props) {
//     const hidariInput = useRef(null)
//     const migiInput = useRef(null)

//     const tokuHidariInput = useRef(null)
//     const tokuMigiInput = useRef(null)

//     const katiLeft = useRef(null)
//     const katiRight = useRef(null)

//     const omote = useRef(null)
//     const ura = useRef(null)
//     const kai = useRef(null)

//     //#endregion

  

//     function onInClick(inButton, outButton) {
//         console.log("Clicked IN button from DAITAISEN");

//         if(isButtonClicked(outButton)) {
//             toggleButtonColor(outButton)
//         }

//         let xhrReqs = [];

//         if(!isButtonClicked(inButton)) {
//             var payload = "";

//             var katiLeftVal = createPayloadBool("dai-kati-l", katiLeft.current.checked)
//             var katiRightVal = createPayloadBool("dati-kati-r", katiRight.current.checked)
//             var omoteVal = createPayloadBool("dai-omote", omote.current.checked)
//             var uraVal = createPayloadBool("dai-ura", ura.current.checked)

//             var leftText = createPayload("dai-text-l", hidariInput.current.value)
//             var rightText = createPayload("dai-text-r", migiInput.current.value)
//             var tokuLeft = createPayload("dai-toku-l", tokuHidariInput.current.value)
//             var tokuRight = createPayload("dai-toku-r", tokuMigiInput.current.value)

//             var kaiVal = createPayload("dai-kai", kai.current.value)

//             payload = combinePayloads([katiLeftVal, katiRightVal, omoteVal, uraVal, leftText, rightText, tokuLeft, tokuRight, kaiVal])

//             xhrReqs.push(setPayload("DAITAISEN", payload));
//         }
//         xhrReqs.push(triggerAnimation("DAITAISEN", "Toggle"));

//         executeXHR(xhrReqs);
//         toggleButtonColor(inButton);
//         window.document.activeElement.blur();
//     }
    
//     function onOutClick(inButton, outButton) {
//         console.log("Clicked OUT button from DAITAISEN");
//         console.log(outButton);

//         console.log(`FirstVal: ${hidariInput.current.value}`)
//         console.log(`SecondVal: ${migiInput.current.value}`)
//     }

//   return (
//       <Col xs={4} className="control-panel">
//         <h5 className="txt-panel-label">
//             だいたいせん
//         </h5>
        
//         {VertConnectedInput(["ひだり", hidariInput], ["みぎ", migiInput])}
//         <LabeledCheckbox ref={katiLeft} text="Kati Left" inline="true"/>
//         <LabeledCheckbox ref={katiRight} text="Kati Right" inline="true"/>
//         {VertConnectedInput(["とくひだり", tokuHidariInput], ["とくみぎ", tokuMigiInput])}
//         <LabeledCheckbox ref={omote} text="表" inline="true"/>
//         <LabeledCheckbox ref={ura} text="裏" inline="true"/>
//         <InputText ref={kai} text="回" />
        
//         <InOutBtnGroup 
//             onInClick={(inButton, outButton) => onInClick(inButton, outButton)}
//             onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}
//         />
        
//     </Col>
//   )
// }
