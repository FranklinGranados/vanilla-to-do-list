// ui.js
// Responsabilidad: manejar todo lo que se muestra en pantalla

import { obtenerTareasFiltradas, obtenerEstadisticas, obtenerFiltroActual } from './taskManager.js';

export function renderizarTareas() {
    const listaTareas = document.getElementById('taskList');
    const tareasFiltradas = obtenerTareasFiltradas();

    if (tareasFiltradas.length === 0) {
        listaTareas.innerHTML = '<p class="empty-message">No hay tareas para mostrar</p>';
        return;
    }

    listaTareas.innerHTML = tareasFiltradas
        .map(tarea => crearHTMLTarea(tarea)) //.map recorre el arreglo de tareas y para cada tarea llama a la funcion crearHTMLTarea, que devuelve un string con el HTML de la tarea. Luego, se usa .join('') para unir todos los strings en uno solo, sin separadores, y se asigna al innerHTML de la lista de tareas. Esto actualiza la interfaz de usuario con las tareas filtradas.
        .join('');
}

function crearHTMLTarea(tarea) {
    const claseCompletada = tarea.completed ? 'completed' : '';
    const textoBoton = tarea.completed ? 'Reactivar' : 'Completar';

    return `
        <div class="task-item ${claseCompletada}">
            <span>${tarea.text}</span>
            <div class="task-buttons">
                <button class="complete-btn" data-id="${tarea.id}">
                    ${textoBoton}
                </button>
                <button class="delete-btn" data-id="${tarea.id}">
                    Eliminar
                </button>
            </div>
        </div>
    `;
}

export function actualizarEstadisticas() {
    const { total, completadas, activas } = obtenerEstadisticas();
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `Total: ${total} | Completadas: ${completadas} | Activas: ${activas}`;
}

export function actualizarBotonesFiltro() {
    const filtroActual = obtenerFiltroActual();
    const botones = document.querySelectorAll('.filter-btn');

    botones.forEach(boton => {
        boton.classList.remove('active');
        if (boton.dataset.filter === filtroActual) {
            boton.classList.add('active');
        }
    });
}

export function limpiarInput() {
    document.getElementById('taskInput').value = '';
}

export function obtenerTextoInput() {
    return document.getElementById('taskInput').value;
}