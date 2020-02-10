import React from 'react';
import {ModalBody, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';

class Subscribe extends React.Component {
  submit = () => {
    // validate form
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const formId = 'subscribeForm';
    const buttonId = 'submit';
    const emptyFieldErrorId = 'emptyFieldError';
    const invalidEmailId = 'invalidEmail';
    const alreadySubscribedId = 'alreadySubscribed';
    const genericErrorId = 'genericError';
    const errors = [emptyFieldErrorId, invalidEmailId, alreadySubscribedId, genericErrorId];
    const genericError = 'Something went wrong! Please try again.';
    if (!firstName || !lastName || !email) {
      // remove other error if necessary
      if (this.props.validateEmail(email)) {
        this.removeElement(invalidEmailId, formId);
      }
      this.renderError(emptyFieldErrorId, 'Please fill in all fields', formId, buttonId);
    } else if (!this.props.validateEmail(email)) {
      // first remove other error if necessary
      if (firstName && lastName && email) {
        this.removeElement(emptyFieldErrorId, formId);
      }
      // then append new validation error
      this.renderError(invalidEmailId, 'Please provide a valid email address', formId, buttonId);
    } else {
      // conditionally set the URL depending on env
      let url = '';
      if (process.env.NODE_ENV === 'development') {
        url += 'http://localhost:5000/transunited/us-central1';
      } else {
        url += 'https://us-central1-transunited.cloudfunctions.net';
      }
      url += '/subscribe';
      // execute function that submits to the MailChimp API
      axios.post(url, JSON.stringify({
        email,
        firstName,
        lastName
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        // remove existing errors
        this.removeErrors(errors, formId);
        // log response to the console if this is dev
        if (process.env.NODE_ENV === 'development') {
          console.log(res);
        }
        if (res.data.statusCode === 409) {
          // append an error indicating the email has already been subscribed
          this.renderError(alreadySubscribedId, 'Email address already subscribed!', formId, buttonId);
        } else if (res.data.statusCode === 200) {
          // close modal if request was successful
          this.props.toggleModal();
        } else {
          // append a generic error
          this.renderError(genericErrorId, genericError, formId, buttonId);
        }
      }).catch(err => {
        // remove existing errors
        this.removeErrors(errors, formId);
        // append a generic error
        this.renderError(genericErrorId, genericError, formId, buttonId);
        console.error(err);
      });
    }
  }
  
  /**
   * Renders an error to the DOM
   *
   * @param {*} id - The ID attribute for the error element.
   * @param {*} text - The text representing the error.
   * @param {*} insertIntoId - The ID of the parent element the error should be appended to.
   * @param {*} insertBeforeId - The ID of the element the error should be inserted before.
   * @returns the error element
   */
  renderError = (id, text, insertIntoId, insertBeforeId) => {
    const existingError = document.getElementById(id);
    const insertInto = document.getElementById(insertIntoId);
    const insertBefore = document.getElementById(insertBeforeId);
    if (!existingError) {
      const error = document.createElement('p');
      error.id = id;
      error.textContent = text;
      insertInto.insertBefore(error, insertBefore);
      return error;
    } else {
      return existingError;
    }
  }

  /**
   * Removes a given set of IDs from an element
   *
   * @param {array} errorIds
   * @param {string} formId
   */
  removeErrors = (errorIds, formId) => {
    errorIds.forEach(id => {
      this.removeElement(id, formId);
    });
  }

  /**
   * Removes an element from the DOM if it exists
   *
   * @param {*} id - The ID of the element to be removed.
   * @param {*} parentId - The ID of the parent element.
   */
  removeElement = (id, parentId) => {
    const element = document.getElementById(id);
    const parent = document.getElementById(parentId);
    if (element) {
      parent.removeChild(element);
    }
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