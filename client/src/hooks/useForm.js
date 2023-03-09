import { useState } from 'react'
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';

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

  const handleBlur = (e) => {
    handleChange(e);
  }

  const handleSubmit = (e) => {
    setErrors(validateForm(form));
    setLoading(true)
    e.preventDefault();
    toast.loading('Cargando')
    setTimeout(loadingHandler, 2000)
    
    
    function loadingHandler() {
      if(Object.keys(errors).length === 0) {
        toast.remove()
        if(!empty) {
          setLoading(true);
          if(origin == 'register') {
            const {business} = form
            Boolean(business)
            axios.post('http://localhost:8000/api/registeruser', {
            ...form,
            collaborator: false
            }, {withCredentials: true, credentials:'include'})
            .then((res) => {
              toast.remove()
              setLoading(false);
              setResponse("Creado con exito");
              localStorage.setItem('user', res.data.accessToken);
              toast.success('Usuario Registrado con exito')
              navegar('/home');
              
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              setResponse("No fue creado")
              toast.error('Usuario no fue creado')
            })
            
          } else if (origin == 'login'){
            const {business} = form
            Boolean(business)
            axios.post('http://localhost:8000/api/login', form, {withCredentials: true, credentials:'include'})
            .then((res) => {  
              setLoading(false);
              setResponse("Inicio de sesion exitoso")
              localStorage.setItem('user', res.data.accessToken)
              toast.remove()
              navegar('/home')
            })
            .catch((err) => {
              toast.remove();
              console.log(err);
              setLoading(false);
              setResponse("Fallido")
              toast.error('Correo y/o contraseña incorrrectos')
            })
          } else if(origin == 'addservice') {
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
            
          }else {
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
          }
        }
        
      } else {
        console.log('no funciona');
        setLoading(false);
        
        
      }
    }
    
  }

  return {
    form, setForm, errors, loading, response, handleChange, handleBlur, handleSubmit
  }
}
