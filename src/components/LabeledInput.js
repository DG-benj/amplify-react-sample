import React from 'react'
import Form from 'react-bootstrap/Form'

export default function LabeledInput({text, handleOnChange}) {


  LabeledInput.defaultProps = {
    text: "Example Text",
    handleOnChange: (e) => {console.log(e)}
  }

  return (
    <>
        <Form.Group className="">
            <Form.Label className="txt-input-label">{text}</Form.Label>
            <Form.Control placeholder="Enter Text..." onChange={(e) => handleOnChange(e.target.value)}/>
        </Form.Group>
    </>
  )
}
