import axios from 'axios'
import { useEffect, useState } from 'react'
import "../Estilos/Tabla.css"
import Modal from './Modal'



export default function Tabla({ videojuegos, update, consolas, generos, closeModal }) {

    const [idJuego, setIdJuego]  = useState ("")
    const [show, setShow] = useState ("none")
    async function eliminar(id) {
        const confirmar = confirm("¿Esta seguro que desea eliminar este videojuego?")
        if (confirmar) {
            try {
                const { data } = await axios.delete(`http://localhost:5187/api/Videojuego/${id}`)
                update()

            } catch (error) {
                console.log(error)
            }
        }
    }

    async function videojuegoId (id) {
      setIdJuego (id)  
      setShow ("block")
    }

    function closeModal(event) {
        event.preventDefault()
        setShow("none")
    }
    

    return (
        <div className="divtabla">
            <table>
                <tr className="titulos">
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Año</th>
                    <th>Calificación</th>
                    <th>Estatus</th>
                    <th>Consola</th>
                    <th>Genero</th>
                    <th>Acciones</th>
                </tr>
                {videojuegos && videojuegos.length > 0
                    ? videojuegos.map((Videojuego) => {

                        return (
                            <tr key={Videojuego.idVideojuego}>

                                <td>{Videojuego.titulo}</td>
                                <td>{Videojuego.descripcion}</td>
                                <td>{Videojuego.año}</td>
                                <td>{Videojuego.calificacion}</td>
                                <td>{Videojuego.estatus ? "Activo" : "Inactivo"}</td>
                                <td>{Videojuego.idConsola}</td>
                                <td>{Videojuego.idGenero}</td>
                                <td className='acciones'>
                                    <button onClick={() => { eliminar(Videojuego.idVideojuego) }}>Eliminar</button>
                                    <button onClick={() => { videojuegoId(Videojuego.idVideojuego) }}>Editar</button>
                                </td>

                            </tr>
                        )
                    })
                    
                    : <tr>
                        <td className="vacio" colSpan={7}>No hay videojuegos disponibles</td>
                    </tr>


                }

            </table>
            <div className="modal" style={{ display: show }} >
        <Modal setId={setIdJuego} consolas={consolas} generos={generos} update={update} juegoId = {idJuego} closeModal={closeModal} ></Modal>
      </div>
        </div>
    )
}