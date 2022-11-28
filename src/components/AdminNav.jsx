import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <>
    <nav>
        <Link to="/admin/perfil"
        className='font-bold uppercase text-gray-600 px-2'>Perfil
        </Link>
        <Link to="/admin/camBiar-password"
        className='font-bold uppercase text-gray-600 px-3'>Cambiar Password
        </Link>
    </nav>
    </>
  )
}

export default AdminNav
