import React from 'react';
import './css/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { CheckLogin } from './components/CheckLogin';
import { Register } from './components/Register';
import { Transport } from './components/Transport';
import { VerifyProfile } from './components/VerifyProfile';
import Company from './components/Company';
import FinancialYear from './components/FinancialYear';

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/transport' element={<VerifyProfile Component={Transport} />} />
          <Route path='/' element={<Company />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<CheckLogin Component={Login} Component2={Transport} />} />
          <Route path='/financialYear' element={<FinancialYear />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App;
