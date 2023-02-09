import React from 'react';
import {Route, Routes} from 'react-router-dom'
import LoginForm from './Login';
import Home from './Home';
import RegistrationForm
 from './Register';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/register' element={<RegistrationForm/>}/>
    </Routes>

  )
}

export default App;
