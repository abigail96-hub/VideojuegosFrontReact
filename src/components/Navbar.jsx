import "../Estilos/Navbar.css"
export default function Navbar({ callback }) {
    return (
        <div className="navbar">
            <h1>Videojuegos </h1>
            <ul>

                <li onClick={callback}>Crear Videojuego</li>

            </ul>
        </div>
    )
}