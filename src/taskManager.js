// taskmanager 
//manejara los filtros y la logica de las tareas

import { guardarTareas } from './storage.js';

let tareas = [];
let contadorId = 1;
let filtroActual = 'all';
export function inicializarTareas(tareasGuardadas) {
    tareas = tareasGuardadas;
    contadorId = tareas.length > 0
    ? Math.max(...tareas.map(t => t.id)) + 1 //los tres puntos son el operador spread, que permite expandir 
                                             //un array en elementos individuales. En este caso, se está usando para 
                                             // pasar todos los ids de las tareas al método Math.max, que devuelve el valor máximo entre ellos. 
                                             // Luego se le suma 1 para obtener el siguiente id disponible.
    : 1;
}

export function crearTarea(texto) {
    if (!texto.trim()) { //trim elimina los espacios en blanco al inicio y al final del texto, si el texto es vacio, se lanza un error
        throw new Error('El texto de la tarea no puede estar vacío');// detiene y lanza un error si el texto de la tarea está vacío, evitando que se cree una tarea sin contenido.
    }//una cadena vacia da false, por eso se usa el ! para que de true y se lance el error

    const nuevaTarea = {
    id: contadorId++,
    text: texto.trim(),
    completed: false,
    createdAt: new Date().toISOString()
    };
    tareas.push(nuevaTarea);
    guardarTareas(tareas);
    return nuevaTarea;
}

export function toggleTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completed = !tarea.completed;
        guardarTareas(tareas);
    }
}

export function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);// quedate con todos menos con el id del parametro. eliminando el que coincidio
    guardarTareas(tareas);// envia el arreglo sin el id que fue capturado
}

export function obtenerTareasFiltradas() {
    if (filtroActual === 'active') {
        return tareas.filter(t => !t.completed);
    }
    if (filtroActual === 'completed') {
        return tareas.filter(t => t.completed);
    }
    return tareas;
}

export function cambiarFiltro(filtro) {
    filtroActual = filtro;
}

export function obtenerFiltroActual() {
    return filtroActual;
}

export function obtenerEstadisticas() {
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completed).length;
    const activas = total - completadas;
    return { total, completadas, activas };
}