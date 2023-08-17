import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { login } from "../APIManagers/UserProfileManager";

//This login page was provided to us. I added some of my own styling to it.
export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <Container className="login-page">
      <Form onSubmit={loginSubmit}>
      <h1 style={{paddingTop: "15%"}}>Property Manager Login</h1>
          <fieldset>
            <FormGroup>
              <Label for="email">Email Address</Label>
              <Input id="email" type="text" style={{maxWidth: "500px"}} onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input id="password" type="password" style={{maxWidth: "500px"}} onChange={e => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Button variant="primary">Login</Button>
            </FormGroup>
            {/* <em>
              Not registered? <Link to="/register">Register</Link>
            </em> */}
          </fieldset>
      </Form>
      <div id="house-icon"></div>
    </Container>
  );
}