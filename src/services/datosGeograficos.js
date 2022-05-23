var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @param {*} auth 
 * @returns Promise token
 */
export function getProvincias(){
    return https.get(`datosGeograficos/provincias`);
}

/**
 * Get
 * @param {*} provincia 
 * @returns Promise localides de una provincia
 */
export function getLocalidades(provincia){
    return https.get(`datosGeograficos/localidades/${provincia}`)
}