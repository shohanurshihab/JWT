import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profie';
import Dash from "./components/Dash";
import Products from "./components/Products";
import Users from "./components/Users";
import Logout from './components/Logout';

function App() {


  return (

    <div className="#">
      <Router>
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/users' element={<Users />} />
          <Route path='/dash' element={<Dash />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<Products/>} />
          <Route path='/' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
