import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import LeftNav from './LeftNav';

const Dashboard = () => {
    const items = [
        {
          href: "/profile",
          label: "Profile",
        },
        {
            href: "/logout",
            label: "Logout",
        },
      ];
  return (
    <><LeftNav items={items}/>
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Link to="/profile" className="btn btn-primary">
                Go to Profile
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Link to="/users" className="btn btn-primary">
                Go to Users
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <Link to="/products" className="btn btn-primary">
                Go to Product
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container></>
  );
};

export default Dashboard;
