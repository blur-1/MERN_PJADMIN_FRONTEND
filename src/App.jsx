import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider'
import { PacienteProvider } from './context/PacientesProvider'

import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import ForgotPassword from './pages/ForgotPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import NewPassword from './pages/NewPassword'
import AdministrarPacientes from './pages/AdministrarPacientes'
import EditarPerfil from './pages/EditarPerfil'
import CambiarPassword from './pages/CambiarPassword'

function App() {

    console.log(import.meta.VITE_BACKEND_URL);
    console.log(import.meta.VITE_IMAGENES_URL);
  return (
    
    <BrowserRouter>
      <AuthProvider>
        <PacienteProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              {/*rutaspublicas*/}
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>} />
              <Route path="forgot-password" element={<ForgotPassword/>} />
              <Route path="forgot-password/:token" element={<NewPassword/>} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>} />
            </Route>
              {/*rutas privadas*/}
            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path="perfil" element={<EditarPerfil/>}/>
              <Route path="cambiar-password" element={<CambiarPassword/>}/>
            </Route>
          </Routes>
        </PacienteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
