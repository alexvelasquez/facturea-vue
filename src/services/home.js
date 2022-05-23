var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @param {*} auth 
 * @returns Promise Infrome
 */
export function informe(periodo){
    return https.get(`inicio`, {params:periodo});
}
