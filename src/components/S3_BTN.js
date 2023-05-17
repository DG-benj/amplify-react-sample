import React, { useRef} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

///props variable
///id="id"
export default function S3_Btn(props) {

  const getlinkButton = useRef(null);
  const outButton = useRef(null);
  const downloadButton = useRef(null);

  return (
    <>
        <ButtonGroup vertical className="btn-group-toggle btn-panel">
            <Button ref={getlinkButton} variant='primary' className="btn-inout-text" onClick={() => props.onGetLinkClick(getlinkButton.current, outButton.current)}>Get Link</Button>
            <Button ref={outButton} variant='primary' className="btn-inout-text"  onClick={() => props.onOutClick(getlinkButton.current, outButton.current)}>SCAN S3</Button>
            <Button ref={downloadButton} variant='primary' className="btn-inout-text"  onClick={() => props.onDownloadClick(downloadButton.current, outButton.current)}>Download Object</Button>

           
        </ButtonGroup>
    </>
  )
}
