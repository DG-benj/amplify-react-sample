import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export default function VertConnectedInput({firstText, secondText, mb, mt, onFirstTextChange, onSecondTextChange}) {
  
  VertConnectedInput.defaultProps = {
    firstText: "Example...",
    secondText: "Example...",
    mb: 3,
    mt: 3,
    onFirstTextChange: (e) => {console.log(e)},
    onSecondTextChange: (e) => {console.log(e)}
  }
  
  return (
    <>
        <InputGroup className={`mb-${mb} mt-${mt}`}>
            <InputGroup.Text>{firstText}</InputGroup.Text>
            <Form.Control onChange={(e) => onFirstTextChange(e.target.value)}/>
            <InputGroup.Text>{secondText}</InputGroup.Text>
            <Form.Control onChange={(e) => onSecondTextChange(e.target.value)}/>
        </InputGroup>
    </>
  )
}

// export default function VertConnectedInput([leftText, leftTextRef], [rightText, rightTextRef]) {
        
//   return (
//       <InputGroup className={`mb-2 mt-2`}>
//           <InputGroup.Text>{leftText}</InputGroup.Text>
//           <Form.Control ref={leftTextRef}/>
//           <InputGroup.Text>{rightText}</InputGroup.Text>
//           <Form.Control ref={rightTextRef}/>
//       </InputGroup>
//   ) 
// }