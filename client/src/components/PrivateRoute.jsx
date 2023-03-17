import React from 'react'
import { useNavigate, Outlet, redirect} from "react-router-dom";
import { isLogged, isLogged2 } from "../utils/sessionUtils";

// customHook
async function useAuth(resultado){
   const result = await resultado.then((res)=>{
    console.log(res, "RESTESETRE")
    return res
  }).catch((err)=>{
    console.log(err, "resultado")
    return redirect("/login")
  })
  return result
}

const PrivateRoute = ({children, loaded, setLoaded}) => {

  const navigate = useNavigate();
  const isAuth = useAuth(isLogged2(navigate));
  console.log(isAuth, " AQUI NO MAS")
  isAuth.then((res)=>{
    console.log(res, "snoopDog")
    setLoaded(true)
   }).catch((err)=>{
    console.log("welcome")
    return redirect("/login")
   })

  return (
    <>
    {isAuth ? <Outlet/>:"bajan"}
    {isAuth ? children: "spinetta"}
    </>
  )
}

export default PrivateRoute