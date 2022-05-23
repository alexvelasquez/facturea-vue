var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @returns Promise 
 */
export function clientes() {
    return https.get(`clientes`);
}

/**
 * Get
 * @returns Promise 
 */
 export function cliente(id) {
    return https.get(`cliente/${id}`);
}

/**
 * Post
 * @param {*} cliente 
 * @returns Promise
 */
export function nuevoCliente(cliente) {
    return https.post(`clientes/nuevo`, cliente)
}

/**
 * Put
 * @param {*} cliente 
 * @returns Promise
 */
export function editarCliente(id,cliente) {
    return https.put(`clientes/editar/${id}`, cliente)
}

/**
 * Delete
 * @param {*} cliente 
 * @returns Promise
 */
export function eliminarCliente(id,cliente) {
    return https.put(`clientes/eliminar/${id}`, cliente)
}

/**
 * Put
 * @param {*} clientes 
 * @returns Promise eliminar clientes
 */
export function eliminarClientes(clientes) {
    return https.put(`clientes/eliminarClientes`,{clientes: JSON.stringify(clientes)})
}

/**
 * Get
 * @param {*} cliente 
 * @returns Promise
 */
export function cuentaCorriente(cliente) {
    return https.get(`clientes/cuentaCorriente/${cliente}`);
}

/**
 * 
 * @param {*} cliente 
 * @returns Promise
 */
export function compras(cliente) {
    return https.get(`clientes/compras/${cliente}`);
}