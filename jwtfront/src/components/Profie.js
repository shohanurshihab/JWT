import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios"; // Import Axios
import LeftNav from "./LeftNav";

import { useNavigate } from "react-router-dom";
const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const uid = localStorage.getItem('id');
  console.log(uid)
  const data = {
    id:id,
    name:name,
    email:email,
    passwordHash:passwordHash}
  const items = [
    {
      href: "/dash",
      label: "Dashboad",
    },
    {
      href: "/profile",
      label: "Profile",
    },
    {
      href: "/logout",
      label: "Logout",
    },
  ];
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  useEffect(() => {
    // Fetch user profile data from the API
    axios.get(`https://localhost:7189/api/Users/${uid}`,config) // Replace with your API endpoint
      .then((response) => {
        const userData = response.data;
        console.log(response.data)
        // Update the state variables with the fetched data
        setId(userData.id);
        setUsername(userData.name);
        setEmail(userData.email);
        setPassword(userData.passwordHash)
        // Set loading to false once data is fetched
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    const token = localStorage.getItem('token');

    const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
    };
    const url = `https://localhost:7189/api/Users/${uid}`;
    axios.put(url,data,config).then((result)=>{
        if(result.status===201){
            alert("Update Succesfull");
        };
    }).catch((error)=>{
        alert(error);})
    

    if (errors.length === 0) {
      // Redirect to the home page
      window.location.href = "/";
    }
  };

  if (loading) {
    // You can render a loading indicator here while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
    <LeftNav items={items}/>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Update</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.includes("Username is required") && (
                      <Alert variant="danger">Username is required</Alert>
                    )}
                  </Form.Group>
                  <br></br>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.includes("Email is required") && (
                      <Alert variant="danger">Email is required</Alert>
                    )}
                    {errors.includes("Invalid email address") && (
                      <Alert variant="danger">Invalid email address</Alert>
                    )}
                  </Form.Group>
                  <br></br>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      value={passwordHash}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.includes("Password is required") && (
                      <Alert variant="danger">Password is required</Alert>
                    )}
                  </Form.Group>
                  <br></br>
                  <Button type="submit">Update Profile</Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileUpdatePage;
