import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar'

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route exact path="/login" element={<Login/>} ></Route>
          <Route exact path="/register" element={<Register/>} ></Route>
        </Routes>
        </Container>
    </Router>
  );
}

export default App;
