import React, { useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, Modal, ModalHeader} from 'reactstrap';

import Main from './Components/Main';
import Subscribe from './Components/Subscribe';
import About from './Components/About';

const App = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  return (
    <div className="App">
      <Navbar expand="md">
        <NavbarBrand href="/"><strong>transUnited</strong></NavbarBrand>
        <Nav className="ml-auto">
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggleModal}>Subscribe</ModalHeader>
        <Subscribe toggleModal={toggleModal} />
      </Modal>

      {/* Routing */}
      <div className="main">
        <BrowserRouter>
          <Switch>
            {/* Default */}
            <Route exact path="/" render={() => <Main toggleModal={toggleModal} />} />
            {/* Sign Up */}
            <Route path="/about" render={() => <About />} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
