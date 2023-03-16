// import React from 'react';

// import { useForm } from '../hooks/useForm';


// const Register = () => {

//   console.log()

//   const initialForm = {
//     business: "true",
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirm: ''
//   }

//   console.log(initialForm, "initialform")

//   const validationsForm = (form) => {
//     let errors = {};
//     let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
//     let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
//     const {name, email, phone, password, confirm} = form

//     if(!regexName.test(name)) {
//       errors.name = 'Complete su nombre con caracteres validos'
//     }
//     if(!name.trim()) {
//       errors.name = 'Complete su nombre'
//     }
//     if(!regexEmail.test(email)){
//       errors.email = 'Complete un email valido'
//     }
//     if(!email.trim()){
//       errors.email = 'Complete su email'
//     }
//     if(phone.length < 10){
//       errors.phone = 'Favor complete los 10 numeros de su telefono'
//     }
//     if(phone[0] != 0 || phone[1] != 9){
//       errors.phone = 'Su numero tiene que empezar en 09'
//     }
//     if(isNaN(phone)){
//       errors.phone = 'Digite un telefono valido'
//     }
//     if(!phone.trim()){
//       errors.phone = 'Complete su telefono'
//     }
//     if(password.length < 8) {
//       errors.password = 'La contraseña debe tener 8 caracteres como minimo'
//     }
//     if(!password.trim()){
//       errors.password = 'Complete su contraseña'
//     }
//     if(password != confirm){
//       errors.confirm = 'Las contraseñas no coinciden'
//     }


//     return errors
//   }

//   const {form, errors, loading, response, handleChange, handleBlur, handleSubmit, handleOver} = useForm(initialForm, validationsForm, 'register')

//   return (
//       <div className='col px-5'>
//         <form className='row w-75' onSubmit={handleSubmit}>
//           <h3>Register</h3>
//           <div className='col-md-6'>
//             <label htmlFor="" className='form-label'>Soy</label>
//             <select className='form-control' name="business" id="businnes" onChange={handleChange} >
//               <option value='true'>Empresa</option>
//               <option value='false'>Particular</option>
//             </select>
//           </div>
//           <div className='col-md-6'>
//             <label htmlFor="" className='form-label'>Nombre</label>
//             <input value={form.name} type="text" name="name" id="name" onChange={handleChange} className='form-control' onBlur={handleBlur} />
//             {
//               errors.name && <p className='text-danger'>{errors.name}</p>
//             }

//           </div>
//           <div className='col-md-6'> 
//             <label htmlFor="" className='form-label'>Correo</label>
//             <input value={form.email} type="text" name="email" id="email" onChange={handleChange} className='form-control' onBlur={handleBlur}/>
//             <p className='text-danger'>{errors.email}</p>
//           </div>
//           <div className='col-md-6'>
//             <label htmlFor="" className='form-label'>Teléfono</label>
//             <input value={form.phone} type="text" name="phone" id="phone" onChange={handleChange} className='form-control' onBlur={handleBlur}/>
//             {
//               errors.phone && <p className='text-danger'>{errors.phone}</p>
//             }

//           </div>
//           <div>
//             <label htmlFor="" className='form-label'>Contraseña</label>
//             <input value={form.password} type="password" name="password" id="password" onChange={handleChange} className='form-control' onBlur={handleBlur}/>
//             {
//               errors.password && <p className='text-danger'>{errors.password}</p>
//             }

//           </div>
//           <div>
//             <label htmlFor="" className='form-label'>Confirmar Contraseña</label>
//             <input value={form.confirm} type="password" name="confirm" id="confirm" className='form-control' onChange={handleChange} onBlur={handleBlur} />
//             {
//               errors.confirm && <p className='text-danger'>{errors.confirm}</p>
//             }

//           </div>
//           <button id='register' className='btn btn-primary w-25 mx-auto my-3' type='submit' onMouseOver={handleOver} >Registrar</button>
//         </form>
//       </div>
//   )
// }

// export default Register


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Register = () => {
  const initialForm = {
    business: "true",
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: ''
  }

  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(true)
  const [response, setResponse] = useState(null)
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    phone: null
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
    setEmpty(false)
  }


  const navegar = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.loading('Cargando')
    axios.post('http://localhost:8000/api/registeruser', {
      ...form,
      collaborator: false
    }, { withCredentials: true, credentials: 'include' })
      .then((res) => {
        console.log(res)
        setLoading(false);
        setResponse("Creado con exito");
        localStorage.setItem('user', res.data.accessToken);
        // navegar('/home');
        toast.remove()
        toast.success('Usuario Registrado con exito', { duration: 5000 })
      })
      .catch((err) => {
        console.log(err)
        toast.remove()
        setErrors(err.response.data.error)
        setLoading(false);
        toast.error(errors)
      })
  }


  // const handleBlur = (e) => {
  //   handleChange(e);
  //   setErrors(validateForm(form));
  // }
  // const handleOver = (e) => {
  //   if (!empty) {
  //     setErrors(validateForm(form));
  //   }

  // }

  return (
    <div className='col px-5'>
      <form className='row w-75' onSubmit={handleSubmit}>
        <h3>Register</h3>
        <div className='col-md-6'>
          <label htmlFor="" className='form-label'>Soy</label>
          <select className='form-control' name="business" id="businnes" onChange={handleChange} >
            <option value='true'>Empresa</option>
            <option value='false'>Particular</option>
          </select>
        </div>
        <div className='col-md-6'>
          <label htmlFor="" className='form-label'>Nombre</label>
          <input value={form.name} type="text" name="name" id="name" onChange={handleChange} className='form-control' />
          {
            errors.name && <p className='text-danger'>{errors.name}</p>
          }

        </div>
        <div className='col-md-6'>
          <label htmlFor="" className='form-label'>Correo</label>
          <input value={form.email} type="text" name="email" id="email" onChange={handleChange} className='form-control' />
          <p className='text-danger'>{errors.email}</p>
        </div>
        <div className='col-md-6'>
          <label htmlFor="" className='form-label'>Teléfono</label>
          <input value={form.phone} type="text" name="phone" id="phone" onChange={handleChange} className='form-control' />
          {
            errors.phone && <p className='text-danger'>{errors.phone}</p>
          }

        </div>
        <div>
          <label htmlFor="" className='form-label'>Contraseña</label>
          <input value={form.password} type="password" name="password" id="password" onChange={handleChange} className='form-control' />
          {
            errors.password && <p className='text-danger'>{errors.password}</p>
          }

        </div>
        <div>
          <label htmlFor="" className='form-label'>Confirmar Contraseña</label>
          <input value={form.confirm} type="password" name="confirm" id="confirm" className='form-control' onChange={handleChange} />
          {
            errors.confirm && <p className='text-danger'>{errors.confirm}</p>
          }

        </div>
        <button id='register' className='btn btn-primary w-25 mx-auto my-3' type='submit'>Registrar</button>
      </form>
    </div>
  );
}

export default Register