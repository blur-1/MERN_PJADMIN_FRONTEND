import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={ ` ${alerta.error ? 'text-red-700' : 'text-indigo-400'} 
                    text-end mb-3 font-bold text-sm` }>
      {alerta.msg}
    </div>
  )
}

export default Alerta
