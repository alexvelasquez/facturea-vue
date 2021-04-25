var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @returns Promise Negocio
 */
export function negocio(){
    return https.get(`negocio`);
}

/**
 * Put
 * @param {*} negocio 
 * @returns Promise
 */
export function editarNegocio(negocio){
    return https.put(`negocio/editar`, negocio);
}
