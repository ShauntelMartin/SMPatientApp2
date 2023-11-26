import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import UpdatePatient from './components/updatePatient';
import CreatePatient from './components/createPatient';
import ViewPatient from './components/viewPatients';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Navbar><Home/></Navbar>} />
        <Route path='/updatePatient' element={<Navbar><UpdatePatient/></Navbar>} />
        <Route path='/createPatient' element={<Navbar><CreatePatient/></Navbar>} />
        <Route path='/viewPatient' element={<Navbar><ViewPatient/></Navbar>} />
      </Routes>
    </BrowserRouter>
  );
  }
export default App;


