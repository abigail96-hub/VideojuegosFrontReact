export default function validacion(objeto){
    const {titulo, descripcion, año, calificacion, consola, genero} = objeto;
    const errores = [];
    titulo.length < 1 && errores.push("Ingrese un titulo")
    if(año < 1950 || año > 2024) errores.push("Ingresa un año entre 1950 - 2024")
    if(calificacion < 1 || calificacion > 10) errores.push("Ingresa una calificacion entre 1 - 10")
    consola === "default" && errores.push("Seleccione una consola")
    genero === "default" && errores.push("Seleccione una genero")
    descripcion.length < 1 && errores.push("Ingrese una descripción")

    return errores;
}