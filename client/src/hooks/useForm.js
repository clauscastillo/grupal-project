import { useState } from 'react'
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useForm = (initialForm, validateForm, origin) => {

  const navegar = useNavigate()


  const [form, setForm] =  useState(initialForm);
  const [empty, setEmpty] = useState(true)
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null)


  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    })
    setEmpty(false)
  }

  const handleOver = (e) => {
    if(!empty){
      setErrors(validateForm(form));
    }
    
  }
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  }

  const handleSubmit = async(e) => {
    setErrors(validateForm(form));
    setLoading(true)
    e.preventDefault();
    toast.loading('Cargando')
    
    if(origin == 'register') {
      const {business, name, email, phone, password, confirm} = form;
      if(name && email && phone && password && confirm) {
        console.log('entra')
        if(Object.keys(errors).length === 0) {
          setLoading(true);
          Boolean(business)
          axios.post('http://localhost:8000/api/registeruser', {
          ...form,
          collaborator: false
          }, {withCredentials: true, credentials:'include'})
          .then((res) => {
            setLoading(false);
            setResponse("Creado con exito");
            localStorage.setItem('user', res.data.accessToken);
            navegar('/home');
            toast.remove()
            toast.success('Usuario Registrado con exito', {duration: 5000})
          })
          .catch((err) => {
            toast.remove()
            console.log(err);
            setLoading(false);
            setResponse("No fue creado")
            toast.error('Usuario no fue creado')
          })
          }
        } else{
          toast.remove()
          toast.error('Introduzca todos los datos correctamente')
        }
        
    }else if(origin == 'login'){
      const {email, password} = form
      if(email && password) {
        axios.post('http://localhost:8000/api/login', form, {withCredentials: true, credentials:'include'})
        .then((res) => {  
          setLoading(false);
          setResponse("Inicio de sesion exitoso")
          localStorage.setItem('user', res.data.accessToken)
          navegar('/home')
          toast.remove()
          toast('Bienvenido de nuevo', {duration: 5000, icon: '🙌'})
        })
        .catch((err) => {
        toast.remove();
        console.log(err);
        setLoading(false);
        setResponse("Fallido")
        toast.error('Correo y/o contraseña incorrrectos')
        })
        } else{
          toast.remove();
          toast.error('Introduzca todos los datos correctamente')
        }
    } else if (origin == 'addservice') {
        axios.post('http://localhost:8000/api/newservice', form, {withCredentials: true, credentials:'include'})
            .then((res) => { 
              toast.remove()
              setLoading(false);
              setResponse("Servicio enviado")
              console.log(res)
              setForm(initialForm)
              toast.success('Servicio creado correctamente')
            })
            .catch((err) => {
              toast.remove()
              console.log(err);
              setLoading(false);
              setResponse("Fallido")
              toast.error('Servicio no fue creado')
            })
            
    } else if(origin == 'access') {
      axios.post('http://localhost:8000/api/login/internal', form, {withCredentials: true, credentials:'include'})
      .then((res) => {  
        setLoading(false);
        setResponse("Logueado")
        localStorage.setItem('user', res.data.accessToken)
        navegar('/inbox')
      })
      .catch((err) => {
        setLoading(false);
        setResponse("No autorizado")
        console.log(err)
      })
    } else {
      console.log('No se detecta el origen')
    }
    
    
    setLoading(false)
    
  }

  return {
    form, setForm, errors, loading, response, handleChange, handleBlur, handleSubmit, handleOver
  }
}
