import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div>
      <Header />
      <div className='bg-i'>
        <div className='rounded p-5 text-light text-center bg-dark w-50 mx-auto my-auto'>
          <h1>Solicite Diagnostico y/o presupuesto</h1>
          <h3>Registrese como empresa/particular</h3>
          <Link to={'/register'}><button className='btn btn-primary mt-5'>Registrarse/ Iniciar Sesión</button></Link>
        </div>
        
      </div>
      <Footer />
    </div>
  )
}

export default Index