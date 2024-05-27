import { useState, useEffect } from 'react'
import axios from 'axios'
import '../Estilos/Modal.css'
import validacion from '../helpers/validacion'



export default function Modal({setId, consolas, generos, update, juegoId, closeModal }) {

    const [objeto, setObjeto] = useState({
        titulo: "", descripcion: "", año: "", calificacion: "", estatus: false, consola: "default", genero: "default"
    })
    const [arreglo, setArreglo] = useState([])



    function agregar(event) {
        event.preventDefault()
        const errores = validacion(objeto)
        if(errores.length === 0){
            setArreglo([...arreglo, objeto])
            setObjeto({ titulo: "", descripcion: "", año: "", calificacion: "", estatus: false, consola: "default", genero: "default" })
        } else {
            alert(errores[0])
        }
    }



    async function updateVideojuego(event) {
        event.preventDefault()
        try {
            const errores = validacion(objeto)
            if(errores.length === 0){
                const response = await axios.put('http://localhost:5187/api/Videojuego', {
                    "idVideojuego": juegoId,
                    "titulo": objeto.titulo,
                    "descripcion": objeto.descripcion,
                    "año": objeto.año,
                    "calificacion": objeto.calificacion,
                    "estatus": objeto.estatus,
                    "idConsola": objeto.consola,
                    "idGenero": objeto.genero
                })
            } else {
                alert(errores[0])
                return
            }
        } catch (error) {
            console.log("error al crearse", error)
        }
        setObjeto({ titulo: "", descripcion: "", año: "", calificacion: "", estatus: false, consola: "default", genero: "default" })
        update();
        setId("")
        closeModal(event);
    }

    async function submit(event) {
        event.preventDefault();
        try {
            let nuevoArreglo = [];
            const errores = validacion(objeto)
            if (errores.length === 0) {
                nuevoArreglo = [...arreglo, objeto]
            } else {
                const confirmar = confirm(`El ultimo juego no se agregara porque tiene el siguiente error: \n1.- ${errores[0]}\n desea continuar?`)
                if(confirmar){
                    nuevoArreglo = [...arreglo]
                } else {
                    return
                }
            }
                for (const juego of nuevoArreglo) {
                    const response = await axios.post('http://localhost:5187/api/Videojuego', {
                        "titulo": juego.titulo,
                        "descripcion": juego.descripcion,
                        "año": juego.año,
                        "calificacion": juego.calificacion,
                        "estatus": juego.estatus,
                        "idConsola": juego.consola,
                        "idGenero": juego.genero
                    });

                }
        } catch (error) {
            console.log("error al crearse", error);
        }
        setObjeto({ titulo: "", descripcion: "", año: "", calificacion: "", estatus: false, consola: "default", genero: "default" });
        setArreglo([])
        closeModal(event);
        update();
    }

    function handleTitulo(event) {
        setObjeto({ ...objeto, titulo: event.target.value })
    }

    function handleDescripcion(event) {
        setObjeto({ ...objeto, descripcion: event.target.value })
    }

    function handleAño(event) {
        setObjeto({ ...objeto, año: +event.target.value })
    }

    function handleCalificacion(event) {
        setObjeto({ ...objeto, calificacion: +event.target.value })
    }
    function handleEstatus(event) {
        setObjeto({ ...objeto, estatus: event.target.checked })
    }
    function handleConsola(event) {
        setObjeto({ ...objeto, consola: +event.target.value })
    }
    function handleGenero(event) {
        setObjeto({ ...objeto, genero: +event.target.value })
    }


    useEffect(() => {

        async function getData(id) {

            const { data } = await axios(`http://localhost:5187/api/Videojuego/${id}`)

            setObjeto({
                titulo: data.titulo,
                descripcion: data.descripcion,
                año: data.año,
                calificacion: data.calificacion,
                estatus: data.estatus,
                consola: data.idConsola,
                genero: data.idGenero
            })

        }

        if (juegoId) {
            getData(juegoId)
        }

    }, [juegoId])

    return (
        <div className='divModal'>
            <form>
                <label>Titulo</label>
                <input value={objeto.titulo} type="text" onChange={handleTitulo} />

                <label>Año</label>
                <input value={objeto.año} type="number" onChange={handleAño} />

                <label>Calificacion</label>
                <input value={objeto.calificacion} type="number" onChange={handleCalificacion} />

                <div className='selects'>

                    <label>Estatus
                        <input checked={objeto.estatus} type="checkbox" onChange={handleEstatus} />
                    </label>

                    <select value={objeto.consola} defaultValue="default" onChange={handleConsola}>
                        <option disabled value="default">Consola</option>
                        {consolas && consolas.length > 0
                            ? consolas.map((consola) => {
                                return (
                                    <option key={consola.idConsola} value={consola.idConsola} >{consola.nombre}</option>
                                )
                            })
                            : <option disabled>No existen consolas</option>
                        }
                    </select>

                    <select value={objeto.genero} defaultValue="default" onChange={handleGenero}>
                        <option disabled value="default">Genero</option>
                        {generos && generos.length > 0
                            ? generos.map((genero) => {
                                return (
                                    <option key={genero.idGenero} value={genero.idGenero} >{genero.nombre}</option>
                                )
                            })
                            : <option disabled>No existen consolas</option>
                        }
                    </select>
                </div>
                <label >Descripcion</label>
                <textarea value={objeto.descripcion} onChange={handleDescripcion}></textarea>
                <div className='botones'>
                    {juegoId
                        ? <button onClick={updateVideojuego}>Actualizar</button>
                        :
                        <>
                            <button onClick={submit}>Crear</button>
                            <button onClick={agregar}>Agregar</button>
                        </>

                    }

                </div>
            </form>
            <button className='cerrar' onClick={closeModal}>X</button>
            <div className='lista'>
                <ul className='listaJuegos'>
                    {arreglo.map((juego, i)=>{
                        return (
                            <li key={i}>
                                <ul className='juegoDatos'>
                                    <li>{i+1} - {juego.titulo}</li>
                                    <li>Año :{juego.año}</li>
                                    <li>{juego.estatus ? "Activo" : "Inactvo"}</li>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}