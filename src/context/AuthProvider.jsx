import{ useState, useEffect, createContext} from 'react'
import axios from 'axios'

const AuthContext = createContext();
const AuthProvider = ({children}) => {
     const[auth, setAuth] = useState({})
     const [cargando, setCargando] = useState(true)

    useEffect(()=>{
        const autenticarUsuario =  async() =>{
            const token = localStorage.getItem("token")
            if(!token){
                setCargando(false)
                return;
            }
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil`
                const{data} = await axios(url, config);
                setAuth(data.perfil)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }
            setCargando(false);
        }
        autenticarUsuario();
    },[])

    const cerrarSesion= () =>{
        localStorage.removeItem('token')
        setAuth({})
    }
     
    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem("token")
            if(!token){
                setCargando(false)
                return;
            }
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil/${datos._id}`
            const{data} = await axios.put(url, datos , config);
            console.log(data);
            return{
                msg: "Actualizado correctamente"
            }

        } catch (error) {
            return{
                msg: error.response.data.msg,
                error:true
            }
        }
    }

    const guardarNuevoPassword = async (datos) =>{
        const token = localStorage.getItem("token")
            if(!token){
                setCargando(false)
                return;
            }
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/actualizar-password`
            const{data} = await axios.put(url, datos , config);
            return{
                msg:data.msg
            }

        } catch (error) {
            return{
                msg:error.response.data.msg,
                error:true
            }
        }
    }

    return(
        <AuthContext.Provider 
            value={{auth, 
                    setAuth, 
                    cargando, 
                    cerrarSesion,
                    actualizarPerfil,
                    guardarNuevoPassword}}>
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext