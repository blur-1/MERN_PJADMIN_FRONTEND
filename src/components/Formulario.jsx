import React from 'react'
import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [idEdit, setIdEdit]= useState(null)

    const [alerta, setAlerta] = useState({})
    
    const {guardarPaciente, paciente}= usePacientes()
    //console.log(listaPacientes);
    useEffect(()=>{
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail (paciente.email)
            setFecha(new Date(paciente.fecha).toISOString())
            setSintomas(paciente.sintomas)
            setIdEdit(paciente._id)
        }
    },[paciente])

    const handleSubmit = (e) =>{
        e.preventDefault()
        if([nombre, propietario, email, fecha, sintomas].includes("")){
            setAlerta({
                msg:'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        guardarPaciente({nombre, propietario, email, fecha, sintomas,idEdit})
        setAlerta({
            msg:'Guardado Correctamente',
            error:false
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setIdEdit('')
    }

    const{msg} = alerta;

  return (
    <>
        <h2 className="font-black text-3xl text-center">Registro</h2>

        <p className="text-xl font-bold mt-5 mb-10 text-center">Añade aqui tus{' '}
          <span className="text-indigo-600">Pacientes</span>
          </p>
        {msg && <Alerta alerta={alerta}/>}
        <form className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
            onSubmit={handleSubmit}>
            <div className='mb-5'>
                <label htmlFor="mascota"
                        className='text-gray-700 uppercase font-bold'>Nombre de Mascota</label>
                <input
                    id="mascota"
                    type="text"
                    placeholder="escribe qui"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="propietario"
                        className='text-gray-700 uppercase font-bold'>Nombre del Propietario</label>
                <input
                    id="propietario"
                    type="text"
                    placeholder="escribe qui"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={e=>setPropietario(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="email"
                        className='text-gray-700 uppercase font-bold'>Email del Propietario</label>
                <input
                    id="email"
                    type="email"
                    placeholder="escribe qui"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="fecha"
                        className='text-gray-700 uppercase font-bold'>Fecha de Alta</label>
                <input
                    id="fecha"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e=>setFecha(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="sintomas"
                        className='text-gray-700 uppercase font-bold'>Sintomas</label>
                <textarea
                    id="sintomas"
                    placeholder="escribe aqui"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={e=>setSintomas(e.target.value)}
                />
            </div>
            <input type="submit" 
                   value={idEdit ? "Guardar Cambios": "Agregar Paciente"}
                   className="bg-indigo-600 w-full p-3 text-white
                   uppercase font-bold hover:bg-indigo-700
                   cursor-pointer transition-colors" />
        </form>
    </>
  )
}

export default Formulario
