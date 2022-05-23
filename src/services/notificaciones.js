var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @returns Promise Notificaciones
 */
export function getNotificaciones(){
    return https.get(`notificaciones`);
}

/**
 * Get
 * @returns Promise Notificaciones
 */
 export function crearNotificacion(notificacion){
    return https.post(`notificaciones/nueva`,notificacion);
}

/**
 * Get
 * @returns Promise Notificaciones
 */
 export function confirmar(notificacion){
    return https.post(`notificaciones/confirmar/${notificacion}`);
}


