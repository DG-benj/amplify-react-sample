import React, { forwardRef } from 'react'
// import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function InputText ({text, defaultValue, handleOnChange}, ref) {
  InputText.defaultProps = {
    text: "",
    defaultValue: "",
    handleOnChange: (e) => {console.log(e)}
  }

  return (
    <>
      <InputGroup>
          <InputGroup.Text>{text}</InputGroup.Text>
          <Form.Control 
            ref={ref}
            defaultValue={defaultValue}
            onChange={handleOnChange ? (e) => handleOnChange(e.target.value) : null}
            />
      </InputGroup>
    </>
  )
}

// const InputText = ({text, defaultValue, handleOnChange}, ref) => {
  
//   InputText.defaultProps = {
//     text: "",
//     defaultValue: "",
//     handleOnChange: (e) => {console.log(e)}
//   }

//   return (
//     <>
//       <InputGroup>
//           <InputGroup.Text>{text}</InputGroup.Text>
//           <Form.Control 
//             ref={ref}
//             defaultValue={defaultValue}
//             onChange={(e) => handleOnChange(e.target.value)}
//             />
//       </InputGroup>
//     </>
//   )
// }

export default forwardRef(InputText)