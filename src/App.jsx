import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Tabla from './components/Tabla'
import Modal from './components/Modal'
import './App.css'


function App() {
  const [show, setShow] = useState("none")
  const [consolas, setConsolas] = useState([])
  const [generos, setGeneros] = useState([])
  const [actualizar, setActualizar] = useState(true)
  const [videojuegos, setVideojuegos] = useState([])



  function showModal() {
    setShow("block")
  }
  function closeModal(event) {
    event.preventDefault()
    setShow("none")
}


  function update() {
    setActualizar(!actualizar)
  }

  useEffect(() => {
    async function getSelection() {

      const dataConsolas = await axios('http://localhost:5187/api/Consola')
      const dataGeneros = await axios('http://localhost:5187/api/Genero')
      const { data } = await axios('http://localhost:5187/api/Videojuego')
      setVideojuegos(data)
      setConsolas(dataConsolas.data)
      setGeneros(dataGeneros.data)
    }

    getSelection()
  }, [actualizar])
  return (
    <div className='contenedor'>
      <Navbar callback={showModal}></Navbar>
      
      <Tabla update={update} videojuegos={videojuegos} consolas={consolas} generos={generos} ></Tabla>
      <div className="modal" style={{ display: show }} >
        <Modal consolas={consolas} generos={generos} update={update} closeModal={closeModal} ></Modal>
      </div>


    </div>
  )
}

export default App
