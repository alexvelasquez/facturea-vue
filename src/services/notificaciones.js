var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @returns Promise Notificaciones
 */
export function getNotificaciones(){
    return https.get(`notificaciones`);
}

