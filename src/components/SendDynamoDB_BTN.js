import React, { useRef} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

///props variable
///id="id"
export default function DynamoDB_BTN(props) {

  const inButton = useRef(null);
  const outButton = useRef(null);
  const deleteButton = useRef(null);
  const createButton = useRef(null);
  const updateButton = useRef(null);


  return (
    <>
        <ButtonGroup vertical className="btn-group-toggle btn-panel">
            <Button ref={inButton} variant='primary' className="btn-inout-text" onClick={() => props.onInClick(inButton.current, outButton.current)}>Get Item</Button>
            <Button ref={outButton} variant='primary' className="btn-inout-text"  onClick={() => props.onOutClick(inButton.current, outButton.current)}>SCAN TABLE</Button>
            <Button ref={deleteButton} variant='danger' className="btn-inout-text"  onClick={() => props.onDeleteClick(deleteButton.current, outButton.current)}>Delete Item</Button>
            <Button ref={updateButton} variant='primary' className="btn-inout-text"  onClick={() => props.onUpdateClick(updateButton.current, outButton.current)}>Update Item</Button>
            <Button ref={createButton} variant='primary' className="btn-inout-text"  onClick={() => props.onCreateClick(createButton.current, outButton.current)}>Create Item</Button>
        </ButtonGroup>
    </>
  )
}
