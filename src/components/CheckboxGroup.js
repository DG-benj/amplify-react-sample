import React, { useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form'




export default function CheckboxGroup({text, count, spacing, handleOnChange}) {

  CheckboxGroup.defaultProps = {
    text: "Sample Title",
    count: 1,
    spacing: "0px",
    handleOnChange: (refArray) => { console.log(refArray)}
  }

  const refArray = useRef([])
  const checkboxCount = count ? count : 1;

  useEffect(() => {
    handleOnChange(refArray.current)
  })

  function CreateCheckboxes() {
    if(checkboxCount === 0) {
      return <></>
    }

    var checkboxes = [];
    for(let i = 0; i < checkboxCount; i++) {
      checkboxes.push(false)
    }
  
    return checkboxes.map((v, i) => {
      return (
        <Form.Check
          ref={(elem) => (refArray.current[i] = elem)}
          key={i}
          id={`${text}-${i}`}
          style={{margin: "0px 5px 0px 0px"}} 
          inline
        />
      )
    })
  }

  return (
    <>
      <Form.Group>
        <Form.Label className="txt-input-label" style={{margin: `0px ${(spacing ? spacing : "0px")} 0px 0px`}}>{text}</Form.Label>
        {CreateCheckboxes()} 
      </Form.Group>
    </>
  )
}