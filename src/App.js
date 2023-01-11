import React, {createContext} from 'react';
import ControlPanel from './ControlPanel';

import logo from "./logo192.png";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react"

export const InOutBtnContext = createContext(null);

function App({signOut}) {

  return (
    <>
      <Button onClick={signOut}>Sign Out</Button>
      <ControlPanel/>
    </>
    // <View className="App">
    //   <Card>
    //     <Image src={logo} clasasName="App-logo" alt="logo"/>
    //     <Heading level={1}>We now have Auth!</Heading>
    //   </Card>
    //   <Button onClick={signOut}>Sign Out</Button>
    // </View>
  )

}

export default withAuthenticator(App);
