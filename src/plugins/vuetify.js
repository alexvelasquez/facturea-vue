import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// Translation provided by Vuetify (javascript)
import es from 'vuetify/es5/locale/es'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);
Vue.component('my-component', {
    methods: {
      changeLocale () {
        this.$vuetify.lang.current = 'es'
      },
    },
  })
export default new Vuetify({
    theme: {
      themes: {
        light: {
           primary: '385F73', // #385F73
           secondary: '385F73', // #689F38
           accent:'385F73',
           finish:'689F38',
           cancel:'C62828'
            // #C62828
        },
      },
    },
    lang: {
        locales: { es},
        current: 'es',
      },
});
