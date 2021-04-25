var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Post
 * @param {*} movimiento 
 * @returns Promise
 */
 export function agregarMovimiento(movimiento){
    return https.post(`movimientos/agregar`, movimiento)
}