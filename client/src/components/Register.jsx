import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import toast, {Toaster} from 'react-hot-toast';

const Register = () => {

  const initialForm = {
    business: "true",
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: ''

  }

  const validationsForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    const {name, email, phone, password, confirm} = form
    
    if(!regexName.test(name)) {
      errors.name = 'Complete su nombre con caracteres validos'
    }
    if(!name.trim()) {
      errors.name = 'Complete su nombre'
    }
    if(!regexEmail.test(email)){
      errors.email = 'Complete un email valido'
    }
    if(!email.trim()){
      errors.email = 'Complete su email'
    }
    if(phone.length < 10){
      errors.phone = 'Favor complete los 10 numeros de su telefono'
    }
    if(phone[0] != 0 || phone[1] != 9){
      errors.phone = 'Su numero tiene que empezar en 09'
    }
    if(isNaN(phone)){
      errors.phone = 'Digite un telefono valido'
    }
    if(!phone.trim()){
      errors.phone = 'Complete su telefono'
    }
    if(password.length < 8) {
      errors.password = 'La contraseña debe tener 8 caracteres como minimo'
    }
    if(!password.trim()){
      errors.password = 'Complete su contraseña'
    }
    if(password != confirm){
      errors.confirm = 'Las contraseñas no coinciden'
    }
    

    return errors
  }

  const {form, errors, loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm, validationsForm, 'register')

  return (
      <div className='col px-5'>
        <Toaster />
        <form className='row w-75' onSubmit={handleSubmit}>
          <h3>Register</h3>
          <div className='col-md-6'>
            <label htmlFor="" className='form-label'>Soy</label>
            <select className='form-control' name="business" id="businnes" onChange={handleChange}>
              <option value='true'>Empresa</option>
              <option value='false'>Particular</option>
            </select>
          </div>
          <div className='col-md-6'>
            <label htmlFor="" className='form-label'>Nombre</label>
            <input value={form.name} type="text" name="name" id="name" onChange={handleChange} className='form-control' onBlur={handleBlur} />
            {
              errors.name && <p className='text-danger'>{errors.name}</p>
            }
            
          </div>
          <div className='col-md-6'> 
            <label htmlFor="" className='form-label'>Correo</label>
            <input value={form.email} type="text" name="email" id="email" onChange={handleChange} className='form-control' onBlur={handleBlur}/>
            <p className='text-danger'>{errors.email}</p>
          </div>
          <div className='col-md-6'>
            <label htmlFor="" className='form-label'>Teléfono</label>
            <input value={form.phone} type="text" name="phone" id="phone" onChange={handleChange} className='form-control' onBlur={handleBlur}/>
            {
              errors.phone && <p className='text-danger'>{errors.phone}</p>
            }
            
          </div>
          <div>
            <label htmlFor="" className='form-label'>Contraseña</label>
            <input value={form.password} type="password" name="password" id="password" onChange={handleChange} className='form-control' onBlur={handleBlur}/>
            {
              errors.password && <p className='text-danger'>{errors.password}</p>
            }
            
          </div>
          <div>
            <label htmlFor="" className='form-label'>Confirmar Contraseña</label>
            <input value={form.confirm} type="password" name="confirm" id="confirm" className='form-control' onChange={handleChange} onBlur={handleBlur}/>
            {
              errors.confirm && <p className='text-danger'>{errors.confirm}</p>
            }
            
          </div>
          <button id='register' className='btn btn-primary w-25 mx-auto my-3' type='submit' >Registrar</button>
        </form>
      </div>
  )
}

export default Register