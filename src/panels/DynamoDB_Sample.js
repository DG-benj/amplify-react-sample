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

  const [currentPlayerID, setPlayerIDValue] = useState(null)
  const [currentPlayerName, setPlayerNameValue] = useState(null)

var docClient = new AWS.DynamoDB.DocumentClient({
  region:'ap-northeast-1',
  credentials:{
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  // accessKeyId: awsconfig.AccessKey,
 //  secretAccessKey: awsconfig.SAKey,
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
 

  function GetItemsNow(){
      var params = {
        TableName: "Website_PlayerData_Sample",
        Key: {
           PlayerID: parseInt(currentPlayerID.toString()),
           PlayerName: currentPlayerName.toString(),
        },
    };
      docClient.get(params,onGet);
  }

  function onGet(err, data) {
    if (err) {
        console.error("Unable to get the item. Error JSON:", JSON.stringify(err, null, 2));
        console.log(err);
    } else {        
        console.log("Scan succeeded.");
        console.log(data);
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
      }
  }

  function onOutClick(inButton, outButton) {
    
    if(isButtonClicked(inButton)) {
      toggleButtonColor(inButton)
    }
    ScanItems();
    window.document.activeElement.blur()
  }    



  function onDeleteClick(deleteButton, outButton){
  console.log("delete is clicked");

    var params2 = {
      TableName : 'Website_PlayerData_Sample',
      Key: {
        PlayerID: parseInt(currentPlayerID.toString()),
        PlayerName: currentPlayerName.toString(),
      }
    };
    docClient.delete(params2,onDelete);

  }

  function onDelete(err, data) {
    if (err) {
        console.error("Unable to delete the item. Error JSON:", JSON.stringify(err, null, 2));
        console.log(err);
    } else {        
        console.log("delete succeeded.");
        console.log(data);
    }
}


function onUpdateClick(updateButton, outButton){
  console.log("update is clicked");

  var params3 = {
    TableName : 'Website_PlayerData_Sample',
    Item: {
      PlayerID: 10009,
      PlayerName: "test",
      PlayerNumber: 90,
      PlayerRecord: 9-9,
      PlayerWinRate: "50%",
      TeamName: "VSC_2",
    }
  };
  docClient.put(params3,onUpdate);

}

function onUpdate(err, data) {
  if (err) {
      console.error("Unable to update the item. Error JSON:", JSON.stringify(err, null, 2));
      console.log(err);
  } else {        
      console.log("update succeeded.");
      console.log(data);
  }
}

function onCreateClick(createButton, outButton){
  console.log("Create is clicked");

  var params4 = {
    TableName : 'Website_PlayerData_Sample',
    Item: {
      PlayerID: 10009,
      PlayerName: "test",
      PlayerNumber: 88,
      PlayerRecord: 8-8,
      PlayerWinRate: "50%",
      TeamName: "VSC",

    }
  };
  docClient.put(params4,onCreate);
}


function onCreate(err, data) {
  if (err) {
      console.error("Unable to create the item. Error JSON:", JSON.stringify(err, null, 2));
      console.log(err);
  } else {        
      console.log("create succeeded.");
      console.log(data);
  }
}
  return (
    <Col xs={5} className="control-panel">
        <h5 className='txt-panel-label'>DYNAMODB_SAMPLE</h5>
        {
         <><InputText
          text="Player ID"
          handleOnChange={(e) => { setPlayerIDValue(e) } } />
          <InputText
          text="Player Name"
          handleOnChange={(e) => { setPlayerNameValue(e) } } />
          </>
       /*
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
            onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}
            onDeleteClick={(deleteButton, outButton) => onDeleteClick(deleteButton, outButton)}
            onCreateClick={(createButton, outButton) => onCreateClick(createButton, outButton)}
            onUpdateClick={(updateButton, outButton) => onUpdateClick(updateButton, outButton)}/> 
    </Col>
  )
}
