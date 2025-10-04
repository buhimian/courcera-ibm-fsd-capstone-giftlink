import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <>
        <Navbar/>
        <Routes>
          {/* Main gifts page */}
          <Route path="/" element={<MainPage />} />
          <Route path="/app" element={<MainPage />} />
          {/* Register and Login routes */}
          <Route path="/app/register" element={<RegisterPage />} />
          <Route path="/app/login" element={<LoginPage />} />
        </Routes>
        </>
  );
}

export default App;
