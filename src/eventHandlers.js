// eventHandlers.js
// Responsabilidad: manejar los eventos del usuario

import { crearTarea, toggleTarea, eliminarTarea, cambiarFiltro } from './taskManager.js';
import { renderizarTareas, actualizarEstadisticas, actualizarBotonesFiltro, limpiarInput, obtenerTextoInput } from './ui.js';

function refrescarUI() {
    renderizarTareas();
    actualizarEstadisticas();
    actualizarBotonesFiltro();
}

export function manejarAgregarTarea() {
    const texto = obtenerTextoInput();

    try {
        crearTarea(texto);
        limpiarInput();
        refrescarUI();
    } catch (error) {
        alert(error.message);
    }
}

export function manejarClickLista(evento) {
    const id = parseInt(evento.target.dataset.id);

    if (!id) return;

    if (evento.target.classList.contains('complete-btn')) {
        toggleTarea(id);
        refrescarUI();
    }

    if (evento.target.classList.contains('delete-btn')) {
        eliminarTarea(id);
        refrescarUI();
    }
}

export function manejarFiltro(evento) {
    const filtro = evento.target.dataset.filter;
    cambiarFiltro(filtro);
    refrescarUI();
}

export function manejarTeclaEnter(evento) {
    if (evento.key === 'Enter') {
        manejarAgregarTarea();
    }
}