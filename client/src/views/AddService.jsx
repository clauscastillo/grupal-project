import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { AxiosHeaders } from 'axios'
import { useForm } from '../hooks/useForm'
import toast, {Toaster} from 'react-hot-toast';


const AddService = () => {
  const user = localStorage.getItem('user')
  const fecha = new Date().toLocaleDateString()

  const initialForm = {
    title: '',
    description: '',
    comments: '',
    idClient: 0,
    client: '',
    date: fecha,
    status: 'Pendiente'
  }

  const validationsForm = (form) => {
    let errors = {}
    const {title, description, comments} = form
    const regexTitle = /^.{1,20}$/;
    const regexDescription = /^.{1,50}$/;
    const regexComments = /^.{1,50}$/;

    if(!regexTitle.test(title)){
      errors.title = 'El titulo no puede ser mayor a 20 caracteres'
    }
    if(title == ''){
      errors.title = 'Complete el titulo'
    }
    if(!regexDescription.test(description)){
      errors.description = 'La descripción no puede ser mayor a 50 caracteres'
    }
    if(description == ''){
      errors.description = 'Complete la descripción'
    }
    if(!regexComments.test(description)){
      errors.comments = 'El comentario no puede ser mayor a 50 caracteres'
    }
    if(comments == ''){
      errors.comments= 'Agregue un comentario'
    }

    return errors;
  }

  const {form, setForm, errors, loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm, validationsForm, 'addservice');


  useEffect(() => {
    axios.get('http://localhost:8000/api/user', {headers: {...AxiosHeaders, user: user}})
    .then((res) => {
      if(form.idClient !== res.data._id) {
        setForm({
          ...form,
          client: res.data.name,
          idClient: res.data._id
        })
      }
  })
  }, [])

  
  const navigate = useNavigate()

  

  
  
  


  return (
    <div>
      <Toaster />
      <Header />
      <Link to='/home'></Link>
      <h2 className='text-center'>Solicitud de servicio</h2>
      <form className='grid w-25 text-center mx-auto' onSubmit={handleSubmit}>
    
          <label htmlFor="title" className='form-label'>Titulo</label>
          <input type="text" name="title" id="title" value={form.title} onChange={handleChange} className='form-control'/>
          {
            errors.title && <p className='text-danger'>{errors.title}</p>
          }
          <label htmlFor="description" className='form-label'>Descripción</label>
          <input type="text" name="description" id="description" value={form.description} onChange={handleChange} className='form-control'/>
          {
            errors.description && <p className='text-danger'>{errors.description}</p>
          }
          <label htmlFor="comments" className='form-label'>Comentarios</label>
          <input type="text" name="comments" id="comments" value={form.comments} onChange={handleChange} className='form-control'/>
          {
            errors.comments && <p className='text-danger'>{errors.comments}</p>
          }
          <button type="submit" className='btn btn-primary mt-3'>Enviar solicitud</button>

        
      </form>
      <Footer />
    </div>
  )
}

export default AddService