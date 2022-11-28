import React from 'react'
import usePacientes from '../hooks/usePacientes'

const Paciente = ({paciente}) => {
    const{email, fecha, nombre, propietario, sintomas, _id} = paciente
    //edicion
    const{setEdicion, eliminarPaciente} = usePacientes()

    const formatearFecha =(fecha) =>{
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-PE', {dateStyle:'medium'}).format(nuevaFecha)
    }
    

  return (
    <>
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10
                        rounded-xl">
            <p className="font-bold uppercase text-indigo-400 py-2"> Nombre:{" "}
                <span className='font-normal normal-case text-gray-900'>{nombre}</span>
            </p>
            <p className="font-bold uppercase text-indigo-400 py-2"> Propietario:{" "}
                <span className='font-normal normal-case text-gray-900'>{propietario}</span>
            </p>
            <p className="font-bold uppercase text-indigo-400 py-2"> Email:{" "}
                <span className='font-normal normal-case text-gray-900'>{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-400 py-2"> Fecha:{" "}
                <span className='font-normal normal-case text-gray-900'>{formatearFecha(fecha)}</span>
            </p>
            <p className="font-bold uppercase text-indigo-400 py-2"> Sintomas:{" "}
                <span className='font-normal normal-case text-gray-900'>{sintomas}</span>
            </p>
           <div className="flex justify-between my-5">
                <button type="button" 
                className="py-2 px-10 bg-indigo-600 hover:bg-sky-600 text-white uppercase
                         rounded-lg"
                onClick={() => setEdicion(paciente)}>
                Editar
                </button>
                <button type="button" 
                className="py-2 px-10 bg-gray-800 hover:bg-rose-700 text-white uppercase
                         rounded-lg"
                onClick={() => eliminarPaciente(_id)}>
                Eliminar
                </button>
           </div>
        </div>
    </>
  )
}

export default Paciente
