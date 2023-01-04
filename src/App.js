import React, {createContext} from 'react';
// import TodoList from './TodoList'

import OneShotPanel from './panels/OneshotPanel'
import ProfilePanel from './panels/ProfilePanel'
import TamaPanel from './panels/TamaPanel'
import DaitaisenPanel from './panels/DaitaisenPanel';
import BSOPanel from './panels/BSOPanel'
import DasekiPanel from './panels/DasekiPanel'

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"


export const InOutBtnContext = createContext(null);

function App() {

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
   </Container>
  )

}

export default App;
