import React, { useState, useEffect } from 'react'
//import mongoDB from 'mongodb'
//import MongoDb, { MongoClient, ServerApiVersion } from 'mongodb'

import S3Btn from '../components/S3_Btn'
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
//const { MongoClient, ServerApiVersion } = require('mongodb');


var objectLists = [];
var htmlObjectLists = [];
export default function MongoDB_Sample() {


  const [listValue, setListValue] = useState(null)
  const [options, setOptions] = useState([])

  const [currentPlayerID, setPlayerIDValue] = useState(null)
  const [currentPlayerName, setPlayerNameValue] = useState(null)

  const params1 = {
    TableName :'Website_PlayerData_Sample'
  }
  var url = "mongodb+srv://DG_Benj:NW4iDYhwzVwT3mcI@players.pg7hsx0.mongodb.net/?retryWrites=true&w=majority";
 /* var mongoClient = new MongoClient(url,
    {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });*/
    
    var dataMongoDB = JSON.stringify({
      "collection": "PlayerDataBase_Collection",
      "database": "PlayerDataBase",
      "dataSource": "Players",
      "projection": {
          "_id": 1
      }
  });

    var config = {
      method: 'post',
      url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-oxrsp/endpoint/data/v1/action/findOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'Access-Control-Allow-Origin':'*',
        'api-key':  process.env.REACT_APP_APIKEY_MONGODB,
      },
      data: dataMongoDB
    };
 

  
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

// if the list view had a new click 
function NewSelected(){
  var listview = document.getElementById("ListObjects");
  console.log(objectLists[listview.value].Key + " - " +  objectLists[listview.value].LastModified);

    document.getElementById("s3_LinkTB").value =  objectLists[listview.value].Key;
}

// if the list view had a new click 
function NewSelectedOnListFile(){
  var listview = document.getElementById("NewListFile");

    document.getElementById("NewListTB").value =  htmlObjectLists[listview.value].PlayerNumber + " - " +  htmlObjectLists[listview.value].PlayerName+ " - " +  htmlObjectLists[listview.value].TeamName;
}

// #region GET ONE OBJECT ON S3 BUCKET FUNCTIONS
  function onGetLinkClick(getlinkButton, outButton) {

    if(isButtonClicked(outButton)) {
      toggleButtonColor(outButton)
    }
   GetItemsNow();
  //  toggleButtonColor(getlinkButton)
    window.document.activeElement.blur()      
  }
 

  function GetItemsNow(){
    axios1(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
   /*try{
   mongoClient.connect();
   mongoClient.db("admin").command({ ping: 1 });
   console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }catch{
   console.log( "unsuccessfully connected to MongoDB!");

    }
*/
     /* var params = {
        Bucket: "testingbenj",
        Key: document.getElementById("s3_LinkTB").value,
    };
    newS3Client.getObject(params, onGet);*/
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

  function onOutClick(getlinkButton, outButton) {
    
    
    ScanItems();
    window.document.activeElement.blur()
  }    
// #endregion

// #region DOWNLOAD FUNCTIONS
function onDownloadClick(downloadButton, outButton) {
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
      // Determines the ContentType of the Object being download
      var contentypeString = data.ContentType.toString();
      var params = {
        Bucket: "testingbenj",
        Key: document.getElementById("s3_LinkTB").value,
        };
      const downloadUrl =newS3Client.getSignedUrl("getObject", params);
      console.log("the download url is " + downloadUrl);
      //objects is image
      if(contentypeString.includes("image")){
        console.log("objects is image");
        
          var img = document.createElement('img');
          img.src = downloadUrl;
          document.body.appendChild(img);
      }else if (contentypeString.includes("video")){
      //objects is Video
        console.log("objects is video");

      }else if (contentypeString.includes("text")){
      //objects is text
        console.log("objects is text");

          if(contentypeString.includes("xml")){
            PopulateListViewWithXML(downloadUrl);
          }else if(contentypeString.includes("plain")){
            PopulateListViewWithTextFile(downloadUrl);
          }
      }
  }
}

// Populate the List view using XML format the Attributes must be manually added for it to be able to correctly add into the array as well as the List view
function PopulateListViewWithXML(xmlURL){
  var listview = document.getElementById("NewListFile");
  listview.options.length = 0;
  htmlObjectLists = [];
  var xhr = new XMLHttpRequest()
  xhr.open('GET', xmlURL)

  xhr.onload = (e) => {
    console.log(xhr.responseXML);
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

// Populate the List view using the normal text file format of Digidelic using the "-----------" as divider
// manually add the Attribute and number of divider to correctly place into the list view
function PopulateListViewWithTextFile(txtFileURL){
  var listview = document.getElementById("NewListFile");
  listview.options.length = 0;
  htmlObjectLists = [];
  var xhr = new XMLHttpRequest()
  xhr.open('GET', txtFileURL)
  xhr.onload = (e) => {
  console.log(xhr.responseText);
  var itemsArr = xhr.responseText.split('\r\n');
  for( let i=0; i < itemsArr.length; i +=7){
    htmlObjectLists.push({
      PlayerId : itemsArr[i],
      PlayerName :  itemsArr[i+1],
      PlayerNumber : itemsArr[i+2],
      PlayerRecord :  itemsArr[i+3],
      PlayerWinRate : itemsArr[i+4],
      TeamName :  itemsArr[i+5]
    });
   }
      for(let j = 0; j < htmlObjectLists.length; j++){
        listview.options[listview.options.length] = new Option(htmlObjectLists[j].PlayerName, j);
      }
  }
  xhr.send()

}
// #endregion

  return (
    
    <Col xs={5} className="control-panel">
        <h5 className='txt-panel-label'>MongoDB Sample XML FIle</h5>
        {
         <>
         <label for="Link" color='white'>S3 Link:</label>
         <input id="s3_LinkTB" text=""/> <br></br>
         
          </>
          
      }
        <select id="ListObjects"name="Objects" multiple size="6" onChange={NewSelected} >

        </select>

        <S3Btn
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
