import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { AxiosHeaders } from 'axios';
import { Link } from 'react-router-dom';


const Panel = () => {

  const [services, setServices] = useState([])
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [users, setUsers] = useState([])
 

  useEffect(() => {
    axios.get('http://localhost:8000/api/allusers', {withCredentials: true, credentials:'include'})
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err))

    axios.get('http://localhost:8000/api/internal/services', {headers: {...AxiosHeaders, user: user}, withCredentials: true, credentials:'include'})
    .then((res) => setServices(res.data))
    .catch((err) => console.log(err))

  }, [])



  return (
    <div className='w-75 mx-auto'>
      <div>
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
      <hr />
      <div>
        <h2>Clientes</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((u, i) => {
                if(u.admin !== true && u.collaborator == false){
                  return (
                    <tr key={i}>
                      <td>{u.name}</td>
                      {
                      u.business == true ? <td>Empresa</td> : <td>Particular</td>  
                      }
                    </tr>
                  )
                }
                
              })
            }
          </tbody>

        </table>
      </div>
      <div>
        <h2>Funcionarios</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((u, i) => {
                if(u.collaborator == true){
                  return (
                    <tr key={i}>
                      <td>{u.name}</td>
                      {
                      u.business == true ? <td>Empresa</td> : <td>Particular</td>  
                      }
                    </tr>
                  )
                }
                
              })
            }
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default Panel