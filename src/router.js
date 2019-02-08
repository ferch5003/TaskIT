import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './views/Inicio/Inicio.vue';
import Tareas from './views/Tareas/Tareas.vue';
import Ver from './views/Tareas/Ver.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/tareas/agregar',
      name: 'tareas-agregar',
      component: Tareas
    },
    {
      path: '/tareas/ver',
      name: 'tareas-ver',
      component: Ver
    }
  ]
})
