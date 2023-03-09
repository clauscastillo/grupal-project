import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link} from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Service = () => {


  const navigate = useNavigate()

  const [service, setService] = useState({
    title: '',
    status: '',
    description: '',
    comments: []
  })
  const params = useParams()

  useEffect(() => {
  axios.get('http://localhost:8000/api/service/' + params.id)
    .then((res) => setService(res.data))
  })

  const handleDelete = () => {
    axios.delete('http://localhost:8000/api/service/' + params.id)
    .then(navigate('/home'))
  }


  return (
    <div>
      <Header />
      <Link to='/home'><button className='btn btn-outline-secondary'>Volver a Home</button></Link>
      <div className='grid w-50 mx-auto'>
        <h3>{service.title}</h3>
        <h3>Estado</h3>
        <p>{service.status}</p>
        <h3>Descripcion</h3>
        <p>{service.description}</p>
        <h3>Comentarios</h3>
        {
          service.comments.map((comment, index) => {
            return (
              <p key={index}>•{comment}</p>
            )
          })
        }
        <button className='btn btn-danger' onClick={handleDelete}>Delete Service</button>
      </div>
      
      <Footer />
    </div>
  )
}

export default Service