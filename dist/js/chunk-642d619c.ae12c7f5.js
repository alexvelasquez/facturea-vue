(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-642d619c"],{"0798":function(e,t,a){"use strict";a("caad");var o=a("5530"),r=a("ade3"),i=(a("0c18"),a("10d2")),s=a("afdd"),n=a("9d26"),l=a("f2e7"),c=a("7560"),d=a("2b0e"),u=d["a"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),m=a("58df"),p=a("d9bd");t["a"]=Object(m["a"])(i["a"],l["a"],u).extend({name:"v-alert",props:{border:{type:String,validator:function(e){return["top","right","bottom","left"].includes(e)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator:function(e){return"string"===typeof e||!1===e}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:function(e){return["info","error","success","warning"].includes(e)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder:function(){if(!this.border)return null;var e={staticClass:"v-alert__border",class:Object(r["a"])({},"v-alert__border--".concat(this.border),!0)};return this.coloredBorder&&(e=this.setBackgroundColor(this.computedColor,e),e.class["v-alert__border--has-color"]=!0),this.$createElement("div",e)},__cachedDismissible:function(){var e=this;if(!this.dismissible)return null;var t=this.iconColor;return this.$createElement(s["a"],{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(){return e.isActive=!1}}},[this.$createElement(n["a"],{props:{color:t}},this.closeIcon)])},__cachedIcon:function(){return this.computedIcon?this.$createElement(n["a"],{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes:function(){var e=Object(o["a"])(Object(o["a"])({},i["a"].options.computed.classes.call(this)),{},{"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text});return this.border&&(e["v-alert--border-".concat(this.border)]=!0),e},computedColor:function(){return this.color||this.type},computedIcon:function(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$".concat(this.type))},hasColoredIcon:function(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText:function(){return this.text||this.outlined},iconColor:function(){return this.hasColoredIcon?this.computedColor:void 0},isDark:function(){return!(!this.type||this.coloredBorder||this.outlined)||c["a"].options.computed.isDark.call(this)}},created:function(){this.$attrs.hasOwnProperty("outline")&&Object(p["a"])("outline","outlined",this)},methods:{genWrapper:function(){var e=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],t={staticClass:"v-alert__wrapper"};return this.$createElement("div",t,e)},genContent:function(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert:function(){var e={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){var t=this.hasText?this.setTextColor:this.setBackgroundColor;e=t(this.computedColor,e)}return this.$createElement("div",e,[this.genWrapper()])},toggle:function(){this.isActive=!this.isActive}},render:function(e){var t=this.genAlert();return this.transition?e("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[t]):t}})},"0c18":function(e,t,a){},a55b:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("login-component")],1)},r=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-row",[a("v-col",{staticClass:"text-h5 font-weight-black white--text",attrs:{cols:"12",align:"center"}},[a("p",[a("img",{staticStyle:{"margin-bottom":"-15px"},attrs:{src:e.logo}}),a("span",[e._v("CON FACTUREA, MANEJAR TU NEGOCIO ES OTRA COSA")])])])],1),a("v-card",{staticClass:"mx-auto mt-10",attrs:{"max-width":"400",outlined:""}},[a("v-form",{ref:"form"},[a("v-row",{staticClass:"mt-10"},[a("v-col",{staticClass:"text-oveline",attrs:{cols:"12",align:"center"}},[a("p",[e._v("Iniciar Sesión")])]),a("v-col",{staticClass:"text-oveline py-0 mt-10",attrs:{cols:"12",align:"center"}},[a("v-text-field",{staticClass:"px-5",attrs:{rules:e.obligatorio,label:"Usuario",placeholder:"nombre de usuario",dense:"",outlined:""},model:{value:e.auth._username,callback:function(t){e.$set(e.auth,"_username",t)},expression:"auth._username"}})],1),a("v-col",{staticClass:"text-oveline py-0",attrs:{cols:"12",align:"center"}},[a("v-text-field",{staticClass:"px-5",attrs:{rules:e.obligatorio,type:"password",label:"Contraseña",placeholder:"Ingrese contraseña",outlined:"",dense:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.login()}},model:{value:e.auth._password,callback:function(t){e.$set(e.auth,"_password",t)},expression:"auth._password"}})],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12",md:"12",align:"center"}},[a("v-btn",{staticClass:"mb-2 mr-md-2",attrs:{outlined:"",color:"#385F73",dark:""},on:{click:function(t){return e.login()}}},[e._v("Iniciar sesión")]),a("modal-registro",{attrs:{dialog:e.dialog},on:{"cerrar-dialog":function(t){e.dialog=!1},click:function(t){e.dialog=!0}}}),a("br"),a("a",[a("p",{staticClass:"text-subtitle-2",attrs:{color:"#385F73"},on:{click:function(t){e.dialogRecuperar=!0}}},[e._v("¿Olvidaste tu contraseña?")])])],1)],1),a("v-row",[a("modal-recuperar-clave",{attrs:{dialog:e.dialogRecuperar},on:{"cerrar-dialog":function(t){e.dialogRecuperar=!1}}})],1)],1)],1)},s=[],n=(a("b0c0"),a("9d64")),l=a.n(n),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{"max-width":"600px",persistent:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,r=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mb-2 mr-md-2",attrs:{outlined:"",color:"#385F73",dark:""}},"v-btn",r,!1),o),[e._v(" CREAR CUENTA")])]}}]),model:{value:e.dialogRegister,callback:function(t){e.dialogRegister=t},expression:"dialogRegister"}},[a("v-card",[a("v-tabs",{attrs:{"background-color":"transparent",color:"#385F73",grow:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab",[e._v("REGISTRARME")])],1),a("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab-item",[a("v-card",{attrs:{flat:""}},[a("v-form",{ref:"form"},[a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{staticStyle:{"margin-bottom":"-25px"},attrs:{cols:"12",md:"6"}},[a("v-text-field",{attrs:{rules:e.reglasValidacion.campoRequerido,label:"Nombre",placeholder:"Ingrese su nombre",outlined:"",dense:""},model:{value:e.registro.name,callback:function(t){e.$set(e.registro,"name",t)},expression:"registro.name"}})],1),a("v-col",{staticStyle:{"margin-bottom":"-25px"},attrs:{cols:"12",md:"6"}},[a("v-text-field",{attrs:{rules:e.reglasValidacion.campoRequerido,label:"Apellido",placeholder:"Ingrese su apellido",outlined:"",dense:""},model:{value:e.registro.lastname,callback:function(t){e.$set(e.registro,"lastname",t)},expression:"registro.lastname"}})],1),a("v-col",{staticStyle:{"margin-bottom":"-25px"},attrs:{cols:"12",md:"6"}},[a("v-text-field",{attrs:{rules:e.reglasValidacion.campoRequerido,label:"Nombre de usuario",placeholder:"Ingrese su nombre de usuario",outlined:"",dense:""},model:{value:e.registro.username,callback:function(t){e.$set(e.registro,"username",t)},expression:"registro.username"}})],1),a("v-col",{staticStyle:{"margin-bottom":"-25px"},attrs:{cols:"12",md:"6"}},[a("v-text-field",{attrs:{rules:e.reglasValidacion.emailRules,label:"Email",placeholder:"Ingrese un email",outlined:"",dense:""},model:{value:e.registro.email,callback:function(t){e.$set(e.registro,"email",t)},expression:"registro.email"}})],1),a("v-col",{staticStyle:{"margin-bottom":"-25px"},attrs:{cols:"12",md:"6"}},[a("v-text-field",{attrs:{"append-icon":e.show?"mdi-eye":"mdi-eye-off",type:e.show?"text":"password",rules:e.reglasValidacion.campoRequerido,label:"Contraseña",placeholder:"Ingrese una contraseña",outlined:"",dense:""},on:{"click:append":function(t){e.show=!e.show}},model:{value:e.registro.password,callback:function(t){e.$set(e.registro,"password",t)},expression:"registro.password"}})],1),a("v-col",{staticStyle:{"margin-bottom":"-25px"},attrs:{cols:"12",md:"6"}},[a("v-text-field",{attrs:{"append-icon":e.show1?"mdi-eye":"mdi-eye-off",type:e.show1?"text":"password",rules:e.reglasValidacion.claveSimilar,label:"Repetir contraseña",placeholder:"Repetir contraseña",outlined:"",dense:""},on:{"click:append":function(t){e.show1=!e.show1}},model:{value:e.repetirClave,callback:function(t){e.repetirClave=t},expression:"repetirClave"}})],1)],1)],1)],1)],1),a("v-card-actions",{staticClass:"pt-md-0"},[a("v-spacer"),a("v-btn",{attrs:{color:"#385F73",text:""},on:{click:function(t){return e.cerrarDialog()}}},[e._v("CANCELAR")]),a("v-btn",{attrs:{color:"#385F73",text:""},on:{click:function(t){return e.registrarme()}}},[e._v("REGISTRAR")])],1)],1)],1)],1)],1)],1)},d=[],u={props:{dialog:{type:Boolean}},data:function(){return{show:!1,show1:!1,files:[],aliCuotas:[],registro:{},model:null,allow:!1,tab:null,activar:!0,repetirClave:null,dialogRegister:this.dialog}},methods:{registrarme:function(){var e=this;this.$refs.form.validate()&&(this.dialogRegister=!1,axios.post("register",this.registro).then((function(t){e.notificacion("Registrado correctamente","success")})).catch((function(t){e.dialogRegister=!0,e.notificacion(t.response.data.message,"error"),e.$store.dispatch("loading",!1)})))},cerrarDialog:function(){this.dialogRegister=!1,this.$emit("cerrar-dialog")}},watch:{dialog:function(){this.$refs.form&&this.$refs.form.reset(),this.dialogRegister=this.dialog}},computed:{reglasValidacion:function(){var e=this;return{campoRequerido:[function(e){return!!e||"Este campo es requerido"}],emailRules:[function(e){return!!e||"Este campo es requerido"},function(e){return/.+@.+\..+/.test(e)||"Email no valido"}],claveSimilar:[function(e){return!!e||"Este campo es requerido"},function(t){return e.registro.password==e.repetirClave||"Las contraseñas no coindicen"}]}}}},m=u,p=a("2877"),v=a("6544"),g=a.n(v),h=a("8336"),f=a("b0af"),b=a("99d9"),x=a("62ad"),C=a("a523"),_=a("169a"),w=a("4bd4"),y=a("0fd9"),k=a("2fa4"),V=a("71a3"),$=a("c671"),R=a("fe57"),E=a("aac8"),S=a("8654"),I=Object(p["a"])(m,c,d,!1,null,null,null),A=I.exports;g()(I,{VBtn:h["a"],VCard:f["a"],VCardActions:b["a"],VCardText:b["c"],VCol:x["a"],VContainer:C["a"],VDialog:_["a"],VForm:w["a"],VRow:y["a"],VSpacer:k["a"],VTab:V["a"],VTabItem:$["a"],VTabs:R["a"],VTabsItems:E["a"],VTextField:S["a"]});var B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-tabs",{attrs:{"background-color":"transparent",color:"#385F73",grow:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab",[e._v("Recuperar Contraseña")])],1),a("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab-item",[a("v-card",{attrs:{flat:""}},[a("v-form",{ref:"form"},[a("v-card-text",[a("v-container",[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("v-alert",{attrs:{dense:"",outlined:"",type:"info",color:"#385F73"}},[e._v(" Las credenciales serán enviadas al correo electrónico con el que se registró. ")])],1),a("v-col",{attrs:{cols:"12"}},[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Email",type:"email",color:"#385F73",placeholder:"Ingresar email",rules:e.obligatorio,outlined:"",dense:""},model:{value:e.recuperar.email,callback:function(t){e.$set(e.recuperar,"email",t)},expression:"recuperar.email"}})],1)],1)],1)],1)],1)],1),a("v-card-actions",{staticClass:"pt-md-0"},[a("v-spacer"),a("v-btn",{attrs:{color:"#385F73",text:""},on:{click:e.cerrar}},[e._v("CANCELAR")]),a("v-btn",{attrs:{color:"#385F73",text:""},on:{click:e.recuperarClave}},[e._v("RECUPERAR")])],1)],1)],1)],1)],1),a("v-overlay",{attrs:{absolute:!0,value:e.busqueda}},[a("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1)],1)},T=[],O={props:{dialog:{type:Boolean,default:!1}},data:function(){return{tab:null,show:!1,show1:!1,recuperar:{email:null},busqueda:!1,obligatorio:[function(e){return!!e||"Este campo es requerido"}]}},methods:{recuperarClave:function(){var e=this;this.$refs.form.validate()&&(this.busqueda=!0,axios.put("usuario/recuperarClave",this.recuperar).then((function(t){e.busqueda=!1,t.response&&e.notificacion(t.response.data.message,"error"),200==t.data.code&&(e.notificacion("Credenciales enviadas","success"),e.$emit("cerrar-dialog"),e.$refs.form.reset())})))},cerrar:function(){this.$refs.form.reset(),this.$emit("cerrar-dialog")}}},F=O,q=a("0798"),N=a("a797"),D=a("490a"),j=Object(p["a"])(F,B,T,!1,null,null,null),U=j.exports;g()(j,{VAlert:q["a"],VBtn:h["a"],VCard:f["a"],VCardActions:b["a"],VCardText:b["c"],VCol:x["a"],VContainer:C["a"],VDialog:_["a"],VForm:w["a"],VOverlay:N["a"],VProgressCircular:D["a"],VRow:y["a"],VSpacer:k["a"],VTab:V["a"],VTabItem:$["a"],VTabs:R["a"],VTabsItems:E["a"],VTextField:S["a"]});var L={components:{ModalRegistro:A,ModalRecuperarClave:U},data:function(){return{logo:l.a,auth:{},dialog:!1,dialogRecuperar:!1,obligatorio:[function(e){return!!e||"Este campo es requerido"}]}},methods:{login:function(){var e=this;this.$refs.form.validate()&&axios.post("login_check",this.auth).then((function(t){if(t.response)401==t.response.data.code&&"Invalid credentials."==t.response.data.message&&e.notificacion("Credenciales invalidas","error");else{var a=t.data.token;e.$store.commit("setToken",a),axios.get("currentUser").then((function(t){var o=t.data.user,r=e.configurarNegocio(t.data.user.negocio);delete o.negocio,e.$store.commit("setUser",o),e.$store.commit("setNegocio",r),localStorage.setItem("access_token",a),localStorage.setItem("user",JSON.stringify(o)),localStorage.setItem("negocio",JSON.stringify(r)),e.notificacion("BIENVENIDO ".concat(o.name.toUpperCase()," "),"success"),e.$router.push("/")})).catch((function(t){e.$store.commit("setToken",null),e.notificacion("Error al recuperar los datos del usuario.","error")}))}})).catch((function(t){e.notificacion("Ha ocurrido un error")}))},configurarNegocio:function(e){var t,a,o,r,i,s,n,l,c,d,u,m,p;return e.razon_social=null!==(t=e.razon_social)&&void 0!==t?t:null,e.nombre_fantasia=null!==(a=e.nombre_fantasia)&&void 0!==a?a:null,e.email=null!==(o=e.email)&&void 0!==o?o:null,e.direccion=null!==(r=e.direccion)&&void 0!==r?r:null,e.cuit_cuil=null!==(i=e.cuit_cuil)&&void 0!==i?i:null,e.iibb=null!==(s=e.iibb)&&void 0!==s?s:null,e.logo=null!==(n=e.logo)&&void 0!==n?n:null,e.punto_vta=null!==(l=e.punto_vta)&&void 0!==l?l:null,e.telefono=null!==(c=e.telefono)&&void 0!==c?c:null,e.inicio_actividad=null!==(d=null!==(u=e.inicio_actividad)&&void 0!==u?u:moment(e.inicio_actividad).format("YYYY-MM-DD"))&&void 0!==d?d:null,e.localidad=null!==(m=e.localidad)&&void 0!==m?m:{provincia:{provincia_id:null},localidad_id:null},e.condicion_iva=null!==(p=e.condicion_iva)&&void 0!==p?p:{condicion_iva_id:null},e}}},M=L,J=Object(p["a"])(M,i,s,!1,null,null,null),Y=J.exports;g()(J,{VBtn:h["a"],VCard:f["a"],VCol:x["a"],VForm:w["a"],VRow:y["a"],VTextField:S["a"]});var z={components:{LoginComponent:Y}},G=z,P=Object(p["a"])(G,o,r,!1,null,null,null);t["default"]=P.exports}}]);
//# sourceMappingURL=chunk-642d619c.ae12c7f5.js.map