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
import { AuthRoute, ProtectedRoute } from "./util/AuthRoute";
import AddPost from "./pages/AddPost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/" element={<AuthRoute />}>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Route>
            <Route
              path="addpost"
              element={
                <ProtectedRoute>
                  <AddPost />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound404 />}></Route>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
