import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button, Card, Form } from 'react-bootstrap';
import LeftNav from "./LeftNav";
import Image from './Image';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [updateUserData, setUpdateUserData] = useState({
    id: null,
    name: '',
    email: '',
    passwordHash: '',
    photo: '',
  });
  
  const token = localStorage.getItem('token');
  const loggedid = localStorage.getItem('id');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }}
  const [newUserData, setnewUserData] = useState({
    name: '',
    email: '',
    passwordHash: '',
    photo: '',
  });
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
  
  useEffect(() => {
    // Fetch user data from your API
    axios.get('https://localhost:7189/api/Users',config)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
    setUpdateUserData({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash, // You can choose to pre-fill this field or not
      photo: user.photo, // You can choose to pre-fill this field or not
    });
  };

  const handleDeleteClick = (user) => {
    setShowDeleteModal(true);
    setSelectedUser(user);
  };
  const handleCreateClick = () => {
    setShowCreateModal(true);
    
  };
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };
  const handleUpdate1 = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", updateUserData.id);
    formData.append("name", updateUserData.name);
    formData.append("email", updateUserData.email);
    formData.append("passwordHash", updateUserData.passwordHash);
    formData.append("photo", updateUserData.photo);

    axios
      .put(`https://localhost:7189/api/Users/${updateUserData.id}`, formData, config)
      .then((result) => {
        if (result.status === 204) {
          window.location.reload();
          setShowUpdateModal(false);

        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleUpdate = () => {
    // Send a PUT request to update the user's information
    axios.put(`https://localhost:7189/api/Users/${updateUserData.id}`, updateUserData,config)
      .then((response) => {
        window.location.reload();
        // Close the modal
        setShowUpdateModal(false);
        // Refresh user data
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        // Handle the error here
      });
  };
  const handleCreate = () => {
    // Send a PUT request to update the user's information
    console.log(newUserData);
    axios.post(`https://localhost:7189/api/Users`, newUserData,config)
      .then((response) => {
        window.location.reload();
        // Handle the successful creation
        console.log('User created successfully:', response.data);
        // Close the modal
        setShowCreateModal(false);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        // Handle the error here
      });
  };

  const handleDelete = () => {
    // Check if there's a selected user
    if (selectedUser) {
      // Send a DELETE request to delete the selected user
      axios.delete(`https://localhost:7189/api/Users/${selectedUser.id}`,config)
        .then((response) => {
          // Handle the successful deletion
          console.log('User deleted successfully:', response.data);
          // Close the modal
          setShowDeleteModal(false);
          // Refresh user data
          axios.get('https://localhost:7189/api/Users',config)
            .then((response) => {
              setUsers(response.data);
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
            });
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          // Handle the error here
        });
    }
    else(console.log("not true"))
  };
  

  const renderUserCards = () => {
    const filteredUsers = users.filter((user) => user.id != loggedid);
  
    if (filteredUsers.length > 0) {
      return filteredUsers.map((user) => (
        <div key={user.id} className="col-md-4 mb-3">
          <Card>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Button variant="primary" onClick={() => handleUserClick(user)}>
                Update
              </Button>
              &nbsp;
              &nbsp;
              <Button variant="danger" onClick={() => handleDeleteClick(user)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      ));
    } else {
      return "No data";
    }
  };
  
  

  return (
    <>
    <LeftNav items={items}/>
    <br/>
    <div className="container user-management-page">
         <Button variant="primary" onClick={handleCreateClick}>Add User</Button>
         <br/>
         <br/>
      <div className="row user-list">
        {renderUserCards()}
      </div>
{/* Create New User Modal */}
<Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form autoComplete='off' encType='multipart/form-data'>
        <Form.Group controlId="photo">
        <Form.Label>Profile Photo</Form.Label>
         <Form.Control
           type="file"
           accept="image/*"
            onChange={(e) => setnewUserData({ ...newUserData, photo: e.target.files[0] })}
            />
            </Form.Group>
            <Form.Group controlId="newName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newUserData.name}
                onChange={(e) => setnewUserData({ ...newUserData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="newEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUserData.email}
                onChange={(e) => setnewUserData({ ...newUserData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter password"
                value={newUserData.passwordHash}
                onChange={(e) => setnewUserData({ ...newUserData, passwordHash: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {/* User Update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
            {updateUserData.photo && <Image imageData={updateUserData.photo} />}
            <br/>
            <Form.Group controlId="photo">
        <Form.Label>Profile Photo</Form.Label>
         <Form.Control
           type="file"
           accept="image/*"
            onChange={(e) => setUpdateUserData({ ...updateUserData, photo: e.target.files[0] })}
            />
            </Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={updateUserData.name}
                onChange={(e) => setUpdateUserData({ ...updateUserData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={updateUserData.email}
                onChange={(e) => setUpdateUserData({ ...updateUserData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter password"
                value={updateUserData.passwordHash}
                onChange={(e) => setUpdateUserData({ ...updateUserData, passwordHash: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* User Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Users;
