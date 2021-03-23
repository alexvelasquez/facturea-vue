import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/configuracion',
      name: 'Empresa',
      component: () => import('../views/Empresa.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/comprobantes',
      name: 'comprobante',
      component: () => import('../views/Comprobantes.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/productos',
      name: 'Productos',
      component: () => import('../views/Productos.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/marcas',
      name: 'Marcas',
      component: () => import('../views/Marcas.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/categorias',
      name: 'Categorias',
      component: () => import('../views/Categorias.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: () => import('../views/Clientes.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/clientes/cuentacorriente/:cliente',
      name: 'CuentaCorriente',
      component: () => import('../views/CuentaCorriente.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/clientes/compras/:cliente',
      name: 'ComprasCliente',
      component: () => import('../views/ComprasCliente.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: () => import('../views/Pedidos.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pedidos/nuevo',
      name: 'NuevoPedido',
      component: () => import('../views/NuevoPedido.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pedidos/editar/:pedido',
      name: 'EditarPedido',
      component: () => import('../views/EditarPedido.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/facturacion',
      name: 'Facturacion',
      component: () => import('../views/Facturacion.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/facturacion/:pedido',
      name: 'FacturacionPedido',
      component: () => import('../views/FacturacionPedido.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('../views/Usuarios.vue'),
      meta: {
        requiresAdmin: true
      }
    },
    // {
    //   path: '/notificaciones',
    //   name: 'Notificacion',
    //   component: () => import('../views/Login.vue'),
    //   meta: {
    //     requiresAdmin: true
    //   }
    // },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../components/auth/Logout.vue')
    }
]


const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.loggedIn) {
          next({
              name: 'Login'
          })
      }
      if (store.getters.getUserRol == 'ROLE_ADMIN') {
          next({
              name: 'Usuarios'
          })
      }
      else{
        next()
      }
  }  else if (to.matched.some(record => record.meta.requiresAdmin)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.loggedIn) {
            next({
                name: 'Login'
            })
        }
        else{
          next()
        }
    }
   else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (store.getters.loggedIn) {
          next({
              name: (store.getters.getUserRol == 'ROLE_USER') ? 'Home' : 'Usuarios'
          })
      }
      if (store.getters.getUserRol == 'ROLE_USER') {
          next({
              name: 'Home'
          })
      }
      else {
          next()
      }
  } else {
      if(to.name == 'Logout'){
        next()
      }
      else{
        next({
          name: (store.getters.getUserRol == 'ROLE_USER') ? 'Home' : 'Usuarios'
        })
      }
  }
})
export default router
