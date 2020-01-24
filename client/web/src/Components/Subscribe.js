import React from 'react';
import {ModalBody, Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Subscribe = props => {
  const submit = () => {
    // execute function that submits to the MailChimp API
    props.toggleModal();
  }
  return (
    <ModalBody>
      <Form>
        <FormGroup>
          <Label>Email address</Label>
          <Input type="text" />
        </FormGroup>
        <Button onClick={submit} color="success">Submit</Button>
      </Form>
    </ModalBody>
  );
}

export default Subscribe;