import React from 'react'

import OneShotPanel from './panels/OneshotPanel'
import DynamoDB_Sample from './panels/DynamoDB_Sample'
import ProfilePanel from './panels/ProfilePanel'
import TamaPanel from './panels/TamaPanel'
import DaitaisenPanel from './panels/DaitaisenPanel';
import BSOPanel from './panels/BSOPanel'
import DasekiPanel from './panels/DasekiPanel'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

export default function ControlPanel() {
  
    return (
        <Container fluid>
          <Row>
            <OneShotPanel/>
            <ProfilePanel/>
            <TamaPanel/>
          </Row>
          <Row>
            <DaitaisenPanel/>
            <BSOPanel/>
            <DasekiPanel/>
          </Row>
          <Row>
            <DynamoDB_Sample/>
          </Row>
        </Container>
    )
  
}
