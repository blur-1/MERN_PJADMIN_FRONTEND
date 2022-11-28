import { useState, useEffect } from "react"
import {useParams, Link} from "react-router-dom"
import axios from 'axios'
import Alerta from "../components/Alerta"

const NewPassword = () => {
  const[password, setPassword] = useState('')
  const[alerta, setALerta] = useState({})
  const[tokenValido, setTokenValido] = useState(false)
  const[passModificado, setPassModificado] = useState(false)

  const params = useParams()
  const {token} = params

  useEffect(()=>{
    const comprobarToken = async () =>{
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/forgot-password/${token}`
        const{data} = await axios(url);
        setALerta({
          msg: "coloca tu nuevo password",
          error: false
        })
        setTokenValido(true)
      } catch (error) {
        setALerta({
          msg: "Hubo un error con la url",
          error: true
        })
      }
    }
    comprobarToken();
  },[]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(password.trim() == ""){
      setALerta({
        msg:'Complete el password',
        error: true
      })
      return
    }
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/forgot-password/${token}`
      const {data} = await axios.post(url, {password})
      setALerta({
        msg: data.msg,
      })
      setPassModificado(true)
    } catch (error) {
      setALerta({
        msg:error.response.data.msg,
        error: true
      })
    }
  }

  const{msg} = alerta;

  return (
   <>
      <div>
          <h1 className="text-indigo-600 font-black text-5xl">Reestablece tu password y <span className="text-black">Guarda tu password</span>
          </h1>
      </div>
      
      <div>
      {msg && <Alerta alerta={alerta} /> }
      {tokenValido && (
        <>
          <form className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"
          onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-black">Tu Nuevo Password</label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                  type="password" 
                  placeholder="Ingrese su nuevo password"
                  value={password}
                  onChange={ e => setPassword(e.target.value)} />
          </div>

          <input type="submit" value="Guardar" className="bg-indigo-400
            w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:bg-indigo-800 
            hover:cursor-pointer md:w-auto" />
          </form>
        </>
      )} 
      {passModificado && 
        <nav className="mt-10 lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-gray-600 hover:text-indigo-500 "
        to="/">Iniciar Sesion</Link>
        </nav>
      }
      </div>
   </>
  )
}

export default NewPassword;

