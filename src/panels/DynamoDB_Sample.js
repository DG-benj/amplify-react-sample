import React, { useState } from 'react'

import InOutBtnGroup from '../components/InOutBtnGroup'
import CheckboxGroup from '../components/CheckboxGroup'
import InputText from  '../components/InputText'
import VertConnectedInput from '../components/VertConnectedInput'
import LabeledCheckbox from '../components/LabeledCheckbox'
import DynamoDB_BTN from '../components/SendDynamoDB_BTN'

//import AWSPluginsCore from '../AWSPluginsCore'
import Col from "react-bootstrap/Col"
import * as PayloadHandler from '../PayloadHandler'
import { isButtonClicked, toggleButtonColor } from '../DOMHelper'

import { Amplify,API, Auth } from 'aws-amplify';
import awsconfig  from '../aws-exports';
import { DynamoDB } from 'aws-sdk'

const AWS = require('aws-sdk');
const AWS2 = require('aws-sdk');
var sns = new AWS.SNS();
var ddb = new AWS.DynamoDB();
var ddb2 = process.env.getItem;

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

var docClient = new AWS.DynamoDB.DocumentClient({
  region:'ap-northeast-1',
  credentials:{
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  }
});

  function onInClick(inButton, outButton) {

    if(isButtonClicked(outButton)) {
      toggleButtonColor(outButton)
    }
   GetItemsNow();
    toggleButtonColor(inButton)
    window.document.activeElement.blur()      
  }
 
  var params = {
      TableName: "Website_PlayerData_Sample",
      
      Key: {
          PlayerID: "10001",
      }
  };


  function GetItemsNow(){
    docClient.GetItemById(params,onGet);
  }

  function onGet(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        console.log(err);
    } else {        
        console.log("Scan succeeded.");
        console.log(data);
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
    TableName :'Website_PlayerData_Sample'
  }


  function ScanItems(){
    docClient.scan(params1, onScan);
  }
  var count = 0;

  function onScan(err, data) {
      if (err) {
          console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          console.log(err);
      } else {        
          console.log("Scan succeeded.");
          console.log(data);
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

  function onOutClick(inButton, outButton) {
    
    if(isButtonClicked(inButton)) {
      toggleButtonColor(inButton)
    }
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
