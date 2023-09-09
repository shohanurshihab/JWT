import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftNav from './LeftNav';

const RegisterForm = ({ history }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
    };
  
    
  
  const handleRegister = () => {const data = {
    name:name,
    email:email,
    passwordHash:password,
    photo:photo
  };
  

// Or from localStorage
const token = localStorage.getItem('token');

const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }
};


  const url = "https://localhost:7189/api/Users";
  axios.post(url,data,config).then((result)=>{
    if(result.status===201){ 
        console.log(data)
        alert("Registration Succesfull");
        navigate("/");
    };
  }).catch((error)=>{
    console.log(data)
    alert(error);})
  };
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
  return (
    <><LeftNav items={items}/>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Register</h2>
      <Form autoComplete='off' encType='multipart/form-data'>
      <Form.Group controlId="photo">
        <Form.Label>Profile Photo</Form.Label>
         <Form.Control
           type="file"
           accept="image/*"
            onChange={handlePhotoChange}
            />
       </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoComplete="off"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" className="w-100" onClick={handleRegister}>
          Register
        </Button>
      </Form></div>
          </div>
        </Col>
      </Row>
      
    </Container>
    </>
  );
};

export default RegisterForm;
