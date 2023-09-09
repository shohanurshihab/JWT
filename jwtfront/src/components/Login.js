import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftNav from './LeftNav';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
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

    axios.post(url, data)
      .then((result) => {
        const message = result.data;
        setModalMessage(message.token);
        setShowModal(true);
        localStorage.setItem('id', result.data.res);
        localStorage.setItem('token', result.data.token);
    
        // Automatically close the modal after 5 seconds and navigate
        setTimeout(() => {
          setShowModal(false);
          navigate("/dash");
        }, 5000);
      })
      .catch((error) => {
        alert(error);
      });
    
  
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  

  return (
    <><LeftNav items={items}/>
    
  <Modal show={showModal} onHide={handleCloseModal} centered>
    <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <b>JWT:</b>
    <textarea
      style={{ width: '100%', height: '300px' }}
      value={modalMessage}
      readOnly
    />
    </Modal.Body>
    {/* You can customize the modal appearance as needed */}
  </Modal>

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
