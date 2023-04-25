import React from 'react'

import OneShotPanel from './panels/OneshotPanel'
import DynamoDB_Sample from './panels/DynamoDB_Sample'
import ProfilePanel from './panels/ProfilePanel'
import TamaPanel from './panels/TamaPanel'
import DaitaisenPanel from './panels/DaitaisenPanel';
import BSOPanel from './panels/BSOPanel'
import DasekiPanel from './panels/DasekiPanel'
import S3_Sample from './panels/S3_Sample'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

export default function ControlPanel() {
  
    return (
        <Container fluid>
          <Row>
            <DynamoDB_Sample/>
            <S3_Sample/>
          </Row>
        </Container>
    )
  
}
