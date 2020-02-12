import React, { useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import './App.css';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, Modal, ModalHeader} from 'reactstrap';

import Main from './Components/Main';
import Subscribe from './Components/Subscribe';
import SignUp from './Components/SignUp';

// firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "transunited.firebaseapp.com",
  databaseURL: "https://transunited.firebaseio.com",
  projectId: "transunited",
  storageBucket: "transunited.appspot.com",
  messagingSenderId: "363669148470",
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: "G-ZNQK4D5VV1"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const App = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  /**
   * Checks whether a given string is a valid email address.
   *
   * @param {*} email - The string to validate.
   * @returns true or false
   */
  const validateEmail = email => {
    const emailRegex = /^[^@]+@[^@]+\.[a-z]+$/i;
    return emailRegex.test(email);
  }

  return (
    <div className="App">
      <Navbar expand="md">
        <NavbarBrand href="/"><strong>transUnited Alpha</strong></NavbarBrand>
        <Nav className="ml-auto">
          <NavItem>
            <NavLink href="/sign-up">Sign Up</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggleModal}>Subscribe</ModalHeader>
        <Subscribe toggleModal={toggleModal} validateEmail={validateEmail} />
      </Modal>

      {/* Routing */}
      <div className="main">
        <BrowserRouter>
          <Switch>
            {/* Default */}
            <Route exact path="/" render={() => <Main toggleModal={toggleModal} />} />
            {/* Sign Up */}
            <Route path="/sign-up" render={() => <SignUp validateEmail={validateEmail} firebase={firebase} />} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
