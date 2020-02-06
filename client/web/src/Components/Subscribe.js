import React from 'react';
import {ModalBody, Form, FormGroup, Label, Input, Button} from 'reactstrap';

class Subscribe extends React.Component {
  submit = () => {
    // validate form
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const form = document.getElementById('subscribeForm');
    const button = document.getElementById('submit');
    const emptyFieldErrorId = 'emptyFieldError';
    const emptyFieldError = document.getElementById(emptyFieldErrorId);
    const invalidEmailId = 'invalidEmail';
    const invalidEmail = document.getElementById(invalidEmailId);
    if (!firstName || !lastName || !email) {
      // remove other error if necessary
      if (invalidEmail && this.validateEmail(email)) {
        form.removeChild(invalidEmail);
      }
      if (!emptyFieldError) {
        const error = document.createElement('p');
        error.textContent = 'Please fill in all fields';
        error.id = emptyFieldErrorId;
        form.insertBefore(error, button);
      }
    } else if (!this.validateEmail(email)) {
      // first remove other error if necessary
      if (emptyFieldError && firstName && lastName && email) {
        form.removeChild(emptyFieldError);
      }
      // then append new validation error
      if (!invalidEmail) {
        const error = document.createElement('p');
        error.textContent = 'Please provide a valid email address';
        error.id = 'invalidEmail';
        form.insertBefore(error, button);
      }
    } else {
      // conditionally set the URL depending on env
      let url = '';
      if (process.env.NODE_ENV === 'development') {
        url += 'http://localhost:34567'
      }
      url += '/.netlify/functions/subscribe';
      // execute function that submits to the MailChimp API
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName
        })
      }).then(res => {
        console.log(res);
        this.props.toggleModal();
      }).catch(err => {
        console.error(err);
        // TODO: Append an error message to the DOM
      });
    }
  }
  validateEmail = email => {
    const emailRegex = /^[^@]+@[^@]+\.[a-z]+$/i;
    return emailRegex.test(email);
  }
  componentDidMount() {
    const form = document.getElementById('subscribeForm');
    // handle case when enter key is pressed to submit form
    form.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.submit();
      }
    });
  }
  render() {
    return (
      <ModalBody>
        <Form id="subscribeForm">
          <FormGroup>
            <Label>First name</Label>
            <Input type="text" id="firstName" />
            <Label>Last name</Label>
            <Input type="text" id="lastName" />
            <Label>Email address</Label>
            <Input type="text" id="email" />
          </FormGroup>
          <Button id="submit" onClick={this.submit} color="success">Submit</Button>
        </Form>
      </ModalBody>
    );
  }
}

export default Subscribe;