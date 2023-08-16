import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { login } from "../APIManagers/UserProfileManager";
import "./AnimatedHouse.css"

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

//   var house = "<svg id='house' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 316.945 316.945'>" +
//   "<g fill='#3d0332'>" +
//     "<path class='house' stroke='#3d0332' fill='none' d='M158.465 2.605L4.752 136.858c-4.471 4.221-5.967 10.862-3.715 16.529 2.094 5.26 7.087 8.659 12.727 8.659h25.868V314.34h59.83v-92.464h33.793l.114 92.464h140.143V162.046h29.692c5.559 0 10.53-3.443 12.646-8.762 2.355-5.912.859-13.01-3.971-17.568L158.465 2.605zm93.291 137.685v152.294h-96.658l-.114-92.464H77.706v92.464H61.389V140.29H33.883L158.509 31.443 283.971 140.29h-32.215z'/>" +
//     "<path class='window' stroke='#3d0332' fill='none' d='M235.439 140.29h-70.708v65.269h70.708V140.29zm-21.757 43.512h-27.195v-21.756h27.195v21.756z'/>" +
//   "</g>" +
// "</svg>";
// document.getElementById('house-icon').innerHTML = house;

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