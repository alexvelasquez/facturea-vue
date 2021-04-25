export default class Producto{
    /**
     * @param {String} codigo codigo del producto
     * @param {String} descripcion descripcion del producto
     * @param {int} categoria categoria del producto 
     * @param {int} marca marca del producto
     * @param {String} precioCompra precio compra del producto
     * @param {String} cantidad cantidad disponible del producto
     * @param {String} aumento aumento en %, luego se aplicara al precio de compra
     * @param {int} iva % del iva aplicado
     */
    constructor(codigo,descripcion,categoria,marca,precioCompra,cantidad,aumento,iva){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.marca = marca;
        this.precioCompra = precioCompra;
        this.cantidad = cantidad;
        this.aumento = aumento;
        this.iva = iva;
    }

    
}