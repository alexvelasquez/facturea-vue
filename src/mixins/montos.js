export default {
  data() {
      return {
        nuevoProducto: {
            cantidad: 1,
            producto: {},
            precio_unitario: 0,
            bonificacion: 0,
            monto_bonif: 0,
            alicuota: {},
            monto_iva: 0,
            subtotal_sin_iva: 0,
            subtotal: 0
        },
        nuevoProductoDefault: {
            cantidad: 1,
            producto: {},
            precio_unitario: 0,
            bonificacion: 0,
            monto_bonif: 0,
            alicuota: {},
            monto_iva: 0,
            subtotal_sin_iva: 0,
            subtotal: 0,
        },
      }
  },
  methods:{
    actualizarMontos() {
        this.nuevoProducto.monto_bonif = this.calculoMontoBonif;
        this.nuevoProducto.subtotal_sin_iva = this.calculoSubtotalSinIva;
        this.nuevoProducto.monto_iva = this.calculoMontoIva;
        this.nuevoProducto.subtotal = this.calculoSubtotal;
    },
  },
  watch: {

          /** si cambia el producto, cambia el subtotal */
          nuevoProductoProducto() {
              if (this.nuevoProductoProducto.producto_id) {
                  this.nuevoProducto.precio_unitario = parseFloat(this.calcularPrecioNeto(this.nuevoProducto.producto));
                  this.actualizarMontos();
              }
          },
          /** si cambia la cantidad, cambia el subtotal */
          nuevoProductoCantidad() {

              /** formateo la cantidad*/
              this.nuevoProducto.cantidad = parseFloat(this.nuevoProductoCantidad);
              if (this.nuevoProductoProducto.producto_id) {
                  this.actualizarMontos();
              }
          },
          /** si cambia el IVA, cambia el subtotal */
          nuevoProductoIva() {
              if (this.nuevoProducto.producto.producto_id && this.nuevoProductoIva.tipo_alicuota_id) {
                  this.actualizarMontos();
              }
          },
          nuevoProductoBonificacion() {
              if (this.nuevoProducto.producto.producto_id) {
                  this.actualizarMontos();
              }
          },

  },
  computed:{
        nuevoProductoProducto: {
          get(){
            return this.nuevoProducto.producto;
          },
          set(value){
            this.nuevoProducto.producto = value;
          }
        },
        nuevoProductoPrecioUnitario:{
          get(){
            return this.nuevoProducto.precio_unitario;
          },
          set(value){
            this.nuevoProducto.precio_unitario = value;
          }
        },
        nuevoProductoCantidad:{
          get(){
            return this.nuevoProducto.cantidad;
          },
          set(value){
            this.nuevoProducto.cantidad = value;
          }
        },
        nuevoProductoIva:{
          get(){
            return this.nuevoProducto.tipo_alicuota ?? {};
          },
          set(value){
            this.nuevoProducto.tipo_alicuota = value;
          }
        },
        nuevoProductoSubtotal:{
          get(){
            return this.nuevoProducto.subtotal ?? 0;
          },
          set(value){
            this.nuevoProducto.subtotal = value;
          }
        },
        nuevoProductoSubtotalSinIva:{
          get(){
            return this.nuevoProducto.subtotal_sin_iva ?? 0;
          },
          set(value){
            this.nuevoProducto.subtotal_sin_iva = value;
          }
        },
        nuevoProductoMontoIva:{
          get(){
            return this.nuevoProducto.monto_iva ?? 0;
          },
          set(value){
            this.nuevoProducto.monto_iva = value;
          }
        },
        nuevoProductoMontoBonif:{
          get(){
            return this.nuevoProducto.monto_bonif ?? 0;
          },
          set(value){
            this.nuevoProducto.monto_bonif = value;
          }
        },
        nuevoProductoBonificacion:{
          get(){
            return this.parseFloatMonto(this.nuevoProducto.bonificacion ?? 0);
          },
          set(value){
            this.nuevoProducto.bonificacion = value;
          }
        },
        nuevoProductoPrecioPorCantidad(){
            return this.parseFloatMonto(parseFloat(this.nuevoProductoPrecioUnitario) * this.nuevoProductoCantidad);
        },
        calculoMontoIva() {
            return this.parseFloatMonto(this.nuevoProductoSubtotalSinIva * (this.nuevoProductoIva.valor ?? 0 / 100));
        },
        calculoMontoBonif() {
            return this.parseFloatMonto(this.nuevoProductoPrecioPorCantidad * (this.nuevoProductoBonificacion / 100)); //parseFloat(parseFloat(parseFloat(((this.nuevoProducto.precio_unitario + this.nuevoProducto.monto_iva).toFixed(2) * this.nuevoProductoCantidad) * (this.nuevoProductoBonificacion / 100)).toFixed(2)));
        },
        calculoSubtotalSinIva() {
            return this.parseFloatMonto(this.nuevoProductoPrecioPorCantidad - this.nuevoProductoMontoBonif);
        },
        calculoSubtotal() {
            return this.parseFloatMonto(this.nuevoProductoSubtotalSinIva + this.nuevoProductoMontoIva) //parseFloat(parseFloat(parseFloat((().toFixed(2) * this.nuevoProductoCantidad) - this.nuevoProducto.monto_bonif).toFixed(2)));
        },
  }
}
