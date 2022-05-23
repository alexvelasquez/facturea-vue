var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @returns Promise categorias de un negocio
 */
export function categorias(){
    return https.get(`categorias/negocio`);
}

/**
 * Post
 * @param {*} categoria 
 * @returns Promise Nueva Categoria
 */
 export function nuevaCategoria(categoria){
    return https.post(`categorias/nuevo`,categoria)
}

/**
 * Put
 * @param {*} id 
 * @param {*} categoria 
 * @returns Promise Editar Categoria
 */
 export function editarCategoria(id,categoria){
    return https.put(`categorias/editar/${id}`,categoria);
}