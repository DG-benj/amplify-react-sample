import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import "./App.css"

import { Amplify } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config);

// import fs from "fs"
// import https from "https"

// const cert = fs.readFile("./certificate.pem");
// https.globalAgent.options.ca = [cert];



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);