import React from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import axios from 'axios'

const Login = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [alerta, setAlerta] = useState({})

const{setAuth} = useAuth()
const navigate = useNavigate()

const handleSubmit = async(e) => {
 e.preventDefault();
  if([email,password].includes("")){
    setAlerta({
      msg:"Todos los campos son olbigatorios",
      error: true
    });
    return
  }
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/login`
    const {data} = await axios.post(url,{email, password})
    //console.log(data);
    localStorage.setItem('token', data.token)
    setAuth(data)
    navigate('/admin')

  } catch (error) {
    setAlerta({
      msg: error.response.data.msg,
      error: true
    })
  }
}

const {msg} = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">Inicia
        sesión y Administra tus <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div>
        {msg && <Alerta alerta={alerta}/>}
        <form className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"
          onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-black">Email</label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
            type="email" placeholder="Ingrese su email"
            value= {email}
            onChange={ e => setEmail(e.target.value) }
            />
          </div>
          
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-black">Password</label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
            type="password" placeholder="Ingrese su password"
            value= {password}
            onChange={ e => setPassword(e.target.value) }
            />
          </div>

          <input type="submit" value="Iniciar Sesión" className="bg-indigo-400
           w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:bg-indigo-800 
           hover:cursor-pointer md:w-auto" />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-600 hover:text-indigo-500 "
           to="/registrar">No tiene una cuenta? Registrate aqui</Link>
          <Link className="block text-center my-5 text-gray-600 hover:text-indigo-500 "
          to="/forgot-password">Olvido su password?</Link>
        </nav>
      </div>
    </>
  )
}

export default Login;
