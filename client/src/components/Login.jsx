import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])

  const navegar = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios.post('http://localhost:8000/api/login', 
      {email,password}, 
      { withCredentials: true, credentials: 'include' })
        .then((res) => {
          setLoading(false);
          console.log(res, 
            "BUSCO COOKIE")
          setResponse("Inicio de sesion exitoso")
          localStorage.setItem('user', res.data.accesToken)
          console.log(res.data.accesToken)
          navegar('/home')
          toast.remove()
          toast('Bienvenido de nuevo', { duration: 5000, icon: '🙌' })
        })
        .catch((err) => {
          toast.remove();
          console.log(err);
          setLoading(false);
          setResponse("Fallido")
          setErrors(err.response.data.error)
          toast.error(errors)
          // toast.error('Correo y/o contraseña incorrrectos')
        })
    } else {
      toast.remove();
      toast.error('Introduzca todos los datos correctamente')
    }
  };

  return (
    <div className='col px-5'>
      <form className='col w-75' onSubmit={handleSubmit}>
        <h3>Iniciar sesión</h3>
        <div>
          <label className='form-label'>Correo</label>
          <input type="text" name="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
          {
            errors.email && <p className='text-danger'>{errors.email}</p>
          }
        </div>
        <div>
          <label className='form-label'>Contraseña</label>
          <input type="password" name="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
          {
            errors.password && <p className='text-danger'>{errors.password}</p>
          }
        </div>
        <button className='btn btn-primary' type='submit'>Login</button>
      </form>
    </div>

  );
}

export default Login