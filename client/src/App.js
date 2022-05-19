import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "./App.css";

import { AuthProvider } from "./context/auth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import NotFound404 from "./pages/NotFound404";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound404 />}></Route>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
