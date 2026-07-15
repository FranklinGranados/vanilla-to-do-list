// main.js
// Responsabilidad: inicializar la aplicación

import './style.css';
import { cargarTareas } from './storage.js';
import { inicializarTareas } from './taskManager.js';
import { renderizarTareas, actualizarEstadisticas, actualizarBotonesFiltro } from './ui.js';
import { manejarAgregarTarea, manejarClickLista, manejarFiltro, manejarTeclaEnter } from './eventHandlers.js';

function iniciarApp() {
    const tareasGuardadas = cargarTareas();
    inicializarTareas(tareasGuardadas);

    document.getElementById('addBtn').addEventListener('click', manejarAgregarTarea);
    document.getElementById('taskInput').addEventListener('keypress', manejarTeclaEnter);
    document.getElementById('taskList').addEventListener('click', manejarClickLista);

    document.querySelectorAll('.filter-btn').forEach(boton => {
        boton.addEventListener('click', manejarFiltro);
    });

    renderizarTareas();
    actualizarEstadisticas();
    actualizarBotonesFiltro();
}

iniciarApp();