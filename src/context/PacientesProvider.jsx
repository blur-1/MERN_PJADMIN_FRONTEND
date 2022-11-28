import{ useState, useEffect, createContext} from 'react'
import axios from 'axios'

const PacienteContext = createContext()

const PacienteProvider = ({children}) =>{

    const[listaPacientes, setListaPacientes] = useState([])
    const[paciente, setPaciente] = useState({})

    useEffect(()=>{
        const obtenerPacientes = async () =>{
            try {
                const token = localStorage.getItem("token")
                if(!token) return
                const config ={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes`
                const{data} = await axios(url, config);
                setListaPacientes(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes()
    },[])

    const guardarPaciente = async(paciente) => {
        const token = localStorage.getItem("token")
                const config ={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
        //Actualizando Paciente 
        if(paciente.idEdit){
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${paciente.idEdit}`
                const {data} = await axios.put(url, paciente,config)
                
                const pacienteActualizado = listaPacientes.map( itemPacienteState =>itemPacienteState._id ===
                    data._id ? data : itemPacienteState)
                setListaPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error);
            }
        }else{  //Creando Paciente   
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes`
                const {data} = await axios.post(url, paciente,config)
                 //extrayendo para el auth datos que no ingresaran y guardandolos en una nueva variable
                 const{ createdAt, updateAt, __V, ...pacienteAlmacenado} = data
                 setListaPacientes([pacienteAlmacenado, ...listaPacientes])
    
              } catch (error) {
                console.log(error.response.data.msg);
              }
        }
    }
    //Editar Paciente
    const setEdicion = (paciente) =>{
        setPaciente(paciente);
    }

    //Eliminar Paciente
    const eliminarPaciente = async id =>{
        const confirmar = confirm('seguro desea eliminar este paciente?');
            
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config ={
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${id}`
                const {data} = await axios.delete(url,config)
                
                const pacientesActualizado = listaPacientes.filter( itemPaciente => itemPaciente._id !== id)
                setListaPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <PacienteContext.Provider 
        value={{listaPacientes, 
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente}}>
            {children}
        </PacienteContext.Provider>
    )
}
export {PacienteProvider};
export default PacienteContext;