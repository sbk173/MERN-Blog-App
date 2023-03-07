import React from 'react';
import {Route, Routes} from 'react-router-dom'
import LoginForm from './Login';
import Home from './Home';
import RegistrationForm from './Register';
import FileUpload from './FileUpload';
import Card from './Card'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/register' element={<RegistrationForm/>}/>
      <Route path='/upload' element={<FileUpload/>}/>
      <Route path='/test' element={<Card thumbnail='conductance.png' articlename='lol' creator='halp'/>}/>
    </Routes>

  )
}

export default App;
