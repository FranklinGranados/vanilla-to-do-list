// Storage.js
// esto guardara y cargara tareas en el navegador

const STORAGE_KEY= 'tasks';

export function cargarTareas() {
    const tareasGuardadas = localStorage.getItem(STORAGE_KEY); //local storage solo guarda texto, por eso se usa JSON.parse para convertirlo a objeto   
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

export function guardarTareas(tareas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));// JSON.stringify convierte el objeto a texto para poder guardarlo en local storage
} //setItem mete las tareas en el local storage, getItem las saca.