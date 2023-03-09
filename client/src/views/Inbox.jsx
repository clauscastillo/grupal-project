import React from 'react'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AxiosHeaders } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import NotFound from './NotFound'
import Loading from '../components/Loading'

const Inbox = () => {

  const [services, setServices] = useState([])
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8000/api/internal/services', {headers: {...AxiosHeaders, user: user}})
    .then((res) => {
      setServices(res.data)
      setLoading(true);
    })
    .catch(() => {
      setUser(null)
      setLoading(true);

    })
  })

  const handleLogout = () => {
    localStorage.removeItem('user')
    navegar('/access')
  }

  const navegar = useNavigate()

  if (!loading) {
    return (
      <Loading />
    )
  }else {
    if(user == null) {
      return(
        <NotFound />
      )
    }else {
      return (
        <div>
          <Header />
          <button className='btn btn-secondary m-2' onClick={handleLogout}>Logout</button>
          <div className='w-75 mx-auto'>
            <h2>Servicios pendientes de respuesta</h2>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Empresa/Particular</th>
                  <th>Titulo</th>
                </tr>
              </thead>
              <tbody>
                {
                  services.map((service, index) => {
                    return (
                      <tr key={index}>
                        <td>{service.date}</td>
                        <td><Link to={'/status/' + service._id}>{service.client}</Link></td>
                        <td>{service.title}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <h2>Servicios en tramite</h2>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Empresa/Particular</th>
                  <th>Titulo</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
          
          <Footer />
        </div>
      )
    }

    
  }
  
}

export default Inbox