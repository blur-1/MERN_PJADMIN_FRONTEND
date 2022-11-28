import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'

const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const [alerta, setAlerta] =useState({})

const handleSubmit = async e => {//llamando a la api
      e.preventDefault();

    if(email == ''){
      setAlerta({
        msg:"El email es obligatorio",
        error: "true"
      })
      return
    }
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/forgot-password`
      const {data} = await axios.post(url,{email})
      console.log(data);
        setAlerta({
          msg: data.msg,
          error: false
        })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const{msg} = alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-5xl">Recupera tu password y <span className="text-black">accede</span>
          </h1>
      </div>
      <div>
        
        <form className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"
            onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} /> }
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-black">Tu email</label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              type="email" 
              placeholder="Ingrese su nombre"
              value={email}
              onChange={ e => setEmail(e.target.value)} />
            </div>
            
            <input type="submit" value="Enviar Instrucciones" className="bg-indigo-400
            w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:bg-indigo-800 
            hover:cursor-pointer md:w-auto" />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-600 hover:text-indigo-500 "
           to="/">Ya tienes una cuenta, inicie sesion aqui</Link>
        </nav>
    </div>
    </>
  )
}

export default ForgotPassword
