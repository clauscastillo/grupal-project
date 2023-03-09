import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import Header from '../components/Header'


const Status = () => {

  const navigate = useNavigate()

  const [service, setService] = useState({
    title: '',
    status: '',
    description: '',
    comments: []
  })

  useEffect(() => {
    axios.get('http://localhost:8000/api/service/' + params.id)
    .then((res) => setService(res.data))
  }, [])

  const [display, setDisplay] = useState('display-off');
  const [display1, setDisplay1] = useState('display-on')

  const params = useParams()

  const showEditDescription = () => {
    switch(display) {
      case 'display-off':
        setDisplay('display-on');
        setDisplay1('display-off'); 
        break;
      case 'display-on':
        setDisplay('display-off');
        setDisplay1('display-on');
        break;
    }
    switch(display1) {
      case 'display-off':
        
        break;
      case 'display-on':
        
        break;
    }

  } 

  const handleChange = (e) => {
    const {value} = e.target;
    setService({
      ...service,
      description: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:8000/api/editservice/' + params.id, {key: 'description', description: service.description})
    .then(showEditDescription)
  }
  const changeStatus = (e) => {
    setService({
      ...service,
      status: e.target.value
    })
  }
  const saveStatus = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/editservice/' + params.id, {key: 'status', status: service.status})
    
  }

  return (
    <div>
      <Header />
      <Link to='/inbox'><button className='btn btn-outline-secondary'>Volver a Inbox</button></Link>
      <div className='grid w-50 mx-auto'>
        <h2>{service.client}</h2>
        <h3>{service.title}</h3>
        <h3>Description</h3>
        <p className={display1}>{service.description}</p>
        <form className={display} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className='form-label'>Editar</label>
            <input className='form-control' name='description' value={service.description} onChange={handleChange}/>
          </div>
        <button className='btn btn-success'>Guardar</button>
        </form>
        <button className={display1 + ' btn btn-dark'} onClick={showEditDescription} >Edit</button>
        <h3>Comentarios</h3>
        {
          service.comments.map((comment, index) => {
            return (
              <p key={index}>•{comment}</p>
            )
          })
        }
        <form onSubmit={saveStatus}>
          <select name="" id="" className='form-control' value={service.status} onChange={changeStatus} >
            <option value="Pendiente">Pendiente</option>
            <option value="Presupuestado">Presupuestado</option>
            <option value="Esperando Confirmacion">Esperando confirmacion</option>
            <option value="En curso">En curso</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          <button type='submit'className='btn btn-success'>Guardar</button>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}

export default Status