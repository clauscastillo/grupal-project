import React from 'react'
import { useForm } from '../hooks/useForm'

const Login = () => {

  const initialForm = {
    email: '',
    password: '',
  }

  const validationsForm = (form) => {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    const {email, password} = form
    
    if(!regexEmail.test(email)){
      errors.email = 'Complete un email valido'
    }
    if(!email.trim()){
      errors.email = 'Complete su email'
    }
    if(password.length < 8) {
      errors.password = 'La contraseña debe tener 8 caracteres como minimo'
    }
    if(!password.trim()){
      errors.password = 'Complete su contraseña'
    }
    

    return errors
  } 

  const {form, errors, loading, response, handleChange, handleBlur, handleSubmit, handleOver} = useForm(initialForm, validationsForm, 'login')

  return (
    <div className='col px-5'>
      <form className='col w-75' onSubmit={handleSubmit}>
        <h3>Iniciar sesión</h3>
        <div>
          <label className='form-label'>Correo</label>
          <input type="text" name="email" className='form-control' value={form.email} onChange={handleChange} onBlur={handleBlur}/>
          {
            errors.email && <p className='text-danger'>{errors.email}</p>
          }
        </div>
        <div>
          <label className='form-label'>Contraseña</label>
          <input type="password" name="password" className='form-control' value={form.password} onChange={handleChange} onBlur={handleBlur}/>
          {
            errors.password && <p className='text-danger'>{errors.password}</p>
          }
        </div>
        <button className='btn btn-primary' type='submit' onMouseOver={handleOver}>Login</button>  
      </form>
    </div>
      
  )
}

export default Login