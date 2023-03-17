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
  const [nameErr, setNameErr] = useState([])
  const [mailErr, setMailErr] = useState([])
  const [telErr, setTelErr] = useState([])
  const [passErr, setPassErr] = useState([])


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
        setNameErr(err.response.data.errors.name.message)
        setMailErr(err.response.data.errors.email.message)
        setTelErr(err.response.data.errors.phone.message)
        setPassErr(err.response.data.errors.password.message)
        setLoading(false);
        // toast.error(errors)
      })
  }

  console.log(nameErr)
  console.log(passErr)



  // const handleBlur = (e) => {
  //   handleChange(e);
  //   setErrors(validateForm(form));
  // }
  // const handleOver = (e) => {
  //   if (!empty) {
  //     setErrors(validateForm(form));
  //   }

  // }

  // {
  //   errors.name && <p className='text-danger'>{errors.name}</p>
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
        </div>
        {
          <p className='text-danger'>{nameErr}</p>
        }
        <div className='col-md-6'>
          <label htmlFor="" className='form-label'>Correo</label>
          <input value={form.email} type="text" name="email" id="email" onChange={handleChange} className='form-control' />
        </div>
        {<p className='text-danger'>{mailErr}</p>}
        <div className='col-md-6'>
          <label htmlFor="" className='form-label'>Teléfono</label>
          <input value={form.phone} type="text" name="phone" id="phone" onChange={handleChange} className='form-control' />
        </div>
        {<p className='text-danger'>{telErr}</p>}
        <div>
          <label htmlFor="" className='form-label'>Contraseña</label>
          <input value={form.password} type="password" name="password" id="password" onChange={handleChange} className='form-control' />
        </div>
        {<p className='text-danger'>{passErr}</p>}
        <div>
          <label htmlFor="" className='form-label'>Confirmar Contraseña</label>
          <input value={form.confirm} type="password" name="confirm" id="confirm" className='form-control' onChange={handleChange} />
        </div>
        {form.password !== form.confirm ? <p className='text-danger'>passwords deben ser iguales</p> : null}
        <button id='register' className='btn btn-primary w-25 mx-auto my-3' type='submit'>Registrar</button>
      </form>
    </div>
  );
}

export default Register