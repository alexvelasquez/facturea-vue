var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @returns Promise Marcas
 */
export function marcas(){
    return https.get(`marcas/negocio`);
}

/**
 * Post
 * @param {*} marca 
 * @returns Promise Nueva Marca
 */
export function nuevaMarca(marca){
    return https.post(`marcas/nuevo`,marca)
}

/**
 * Put
 * @param {*} id 
 * @param {*} marca 
 * @returns Promise Editar Marca
 */
 export function editarMarca(id,marca){
    return https.post(`marcas/editar/${id}`,marca);
}
