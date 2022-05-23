var https = require("axios");
https.defaults.baseURL = process.env.VUE_APP_API;

/**
 * Get
 * @returns Promise Tipos documentos
 */
export function getTiposDocumentos(){
    return  https.get(`afip/tiposDocumentos`);
}
/**
 * Get
 * @returns Promise Condiciones IVA
 */
export function  getCondicionesIva(){
    return https.get(`afip/condicionesIva`);
}
/**
 * Get
 * @returns Promise Tipos Alicuota 
 */
export function  getTiposAlicuotas(){
    return https.get(`afip/tiposAliCuotas`);
}
/**
 * Get
 * @returns Promise Tipos Conceptos
 */
export function getTiposConceptos(){
    return https.get(`afip/tiposConceptos`);
}
/**
 * Get
 * @returns Promise Condiciones Venta
 */
export function getCondicionesVenta(){
    return https.get(`afip/condicionesVenta`);
}
/**
 * Get
 * @param {*} tipo 
 * @returns Promise Tipo comprobante
 */
export function getTipoComprobante(tipo){
    return https.get(`afip/tiposComprobantesIVA`,{params:{afip_id:tipo}});
}
/**
 * Post
 * @param {*} comprobante 
 * @returns Promise Nuevo Comprobante
 */
export function generarComprobante(comprobante){
    return https.post(`afip/generarComprobante`,comprobante);
}

/**
 * Get
 * @returns Promise Instructivo AFIP
 */
export function getInstructivo(){
    return https.get(`afip/instructivo`);
}


export function getComprobantes(fechas){
    return https.get(`comprobantes`, {params:fechas});
}