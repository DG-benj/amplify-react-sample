import React, { useRef} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

///props variable
///id="id"
export default function InOutBtnGroup(props) {

  const inButton = useRef(null);
  const outButton = useRef(null);


  return (
    <>
        <ButtonGroup vertical className="btn-group-toggle btn-panel">
            <Button ref={inButton} variant='primary' className="btn-inout-text" onClick={() => props.onInClick(inButton.current, outButton.current)}>IN</Button>
            <Button ref={outButton} variant='danger' className="btn-inout-text"  onClick={() => props.onOutClick(inButton.current, outButton.current)}>OUT</Button>
        </ButtonGroup>
    </>
  )
}
