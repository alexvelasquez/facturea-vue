import moment from 'moment';
import store from '../store';
import router from '../router';
export default {
  computed:{
    estadoPendiente(){
      return 1
    },
    estadoRealizado(){
      return 2
    },
    estadoCancelado(){
      return 4
    },
    estadoPagado(){
      return 3
    },
    estadoPendientePago(){
      return 5
    },
    consumidorFinal(){
      return 3
    },
    otroDocumento(){
      return 6
    },
    facturaElectronicaRegistrada(){
      return store.getters.facturaElectronicaRegistrada ?? null
    },
    esResponsableInscripto(){
      return store.getters.responsableInscripto ?? null;
    },
    negocio() {
            return this.$store.getters.negocio
    },
  },
  methods: {
    notificacion(texto,tipo){
      store.dispatch('notificacion',{
        activo:true,
        texto:texto,
        tipo:tipo
      })
    },
    //
    // loading(value){
    //   store.dispatch('loading',value)
    // },
    /** descargo el comprobante **/
    exportar(url,nombre) {
        axios.get(url)
            .then((response) => {
                const link = document.createElement('a');
                link.href = response.data.data.file;
                link.setAttribute('download', nombre);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                this.notificacion('Ha ocurrido un error', 'error');
            });
    },

    formatMoment(date){
      return momemt(date).format('DD/MM/YYYY')
    },
    redirect(link){
      router.push(link).catch(()=>{});
    },
    ordenar(data){
      return data.sort((a,b) => (a.descripcion > b.descripcion) ? 1 : ((b.descripcion > a.descripcion) ? -1 : 0));
    },
    urlImage(ruta){
      return `http://localhost/api-facturea/public/uploads/${ruta}`
    },
    calcularPrecioNeto(producto){
      return (parseFloat(producto.precio_compra) + (parseFloat(producto.precio_compra) * (parseFloat(producto.aumento)/100))).toFixed(2)
    },
    parseFloatMonto(number){
      return parseFloat(parseFloat(number).toFixed(2));
    },
    sumarDias(fecha, dias){
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },
    zfill(number, width) {
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */
        var zero = "0"; /* String de cero */

        if (width <= length) {
            if (number < 0) {
                 return ("-" + numberOutput.toString());
            } else {
                 return numberOutput.toString();
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString());
            }
        }
    }
  },
  filters: {
        /**
         * Formatea el numero con la máscara #.## %, por ej 5 --> 5.00 %
         *
         * @param {Number} un numero
         */
        precioNeto: (value) => (parseFloat(value.precio_compra) + (parseFloat(value.precio_compra) * (parseFloat(value.aumento)/100))).toFixed(2) ,
        /**
         * Formatea el precio con la máscara $ #,## , por ej 5 --> $ 5,00
         *
         * @param {Number} un numero
         */
        formatPrecio: (value) => value ? '$ '+value.toFixed(2).replace('.', ',') : '$ 0',

        /**
         * Formatea el number con la máscara  #,## , por ej 5 --> 5,00
         *
         * @param {Number} un numero
         */
        formatNumber: (value) => value ? parseFloat(value).toFixed(2).replace('.', ',') : 0,

        /**
         * Formatea el number con la máscara  #,## , por ej 5 --> 5,00
         *
         * @param {Number} un numero
         */
        number: (value) => value ? value : 0,

        /**
         * Devuelve una fecha con formato
         *
         * @param {String} dateTime
         */
        formatDateTime: (value) => moment(String(value)).format('DD/MM/YYYY HH:mm'),
        /**
         * Devuelve una fecha con formato
         *
         * @param {String} dateTime
         */
        formatDate: (value) => moment(value).format('DD/MM/YYYY'),

        /**
         * capitalize
         *
         * @param {String} descripcion
         */
        capitalize: (value) => value.charAt(0).toUpperCase()+value.slice(1).toLowerCase(),
        /**
         * lowercase
         *
         * @param {String} descripcion
         */
        lowerCase: (value) => value.toLowerCase(),

        /**
         * lowercase
         *
         * @param {String} descripcion
         */
        upper: (value) => value.toUpperCase(),

        /**
         * lowercase
         *
         * @param {String} descripcion
         */
        numeroComprobante: (value) => value.lpad("0",8),

        /**
         * Devuelve un cuit cuil con guiones
         *
         * @param {String} dateTime
         */
        formatCuitCuil: (value) => value.toString().substr(0,2)+'-'+value.toString().substr(-9,8)+'-'+value.toString().substr(-1),

  },
}
