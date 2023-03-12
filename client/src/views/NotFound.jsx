import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import notFound from '../img/notFound.png'


const NotFound = () => {
  return (
    <div>
      <div className='text-center'>
        <h1>
          404: Ruta no existente
        </h1>
        <img src={notFound} alt="graphic-notfound" width='700px' />
      </div>
      

    </div>
  )
}

export default NotFound