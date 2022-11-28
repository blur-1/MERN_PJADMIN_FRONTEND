import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'

const Registrar = () => {
  const [nombre, setNombre] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if([nombre, email, password, repPassword].includes('')){
      setAlerta({
        msg: "Hay campos vacios*", 
        error:true
      })
      return;
    }
    if(password !== repPassword){
      setAlerta({
        msg: "El password no coincide*", 
        error:true
      })
      return;
    }
    setAlerta({});

    //crea el usuario en la api
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`
      const respuesta = await axios.post(url,
        {nombre, email, password})
        setAlerta({
          msg: "Registrado correctamente, revise su correo*",
          error: false
        })
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
        <h1 className="text-indigo-600 font-black mb-8 text-5xl">
          Crea una <span className="text-black">cuenta</span></h1>
    </div>
    
    <div>
      {msg && <Alerta alerta={alerta} /> }
      
        <form className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"
            onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-black">Tu nombre</label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    type="text" 
                    placeholder="Ingrese su nombre" 
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                    />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-black">Email</label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    type="email" 
                    placeholder="Ingrese su email"
                    value={email}
                    onChange= { e => setEmail(e.target.value)} />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-black">Password</label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    type="password" 
                    placeholder="Ingrese su password"
                    value={password}
                    onChange={ e => setPassword(e.target.value)} />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-black">Repetir su password</label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    type="password" 
                    placeholder="Ingrese su password"
                    value={repPassword}
                    onChange={ e => setRepPassword(e.target.value)} />
            </div>

            <input type="submit" value="Guardar" className="bg-indigo-400
              w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:bg-indigo-800 
              hover:cursor-pointer md:w-auto" />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-gray-600 hover:text-indigo-500 "
            to="/">volver</Link>
            <Link className="block text-center my-5 text-gray-600 hover:text-indigo-500 "
            to="/forgot-password">Olvido su password?</Link>
        </nav>
    </div>
    </>
  )
}

export default Registrar;
