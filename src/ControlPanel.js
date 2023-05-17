import React from 'react'

import DynamoDBSample from './panels/DynamoDB_Sample'
import S3Sample from './panels/S3_Sample'
import MongoDBSample from './panels/MongoDB_Sample'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

export default function ControlPanel() {
  
    return (
        <Container fluid>
          <Row>
            <DynamoDBSample/>
            <S3Sample/>
            <MongoDBSample/>
          </Row>
        </Container>
    )
  
}
