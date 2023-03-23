import React, { useState } from 'react'

import InOutBtnGroup from '../components/InOutBtnGroup'
import CheckboxGroup from '../components/CheckboxGroup'
import InputText from  '../components/InputText'
import VertConnectedInput from '../components/VertConnectedInput'
import LabeledCheckbox from '../components/LabeledCheckbox'
import DynamoDB_BTN from '../components/SendDynamoDB_BTN'

import Col from "react-bootstrap/Col"
import * as PayloadHandler from '../PayloadHandler'
import { isButtonClicked, toggleButtonColor } from '../DOMHelper'

import { Amplify,API } from 'aws-amplify';
//import awsconfig  from './aws-exports';
//Amplify.configure(awsconfig);

const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
docClient = new AWS.DynamoDB.DocumentClient();

export default function DynamoDB_Sample() {

  const [ballValues, setBallValues] = useState([])
  const [strikeValues, setStrikeValues] = useState([])
  const [outValues, setOutValues] = useState([])
  const [ruiValues, setRuiValues] = useState([])
  const [omoteValue, setOmoteValue] = useState(false)
  const [uraValue, setUraValue] = useState(null)
  const [kaiValue, setKaiValue] = useState(null)
  const [upValue, setUpValue] = useState(null)
  const [downValue, setDownValue] = useState(null)

  
  function onInClick(inButton, outButton) {

    if(isButtonClicked(outButton)) {
      toggleButtonColor(outButton)
    }
   GetItemsNow();
  GetItemById("10001");
    /*let xhrReqs = []

    if(!isButtonClicked(inButton)) {
      var payloads = []
      var completePayload = ""
      
      function pushBoolArrayPayload(id, arr) {
        arr.forEach((item, index, arr) => {
          var payload = PayloadHandler.createPayloadBool(`${id}${index+1}`, item.checked)
          payloads.push(payload);
        }) 
      }

      function pushBoolPayload(id, item) {
        var payload = PayloadHandler.createPayloadBool(id, item)
        payloads.push(payload)
      }

      function pushPayload(id, item) {
        var payload = PayloadHandler.createPayload(id, item)
        payloads.push(payload)
      }

      pushBoolArrayPayload("bso-b", ballValues)
      pushBoolArrayPayload("bso-s", strikeValues)
      pushBoolArrayPayload("bso-o", outValues)
      pushBoolArrayPayload("bso-rui", ruiValues)

      pushBoolPayload("bso-omote", omoteValue)
      pushBoolPayload("bso-ura", uraValue)
      pushPayload("bso-kai", kaiValue)
      pushPayload("bso-toku-up", upValue)
      pushPayload("bso-toku-down", downValue)

      completePayload = PayloadHandler.combinePayloads(payloads)
      xhrReqs.push(PayloadHandler.setPayload("BSO", completePayload))
    }
    xhrReqs.push(PayloadHandler.triggerAnimation("BSO", "Toggle"))

    PayloadHandler.executeXHR(xhrReqs)*/
    toggleButtonColor(inButton)
    window.document.activeElement.blur()      
  }

  var params = {
      TableName: "Website_PlayerData_Sample",
      Key: {
          PlayerID: "10001"
      }
  };
  
  function GetItemsNow(){
    docClient.get(params,onGet);
  }

  function onGet(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("Scan succeeded.");
        data.Items.forEach(function(itemdata) {
           console.log("Item :", ++count,JSON.stringify(itemdata));
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}


  const params1 = {
    TableName : 'Website_PlayerData_Sample'
  }
  

  function ScanItems(){
    docClient.scan(params1, onScan);
  }
  var count = 0;


 

  function onScan(err, data) {
      if (err) {
          console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      } else {        
          console.log("Scan succeeded.");
          data.Items.forEach(function(itemdata) {
             console.log("Item :", ++count,JSON.stringify(itemdata));
          });
  
          // continue scanning if we have more items
          if (typeof data.LastEvaluatedKey != "undefined") {
              console.log("Scanning for more...");
              params.ExclusiveStartKey = data.LastEvaluatedKey;
              docClient.scan(params, onScan);
          }
      }
  }


API.get('dynamoAPI', '/dynamoAPIs', {}).then(result => {
  this.dynamoAPIs = JSON.parse(result.body);
 }).catch(err => {
  console.log(err);
 })

function ScanAllItems(){
  console.log("Calling scan");

  API.get('dynamoAPI', '/dynamoAPIs');
}

function GetItemById(toFindID){
  console.log("Calling get");
  API.get('dynamoAPI', '/dynamoAPIs/'+'${PlayerID}' + '{' + toFindID +'}', {}).then((result) => {
    this.dynamoAPIs = JSON.parse(result.body);
  }).catch(err => {
    console.log(err);
  })
}

  function onOutClick(inButton, outButton) {
    
    if(isButtonClicked(inButton)) {
      toggleButtonColor(inButton)
    }
    ScanAllItems();
    ScanItems();

    window.document.activeElement.blur()
  }    



  return (
    <Col xs={2} className="control-panel">
        <h5 className='txt-panel-label'>DYNAMODB_SAMPLE</h5>
        {/*
        <CheckboxGroup 
          text="BALL" 
          count={3} 
          spacing="21px" 
          handleOnChange={(values) => setBallValues(values)}
        />

        <CheckboxGroup 
          text="STRIKE" 
          count={2} 
          spacing="6px" 
          handleOnChange={(values) => setStrikeValues(values)}
        />

        <CheckboxGroup 
          text="OUT" 
          count={2} 
          spacing="26px" 
          handleOnChange={(values) => setOutValues(values)}
        />

        <CheckboxGroup 
          text="RUI" 
          count={2} 
          spacing="32px" 
          handleOnChange={(values) => setRuiValues(values)}
        />

        <LabeledCheckbox
          text="表"
          inline="true"
          handleOnChange={(e) => setOmoteValue(e)}
        />
        <LabeledCheckbox
          text="裏"
          inline="true"
          handleOnChange={(e) => setUraValue(e)}
        />

        <InputText 
          text="回"
          handleOnChange={(e) => { setKaiValue(e) }}
        />

        <VertConnectedInput
            firstText="UP"
            secondText="DOWN"
            mt="3"
            onFirstTextChange={(e) =>  setUpValue(e)}
            onSecondTextChange={(e) => setDownValue(e)}
        />
  */
      }

        {/* <CheckboxGroup text="STRIKE" count={2} spacing="6px"/>
        <CheckboxGroup text="OUT" count={2} spacing="26px"/>
        <CheckboxGroup text="RUI" count={2} spacing="32px"/>
        <LabeledCheckbox text="表" inline="true"/>
        <LabeledCheckbox text="裏" inline="true"/>
        <InputText text="回"/>
        <VertConnectedInput firstText="UP" secondText="DOWN" mt={3}/>*/}
        <DynamoDB_BTN
            onInClick={(inButton, outButton) => onInClick(inButton, outButton)}
            onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}/> 
    </Col>
  )
}
