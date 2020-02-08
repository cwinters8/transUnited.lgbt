import React, { useState } from 'react';
import './App.css';
import {Navbar, NavbarBrand, Modal, ModalHeader, Button} from 'reactstrap';

import Subscribe from './Components/Subscribe';

const App = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  return (
    <div className="App">
      <Navbar expand="md">
        <NavbarBrand href="/"><strong>transUnited Alpha</strong></NavbarBrand>
      </Navbar>
      <div className="main">
        <p>After some frustration with existing social media platforms, we are building a new social media app for transgender people and our allies. Our goal is to create a trans friendly space where we can safely share our lives and educate each other.</p>
        <p>Want to contribute to the project? Head on over to the <a target="_blank" rel="noopener noreferrer" href="https://github.com/cwinters8/transUnited.lgbt">transUnited Github repository</a>.</p>
        <p>Want to stay up to date on our progress and be alerted when we launch?</p>
        <Button onClick={toggleModal} color="primary">Subscribe here!</Button>
      </div>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggleModal}>Subscribe</ModalHeader>
        <Subscribe toggleModal={toggleModal} />
      </Modal>
    </div>
  );
}

export default App;
