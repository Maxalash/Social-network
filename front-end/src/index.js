import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'
import { BrowserRouter,
  Routes,
  Route, 
} from 'react-router-dom';
import Login from "./Login"
import Register from "./Register"



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
    document.getElementById('root')
  );