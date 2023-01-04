import React, { forwardRef } from 'react'
import Form from 'react-bootstrap/Form'


// export default function LabeledCheckbox({text, inline, handleOnChange}) {
  
//   LabeledCheckbox.defaultProps = {
//     text: "Example...",
//     inline: true,
//     handleOnChange: (e) => {console.log(e)} 
//   }

//   const isInline = inline ? inline : false;
//   const checkboxRef = useRef(null)


//   return (
//     <>
//       <Form.Check
//         inline={inline}
//         label={text}
//         ref={checkboxRef}
//         className="txt-input-label"
//         onChange={(e) => handleOnChange(e.target.checked)}
//       />
//     </>
//   ) 
// }

const LabeledCheckbox = forwardRef(({text, inline, handleOnChange}, ref) => {
  LabeledCheckbox.defaultProps = {
    text: "Example...",
    inline: true,
    handleOnChange: (e) => {console.log(e)} 
  }



  return (
    <>
      <Form.Check
        inline={inline}
        label={text}
        ref={ref}
        className="txt-input-label"
        onChange={(e) => handleOnChange(e.target.checked)}
      />
    </>
  ) 
})

export default LabeledCheckbox