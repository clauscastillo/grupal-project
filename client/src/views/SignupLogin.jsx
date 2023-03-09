import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Login from '../components/Login'
import Register from '../components/Register'

const SignupLogin = () => {
  return (
    <div>
      <Header />
      <div className='row g-12'>
        <Register />
        <Login />
      </div>
      
      <Footer />
    </div>
  )
}

export default SignupLogin