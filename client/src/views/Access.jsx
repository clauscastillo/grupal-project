import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useForm } from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'

const Access = () => {

  const navegar = useNavigate()

  const initialForm = {
    name: '',
    password: '',
  }

  const validationsForm = (form) => {
    let errors = {};
    const {name, password} = form
    
    
    if(!name.trim()){
      errors.name = 'Complete su user'
    }
    if(password.length < 8) {
      errors.password = 'La contraseña debe tener 8 caracteres como minimo'
    }
    if(!password.trim()){
      errors.password = 'Complete su contraseña'
    }
    

    return errors;
  } 

  const {form, errors, loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm, validationsForm, 'access')


  return (
    <div>
      <Header />
      <form className='col w-25 mx-auto' onSubmit={handleSubmit}>
        <h3>Iniciar sesión</h3>
        <div>
          <label htmlFor="name" className='form-label'>User</label>
          <input type="text" name="name" id="name" value={form.name} onChange={handleChange} className='form-control' />
          {
            errors.name && <p className='text-danger'>{errors.name}</p>
          }
        </div>
        <div>
          <label htmlFor="password" className='form-label'>Contraseña</label>
          <input type="password" name="password" id="password" value={form.password} onChange={handleChange} className='form-control'/>
          {
            errors.password && <p className='text-danger'>{errors.password}</p>
          }
        </div>
        <button className='btn btn-primary' type='submit'>Login</button>
        {
          !errors.password && !errors.email && <p className='text-danger'>{response}</p>
        }
        </form>
        <Footer />  
    </div>
  )
}

export default Access