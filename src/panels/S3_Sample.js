import React, { useState, useEffect } from 'react'

import S3_BTN from '../components/S3_BTN'
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
var sns = new AWS.SNS();
var ddb = new AWS.DynamoDB();
var ddb2 = process.env.getItem;

var objectLists = [];
var htmlObjectLists = [];
export default function S3_Sample() {


  const [listValue, setListValue] = useState(null)
  const [options, setOptions] = useState([])

  const [currentPlayerID, setPlayerIDValue] = useState(null)
  const [currentPlayerName, setPlayerNameValue] = useState(null)

  const params1 = {
    TableName :'Website_PlayerData_Sample'
  }
  var newS3Client = new AWS.S3({
    region: 'ap-northest-1',
    credentials:{
      //for amplify credentials
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
      //for testing credentials
     // accessKeyId: awsconfig.AccessKey,
     // secretAccessKey: awsconfig.SAKey,
    }
  })

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
  ScanItems();
}

function UpdateListView(data){
  var listview = document.getElementById("ListObjects");
    listview.options.length = 0;
    objectLists = [];
    var cnt = 0;
    data.Contents.forEach(function(itemdata) {
      objectLists.push(itemdata);
      listview.options[listview.options.length] = new Option(itemdata.Key, cnt);
      cnt++;
   });
}

function NewSelected(){
  var listview = document.getElementById("ListObjects");
  console.log(objectLists[listview.value].Key + " - " +  objectLists[listview.value].LastModified);

    document.getElementById("s3_LinkTB").value =  objectLists[listview.value].Key;
}

function NewSelectedOnListFile(){
  var listview = document.getElementById("NewListFile");
  console.log(htmlObjectLists[listview.value].PlayerNumber + " - " +  htmlObjectLists[listview.value].PlayerName+ " - " +  htmlObjectLists[listview.value].TeamName);

    document.getElementById("NewListTB").value =  htmlObjectLists[listview.value].PlayerNumber + " - " +  htmlObjectLists[listview.value].PlayerName+ " - " +  htmlObjectLists[listview.value].TeamName;
}

// #region GET ONE OBJECT ON S3 BUCKET FUNCTIONS
  function onGetLinkClick(inButton, outButton) {

    if(isButtonClicked(outButton)) {
      toggleButtonColor(outButton)
    }
   GetItemsNow();
    toggleButtonColor(inButton)
    window.document.activeElement.blur()      
  }
 

  function GetItemsNow(){
      var params = {
        Bucket: "testingbenj",
        Key: document.getElementById("s3_LinkTB").value,
    };
    newS3Client.getObject(params, onGet);
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

// #region SCAN ALL OBJECTS FROM BUCKET FUNCTIONS
  
  async function ScanItems(){
    const paramsS3 = {
      Bucket: "testingbenj",
      
    }
    newS3Client.listObjects(paramsS3, onScan);
  }
  var count = 0;

  function onScan(err, data) {
      if (err) {
          console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          console.log(err);
      } else {        
          console.log("Scan succeeded.");
         // data.Contents.forEach(function(itemdata) {
           // console.log("Item :", ++count,JSON.stringify(itemdata));
        // });
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

// #region DOWNLOAD FUNCTIONS
function onDownloadClick(inButton, outButton) {
  var params = {
    Bucket: "testingbenj",
    Key: document.getElementById("s3_LinkTB").value,
};
newS3Client.getObject(params, onDownload);

}
function onDownload(err, data) {
  if (err) {
      console.error("Unable to Download the item. Error JSON:", JSON.stringify(err, null, 2));
      console.log(err);
  } else {        
      console.log("getting objectdata succeeded.");
      console.log(data);
      var contentypeString = data.ContentType.toString();
      if(contentypeString.includes("image")){
        //objects is image
        console.log("objects is image");
        var params = {
          Bucket: "testingbenj",
          Key: document.getElementById("s3_LinkTB").value,
          };
        const downloadUrl =newS3Client.getSignedUrl("getObject", params);
          console.log("the url is " + downloadUrl);
          var img = document.createElement('img');
          img.src = downloadUrl;
          document.body.appendChild(img);
      }else if (contentypeString.includes("video")){
        console.log("objects is video");

      }else if (contentypeString.includes("text")){
        console.log("objects is text");
        var params = {
          Bucket: "testingbenj",
          Key: document.getElementById("s3_LinkTB").value,
        };
           const downloadUrl =newS3Client.getSignedUrl("getObject", params);
           console.log("the url is " + downloadUrl);

          if(contentypeString.includes("xml")){
            PopulateListViewWithXML(downloadUrl);
          }else if(contentypeString.includes("plain")){
            PopulateListViewWithTextFile(downloadUrl);

          }
      }
  }
}

function PopulateListViewWithXML(xmlURL){
  var listview = document.getElementById("NewListFile");
  listview.options.length = 0;
  htmlObjectLists = [];
  var cnt = 0;
  var xhr = new XMLHttpRequest()
  xhr.open('GET', xmlURL)

  xhr.onload = (e) => {
   // console.log(xhr.responseText);
    var xhrResponse =xhr.responseXML.getElementsByTagName("row") ;
    for( let i=0; i < xhrResponse.length; i++){
      htmlObjectLists.push({
        PlayerId : xhrResponse[i].getElementsByTagName('PlayerID')[0].childNodes[0].nodeValue,
        PlayerName : xhrResponse[i].getElementsByTagName('PlayerName')[0].childNodes[0].nodeValue,
        PlayerNumber : xhrResponse[i].getElementsByTagName('PlayerNumber')[0].childNodes[0].nodeValue,
        PlayerRecord : xhrResponse[i].getElementsByTagName('PlayerRecord')[0].childNodes[0].nodeValue,
        PlayerWinRate : xhrResponse[i].getElementsByTagName('PlayerWinRate')[0].childNodes[0].nodeValue,
        TeamName : xhrResponse[i].getElementsByTagName('TeamName')[0].childNodes[0].nodeValue
      });
    listview.options[listview.options.length] = new Option(xhrResponse[i].getElementsByTagName('PlayerName')[0].childNodes[0].nodeValue, i);
  }
}
xhr.send(); 

  
}

function PopulateListViewWithTextFile(txtFileURL){
  var xhr = new XMLHttpRequest()
  xhr.open('GET', txtFileURL)

  xhr.onload = (e) => {
    console.log(xhr.responseText);
    htmlObjectLists = JSON.parse(xhr.responseText)['Player ID']
    console.log(htmlObjectLists)
}
xhr.send()
}

// #endregion

  return (
    
    <Col xs={5} className="control-panel">
        <h5 className='txt-panel-label'>S3_SAMPLE</h5>
        {
         <>
         <label for="Link" color='white'>S3 Link:</label>
         <input id="s3_LinkTB" text=""/> <br></br>
         
          </>
          
      }
        <select id="ListObjects"name="Objects" multiple size="6" onChange={NewSelected} >

        </select>

        <S3_BTN
            onGetLinkClick={(getlinkButton, outButton) => onGetLinkClick(getlinkButton, outButton)}
            onOutClick={(getlinkButton, outButton) => onOutClick(getlinkButton, outButton)}
            onDownloadClick={(downloadButton, outButton) => onDownloadClick(downloadButton, outButton)}
           /> 
         <input id="NewListTB" text=""/> <br></br>

      <select id="NewListFile"name="Objects" multiple size="4" onChange={NewSelectedOnListFile} >

        </select>
    </Col>
  )
}
