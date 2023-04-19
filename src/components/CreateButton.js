import React, {useState, useRef} from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { sendOneshotDataUpdate, createBodyPayload } from '../DataHandler'

import InputText from './InputText'
import ListView from './ListView'

export default function CreateButton({dataName, data, dataTarget}) {
  const [show, setShow] = useState(false)
  const [dataIndex, setDataIndex] = useState(null)
  const dataFieldRef = useRef([])
  
  function handleClose() {
    setShow(false)
  }

  function handleOpen() {
    setShow(true)
  }
  
  function updateData() {

    const dataKeys = Object.keys(data[dataIndex][`Player${dataIndex+1}`])
    const bodyArray = []

    console.log(data[dataIndex][`_id`])
    // bodyData.push(`_id: ${}`)
    for(let i = 0; i < dataKeys.length; i++) {
      const bodyData = `"${dataKeys[i]}": "${dataFieldRef.current[i].value}"`
      bodyArray.push(bodyData)
    }
    
    let body = createBodyPayload(bodyArray)
    sendOneshotDataUpdate(body);

  
    
   // return dataFields
  }
  
  
  CreateButton.defaultProps = {
    dataName: "Unknown",
    data: {key: 1}
  }
  
  return (
    <>
    <Button variant="info" onClick={handleOpen} className="edit-button fw-bold btn-inout-text">
    Create
    </Button>
    
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
    <Modal.Title>Create New Item</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
          <InputText id="playerId" text="Player ID"></InputText>
          <InputText id="playerName" text="Player Name"></InputText>
          <InputText id="playerNumber" text="Player Number"></InputText>
          <InputText id="playerRecord" text="Player Record"></InputText>
          <InputText id="playerWinRate" text="Player Win Rate"></InputText>
          <InputText id="teamName" text="Team Name"></InputText>
    </Modal.Body>
    
    <Modal.Footer>
    <Button variant="light" onClick={handleClose}>
    Close
    </Button>
    <Button variant="info" onClick={updateData}>
    Create
    </Button>
    </Modal.Footer>
    </Modal>
    </>
    )
  }
  