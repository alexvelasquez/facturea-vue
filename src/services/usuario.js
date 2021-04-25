var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @param {*} auth 
 * @returns Promise token
 */
export function getTokens(auth){
    return https.post(`login_check`, auth);
}

/**
 * Get
 * @returns Promise current user
 */
export function getCurrentUser(){
    return https.get(`currentUser`);
}

/**
 * Get
 * @returns Promise usuarios
 */
export function usuarios(){
    return https.get(`usuario`);
}

/**
 * Put
 * @param {*} usuario 
 * @returns Promise editar usuario
 */
export function editarUsuario(usuario){
    return https.put('usuario/editar',usuario);
}

/**
 * Put
 * @param {*} usuario 
 * @param {*} valor 
 * @returns Promise habilitar/deshabilitar seccion pedidos
 */
export function editarPedidoUsuario(usuario,valor){
    return https.put(`/usuario/gestionPedido/${usuario}`,{valor:valor});
}

/**
 * Put
 * @param {*} usuario 
 * @param {*} valor 
 * @returns Promise habilitar/deshabilitar seccion factura electronica
 */
export function editarFacturaUsuario(usuario,valor){
    return https.put(`/usuario/gestionFacturaElectronica/${usuario}`,{valor:valor});
}

/**
 * Put
 * @param {*} nuevaClave 
 * @returns Promise editar contraseña.
 */
export function editarContrasenia(nuevaClave){
    return https.put(`/usuario/editarClave`,nuevaClave);
}

/**
 * Put
 * @param {*} nuevaClave 
 * @returns Promise recuperar contraseña.
 */
 export function recuperarContrasenia(email){
    return https.put(`/usuario/recuperaClave`,email);
}