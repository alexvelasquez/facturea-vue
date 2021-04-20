import moment from 'moment';
import store from '../store';
import router from '../router';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields'
export default {
  computed:{
    ...mapFields('user',['data','token']),
    role(){
      return this.data ? this.data.role : '';
    },
    loggedIn(){
      return store.getters['user/getField']('data')
    },
    userName(){
      return `${this.data.name} ${this.data.lastname}`
    },

    // user() {
    //   return store.getters['user/getField']('data') ?? null;
    // },
    colores() {
      return {
        pendiente: "primary",
        realizado: "finish",
        cancelado: "cancel",
        pendientepago: "primary",
        pendientecomprobante:"finish"
      }
    },

  },
  methods: {
    ...mapActions('config',['notificar']),
  
    notificacion(texto,tipo){
      this.notificar({texto:texto,tipo:tipo})
    },
    sweetalert(type,title){
      return  this.$swal({icon: type,title: title,showCancelButton: true});
    },
    notificacionError(){
      this.notificacion('Ha ocurrido un error, intente nuevamente','error');
    },
    /** descargo el comprobante **/
    descargar(url,nombre) {
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
      console.log(`${process.env.VUE_APP_PUBLIC}/uploads/${ruta}`);
      return `${process.env.VUE_APP_PUBLIC}/uploads/${ruta}`
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
     * Formatea el precio con la máscara $ #,## , por ej 5 --> $ 5,00
     *
     * @param {Number} un numero
     */
      precioNeto(value){
      const options = { style: 'currency', currency: 'USD' };
      var monto = (parseFloat(value.precio_compra) + (parseFloat(value.precio_compra) * (parseFloat(value.aumento)/100))).toFixed(2) 
      value = monto ? `${(new Intl.NumberFormat('es-US',options)).format(monto)}` : `$ 0`;
      var numero = value.split('.')
      return `${numero[0].replace(',','.')},${numero[1]}`;
    },
    
    
    /**
     * Formatea el precio con la máscara $ #,## , por ej 5 --> $ 5,00
     *
     * @param {Number} un numero
     */
    formatPrecio(value){
      if(!value) return `$ 0`;
      const options = { style: 'currency', currency: 'USD' };
      value = (typeof value === 'string') ? parseFloat(value) : value;
      value = `${(new Intl.NumberFormat('es-US',options)).format(value)}`;
      var numero = value.split('.')
      return `${numero[0].replace(',','.')},${numero[1]}`;
    },

    /**
     * Formatea el precio con la máscara $ #,## , por ej 5 --> $ 5,00
     *
     * @param {Number} un numero
     */
    descripMovimiento: (value) => (value === 'AUMENTO') ? 'Compra del cliente' : 'Pago del cliente',

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
