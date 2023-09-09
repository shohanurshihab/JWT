import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftNav from './LeftNav';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const items = [
    {
      href: "/",
      label: "Login",
    },
    {
      href: "/register",
      label: "Register",
    },
  ];
  const navigate = useNavigate();
  const handleLogin = () => {
    const data = {
      email:email,
      password:password
    };
    const url = "https://localhost:7189/api/Auth/login";
    const response = axios.post(url,data).then((result)=>{
      alert(result.data);
      navigate("/dash");
      console.log(result.data)
      localStorage.setItem('id', result.data.res);
      localStorage.setItem('token', result.data.token);
    }).catch((error)=>{
      alert(error);})
  
  };


  return (
    <><LeftNav items={items}/>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>
              <Form>
                <Form.Group controlId="username">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
<br/>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
<br/>
                <Button
                  variant="primary"
                  type="button"
                  className="w-100"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Form>
              
            </div>
          </div>
        </Col>
      </Row>
      
    </Container></>
  );
};

export default LoginPage;
