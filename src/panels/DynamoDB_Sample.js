import React, { useState, useEffect } from 'react'

import InOutBtnGroup from '../components/InOutBtnGroup'
import CheckboxGroup from '../components/CheckboxGroup'
import InputText from  '../components/InputText'
import VertConnectedInput from '../components/VertConnectedInput'
import LabeledCheckbox from '../components/LabeledCheckbox'
import DynamoDBBTN from '../components/SendDynamoDB_BTN'
import ListView from '../components/ListView'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import Col from "react-bootstrap/Col"
import * as PayloadHandler from '../PayloadHandler'
import { isButtonClicked, toggleButtonColor } from '../DOMHelper'

import { Amplify,API, Auth } from 'aws-amplify';
import awsconfig  from '../aws-exports';
import { useImperativeHandle } from 'react'

const AWS = require('aws-sdk');
var playerList = [];
export default function DynamoDB_Sample() {


  const [listValue, setListValue] = useState(null)
  const [options, setOptions] = useState([])

  const [currentPlayerID, setPlayerIDValue] = useState(null)
  const [currentPlayerName, setPlayerNameValue] = useState(null)

  const params1 = {
    TableName :'Website_PlayerData_Sample'
  }
var docClient = new AWS.DynamoDB.DocumentClient({
  region:'ap-northeast-1',
  credentials:{
    //for amplify credentials
  accessKeyId: process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    //for testing credentials
    //accessKeyId: awsconfig.AccessKey,
    //secretAccessKey: awsconfig.SAKey,
  }
});

useEffect(() => {
  if(options.length !== 0) {
    console.log("0");
      return
  }
  ListViewData((data) => {
      setOptions(data)
  })
}, [options.length])


function handleListView(data) {
  return (<ListView 
  data={options} 
  handleOnChange={value => setListValue(value)}
/>)
}

function ListViewData(){
  docClient.scan(params1, function(err, data) {
    if (err) console.log(err);
    else{
    UpdateListView(data);
    var newdata = [];

    return newdata;
    }
  })
}

function UpdateListView(data){
  var listview = document.getElementById("PlayerSelect");
    listview.options.length = 0;
    playerList = [];
    var cnt = 0;
    data.Items.forEach(function(itemdata) {
      playerList.push(itemdata);
      listview.options[listview.options.length] = new Option(itemdata.PlayerName, cnt);
      cnt++;
   });
   console.log("here at 2 " +  playerList[2].PlayerName);
}

function NewSelected(){
  var listview = document.getElementById("PlayerSelect");
  console.log(playerList[listview.value].PlayerID + " - " +  playerList[listview.value].PlayerName);

    document.getElementById("PlayerIDTB").value =  playerList[listview.value].PlayerID;
    document.getElementById("PlayerNameTB").value = playerList[listview.value].PlayerName;
    document.getElementById("PlayerNumberTB").value = playerList[listview.value].PlayerNumber;
    document.getElementById("PlayerRecordTB").value = playerList[listview.value].PlayerRecord;
    document.getElementById("PlayerWinrateTB").value = playerList[listview.value].PlayerWinRate;
    document.getElementById("PlayerTeamNameTB").value = playerList[listview.value].TeamName
  
}

// #region GET ITEM FUNCTIONS
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
           PlayerID: parseInt(document.getElementById("PlayerIDTB").value),
           PlayerName:  document.getElementById("PlayerNameTB").value,
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
// #endregion

// #region SCAN ALL FUNCTIONS
  
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
        UpdateListView(data);
          
      }
  }

  function onOutClick(inButton, outButton) {
    
    if(isButtonClicked(inButton)) {
      toggleButtonColor(inButton)
    }
    ScanItems();
    window.document.activeElement.blur()
  }    
// #endregion

// #region DELETE FUNCTION
  function onDeleteClick(deleteButton, outButton){
  console.log("delete is clicked");

    var params2 = {
      TableName : 'Website_PlayerData_Sample',
      Key: {
        PlayerID: parseInt(document.getElementById("PlayerIDTB").value),
        PlayerName: document.getElementById("PlayerNameTB").value,
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
      ListViewData();

    }
}
// #endregion

// #region UPDATE FUNCTIONS
function onUpdateClick(updateButton, outButton){
  console.log("update is clicked");

  var params3 = {
    TableName : 'Website_PlayerData_Sample',
    Item: {
      PlayerID: parseInt(document.getElementById("PlayerIDTB").value),
      PlayerName: document.getElementById("PlayerNameTB").value,
      PlayerNumber:document.getElementById("PlayerNumberTB").value,
      PlayerRecord: document.getElementById("PlayerRecordTB").value,
      PlayerWinRate: document.getElementById("PlayerWinrateTB").value,
      TeamName: document.getElementById("PlayerTeamNameTB").value,

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
      ListViewData();

  }
}
// #endregion

// #region CREATE FUNCTIONS
//
function onCreateClick(createButton, outButton){
  console.log("Create is clicked");
   var params4 = {
    TableName : 'Website_PlayerData_Sample',
    Item: {
      PlayerID: parseInt(document.getElementById("PlayerIDTB").value),
      PlayerName: document.getElementById("PlayerNameTB").value,
      PlayerNumber:document.getElementById("PlayerNumberTB").value,
      PlayerRecord: document.getElementById("PlayerRecordTB").value,
      PlayerWinRate: document.getElementById("PlayerWinrateTB").value,
      TeamName: document.getElementById("PlayerTeamNameTB").value,

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
      ListViewData();
  }
}
// #endregion

  return (
    
    <Col xs={5} className="control-panel">
        <h5 className='txt-panel-label'>DYNAMODB_SAMPLE</h5>
        {
         <>
         <label for="ID" color='white'>Player ID:</label>
         <input id="PlayerIDTB" text="Player ID"/> <br></br>
         <label for="Name" color='white'>Player Name:</label>
          <input id="PlayerNameTB" text="Player Name" /><br></br>
         <label for="Number" color='white'>Player Number:</label>
          <input id="PlayerNumberTB" text="Player Number"/><br></br>
         <label for="Record" color='white'>Player Record:</label>
          <input id="PlayerRecordTB" text="Player Record"/><br></br>
         <label for="Win Rate" color='white'>Player Win Rate:</label>
          <input id="PlayerWinrateTB" text="Player WinRate"/><br></br>
         <label for="Team Name" color='white'>Team Name:</label>
          <input id="PlayerTeamNameTB" text="Player Team Name"/><br></br>
          </>
          
      }
        <select id="PlayerSelect"name="Players" multiple size="4" onChange={NewSelected} >

        </select>

        <DynamoDBBTN
            onInClick={(inButton, outButton) => onInClick(inButton, outButton)}
            onOutClick={(inButton, outButton) => onOutClick(inButton, outButton)}
            onDeleteClick={(deleteButton, outButton) => onDeleteClick(deleteButton, outButton)}
            onCreateClick={(createButton, outButton) => onCreateClick(createButton, outButton)}
            onUpdateClick={(updateButton, outButton) => onUpdateClick(updateButton, outButton)}/> 
    </Col>
  )
}
