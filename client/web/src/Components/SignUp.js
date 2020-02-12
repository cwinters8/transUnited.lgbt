import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import aes from 'crypto-js/aes';

class SignUp extends React.Component {
  state = {
    showCustomPronounField: false,
    isValidEmail: true,
    firstName: null,
    lastName: null,
    pronouns: null,
    email: null,
    password: null,
    dob: null
  };
  pronouns = [
    'they/them/theirs',
    'she/her/hers',
    'he/him/his',
    'ze/zir/zirs',
    'xe/xem/xyrs',
    'custom'
  ];
  processPronouns = event => {
    this.setState({pronouns: event.target.value});
    if (event.target.value === 'custom') {
      this.setState({showCustomPronounField: true});
    } else {
      this.setState({showCustomPronounField: false});
    }
  }
  processEmail = event => {
    if (this.props.validateEmail(event.target.value)) {
      this.setState({
        email: event.target.value,
        isValidEmail: true
      });
    } else {
      this.setState({isValidEmail: false});
    }
  }
  processPassword = event => {
    // TODO: enforce some password complexity
    const encrypted = aes.encrypt(event.target.value, process.env.REACT_APP_SECRET_KEY).toString();
    this.setState({password: encrypted});
  }
  // TODO: processDob function to validate user is 18+
  CustomPronouns = () => {
    if (this.state.showCustomPronounField) {
      return (
        <FormGroup id="customPronouns">
          <Input required type="text" placeholder="Add pronouns here" />
        </FormGroup>
      );
    } else {
      return null;
    }
  }

  InvalidEmail = () => {
    if (!this.state.isValidEmail) {
      return (
        <p className="error">Please provide a valid email address</p>
      );
    } else {
      return null;
    }
  }

  submit = event => {
    event.preventDefault();
    this.props.firebase.auth().createUserWithEmailAndPassword(
      this.state.email, 
      aes.decrypt(this.state.password, process.env.REACT_APP_SECRET_KEY).toString()
    ).then(data => {
      console.log("Successfully created a user! Here's some output:");
      console.log(data.user.uid);
    }).catch(err => {
      console.log(`Error: ${err}`);
    });
  }

  render() {
    return (
      <Form id="signUpForm" onSubmit={this.submit}>
        <FormGroup className="signUpFormGroup">
          <Label>First name</Label>
          <Input required type="text" onChange={event => this.setState({firstName: event.target.value})} />
          <Label>Last name</Label>
          <Input required type="text" onChange={event => this.setState({lastName: event.target.value})} />
          <Label>Pronouns</Label>
          <Input required type="select" onChange={this.processPronouns}>
            {this.pronouns.map((item, index) => <option key={index}>{item}</option>)}
          </Input>
          <this.CustomPronouns />
          <Label>Email</Label>
          <Input required type="email" autoComplete="email" onChange={this.processEmail} />
          <this.InvalidEmail />
          <Label>Password</Label>
          <Input required type="password" autoComplete="current-password" onChange={this.processPassword} />
          <Label>Date of birth</Label>
          <Input required type="date" onChange={event => this.setState({dob: event.target.value})}  />
        </FormGroup>
        <Button type="submit" color="primary">Submit</Button>
      </Form>
    )
  }
}

export default SignUp;