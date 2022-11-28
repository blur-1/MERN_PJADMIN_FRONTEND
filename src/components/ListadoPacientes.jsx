import React from 'react'
import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente'

const ListadoPacientes = () => {

  const {listaPacientes} = usePacientes()

  return (
    <>
      {listaPacientes.length ? 
        (<>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl font-bold mt-5 mb-10 text-center">Pacientes y{' '}
          <span className="text-indigo-600">Citas</span>
          </p>
          {listaPacientes.map(itemPaciente =>(
            <Paciente key={itemPaciente._id}
                      paciente={itemPaciente}/>
          ))}

        </>)
       :
        (<>
              <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center font-bold">Comienza agregando 
              <span className="text-indigo-600">pacientes</span>
              </p>
        </>)
      }
    </>
  )
}

export default ListadoPacientes
