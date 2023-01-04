import React from 'react'
import Form from 'react-bootstrap/Form'

export default function ListView({data, handleOnChange}) {
  
  function setOptions(data) {
    var options = []

    if(typeof(data) === 'undefined') {
      return []
    }
    // console.table(data)
    for(let i = 0; i < data.length; i++) {
      options.push(<option key={`${i}`}>{`Player [${""}]`}</option>)
    }
    return options
  }

  ListView.defaultProps = {
    data: [],
    handleOnChange: (e) => {console.log(`Default Function: Value=${e}`)}
  }
 
  return (
    <>
      <Form.Select
        htmlSize="3"
        onChange={e => handleOnChange(e.target.value)}
      >
        {setOptions(data)}
      </Form.Select>
    </>
  )

  
}

