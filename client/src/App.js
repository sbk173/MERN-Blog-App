import React from 'react';
import {Route, Routes} from 'react-router-dom'
import LoginForm from './Login';
import Home from './Home';
import RegistrationForm from './Register';
import FileUpload from './FileUpload';
import ApprovalPage from './ApprovalPage';
import ViewPdf from './ViewPdf';
import Navbar from './Navbar';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/register' element={<RegistrationForm/>}/>
      <Route path='/upload' element={<FileUpload/>}/>
      <Route path='/test' element={<Navbar/>}/>
      <Route path='/view/article/' element={<ViewPdf/>}/>
    </Routes>

  )
}

export default App;
