import React, {useState, useRef} from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { sendOneshotDataUpdate, createBodyPayload } from '../DataHandler'

import InputText from './InputText'
import ListView from './ListView'

export default function EditButton({dataName, data, dataTarget}) {
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

  }

  function setupDataFields() {
    const dataFields=[];
    if(typeof(data[dataIndex]) === "undefined") {
      return <></>
    }
    
    
    // const dataKeys = Object.keys(data[dataIndex][`Player${dataIndex+1}`])
    const dataKeys = Object.keys(data[dataIndex][`Player`])

    for(let i = 0; i < dataKeys.length; i++) {
      // let entry = Object.entries(data[dataIndex][`Player${dataIndex+1}`])
      let entry = Object.entries(data[dataIndex][`Player`])
      dataFields.push(<InputText ref={elem => dataFieldRef.current[i] = elem} key={i} text={entry[i][0]} defaultValue={entry[i][1]}/>)
    }
    
    return dataFields
  }
  
  
  EditButton.defaultProps = {
    dataName: "Unknown",
    data: {key: 1}
  }
  
  return (
    <>
    <Button variant="info" onClick={handleOpen} className="edit-button fw-bold btn-inout-text">
    EDIT
    </Button>
    
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
    <Modal.Title>Currently editing {dataName}</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
    
    <ListView data={data} handleOnChange={value => 
      {
        setDataIndex(parseInt(value[value.length-1] - 1))
        
        console.log(dataFieldRef.current)
        for(let i = 0; i < dataFieldRef.current.length; i++) {
          const dataValues = data[dataIndex][`Player${dataIndex+1}`]
          const dataKeys = Object.keys(dataValues)

          const dataField = dataFieldRef.current[i]
          dataField.value = dataValues[dataKeys[i]]
        }
      }
    } />
    
    {setupDataFields()}
    </Modal.Body>
    
    <Modal.Footer>
    <Button variant="light" onClick={handleClose}>
    Close
    </Button>
    <Button variant="info" onClick={updateData}>
    Save Changes
    </Button>
    </Modal.Footer>
    </Modal>
    </>
    )
  }
  