var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @param {*} venta 
 * @returns Promise ventas
 */
export function venta(venta){
    return https.get(`ventas/pedido/${venta}`);
}

/**
 * Get
 * @param {*} venta 
 * @returns Promise detalle productos ventas
 */
export function getDetalleVenta(venta){
    return https.get(`ventas/pedido/productos/${venta}`);
}

/**
 * Get
 * @returns Promise estados
 */
export function getEstados(){
    return https.get(`ventas/estados`);
}

/**
 * Get
 * @param {*} estado 
 * @returns Promise ventas por estado
 */
export function getVentasPorEstado(estado){
    return https.get(`ventas/pedidos/${estado}`);
}

/**
 * Put
 * @param {*} venta 
 * @param {*} estado 
 * @returns Promise editar venta
 */
export function editarEstadoVenta(venta,estado){
    return https.put(`ventas/pedido/estado/${venta}`,{codigo:estado});
}

/**
 * Post
 * @param {*} venta 
 * @returns Promise nueva venta
 */
 export function nuevaVenta(venta){
    return https.post(`ventas/pedido/nuevo`,venta)
}

/**
 * Put
 * @param {*} id 
 * @param {*} venta 
 * @returns Promise editar venta
 */
export function editarVenta(id,venta){
    return https.put(`ventas/pedido/editar/${id}`,venta);
}

/**
 * Put
 * @param {*} venta 
 * @returns Promise eliminar venta
 */
export function eliminarVenta(venta){
    return https.put(`ventas/pedido/eliminar/${venta}`)
}