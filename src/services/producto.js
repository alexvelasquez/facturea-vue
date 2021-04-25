var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get 
 * @returns Promise Productos
 */
export function productos(){
    return https.get(`productos/negocio`);
}

/**
 * Post
 * @param {*} producto 
 * @returns Promise Nuevo Producto
 */
export function nuevoProducto(producto){
    return https.post(`productos/nuevo`,producto)
}

/**
 * Get
 * @param {*} id 
 * @param {*} producto 
 * @returns Promise Editar Producto
 */
export function editarProducto(id,producto){
    return https.put(`productos/editar/${id}`,producto)
}

/**
 * Put
 * @param {*} producto 
 * @returns Promise Eliminar Producto
 */
export function eliminarProducto(producto){
    return https.put(`productos/eliminar/${producto}`)
}

/**
 * Put
 * @param {*} productos 
 * @returns Promise Eliminar varios productos
 */
export function eliminarProductos(productos){
    return https.put(`productos/eliminarProductos`,{productos:JSON.stringify(productos)});
}

/**
 * Post
 * @returns Promise importar productos
 */
export function importarProductos(productos){
    return https.post(`productos/importar`,productos,{headers:{"Content-Type": "multipart/form-data"}})
}

/**
 * Get
 * @returns Promise exportar productos
 */
export function exportarProductos(){
    return https.get(`productos/exportar`)
}

/**
 * Get
 * @returns Promise exportar modelo
 */
export function exportarModelo(){
    return https.get(`productos/exportar_modelo`)
}

/**
 * Get
 * @returns Promise exportar ejemplo
 */
export function exportarModeloEjemplo(){
    return https.get(`productos/exportar_ejemplo`)
}