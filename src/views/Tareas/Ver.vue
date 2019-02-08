<template>
  <div>
    <aside>
      <ul id="menu">
        <li>
          <router-link to="/tareas/agregar">Agregar</router-link>
        </li>
        <li>
          <router-link to="/tareas/ver">Ver</router-link>
        </li>
      </ul>
      <router-view/>
    </aside>
    <section>
      <div v-if="!hayTareas">
        <p>Aún no hay tareas agregadas</p>
      </div>
      <div v-if="hayTareas">
        <button
          :disabled="paginaActual == 0"
          id="atras"
          class="fas fa-arrow-left"
          @click="paginaActual--"
        ></button>
        <button
          :disabled="paginaActual == tareas.length - 1"
          id="adelante"
          class="fas fa-arrow-right"
          @click="paginaActual++"
        ></button>
        <transition-group name="mover-pagina">
          <div
            class="sobres"
            v-for="(tarea) in tareas[paginaActual].tareasDePagina"
            :key="tarea.id"
            @click="showModal = true; tareaSeleccionada(tarea)"
            :title="tarea.nombre"
          >
            <span id="nombreTarea">{{ tarea.nombre }}</span>
            <span id="espaciador"></span>
          </div>
        </transition-group>
        <modal
          v-if="showModal"
          @close="showModal = false"
          :tarea="tareaActual"
          @borrar="borrarTarea()"
          @finalizarSubtarea="borrarSubtarea"
          @borrarLista="borrarTarea()"
        />
      </div>
    </section>
  </div>
</template>

<script>
import modal from "./../../components/Modal/modal.vue";

export default {
  components: { modal },
  data() {
    return {
      tareas: [],
      paginador: [],
      paginaActual: 0,
      tareaActual: "",
      hayTareas: false,
      showModal: false
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("tareas"))) {
      this.paginador = JSON.parse(localStorage.getItem("tareas"));
      var paginas = Math.floor(this.paginador.length / 12);
      var restantes = this.paginador.length % 12;
      for (let i = 0; i < paginas; i++) {
        this.tareas.push({
          pagina: i,
          tareasDePagina: this.paginador.splice(0, 12)
        });
      }
      this.tareas.push({
        pagina: paginas + 1,
        tareasDePagina: this.paginador.splice(0, restantes)
      });
      this.hayTareas = true;
    }
  },
  methods: {
    tareaSeleccionada: function(tarea) {
      this.tareaActual = tarea;
    },
    borrarSubtarea: function() {
      localStorage.setItem("tareas", JSON.stringify(this.tareas));
    },
    borrarTarea: function() {
      var indice = this.tareas[this.paginaActual].tareasDePagina.indexOf(
        this.tareaActual
      );
      this.tareas[this.paginaActual].tareasDePagina.splice(indice, 1);
      var tareasFaltantes = [];
      this.tareas.forEach(function(element) {
        element.tareasDePagina.forEach(function(t) {
          tareasFaltantes.push(t);
        });
      });
      localStorage.setItem("tareas", JSON.stringify(tareasFaltantes));
    }
  }
};
</script>

<style scoped>
#menu li {
  margin-top: 10px;
}
aside {
  display: inline-block;
  float: left;
  width: 15%;
  height: 600px;
  margin-top: 10px;
  background-color: rgba(245, 245, 245, 1);
  box-shadow: 0px 0px 2px;
}
a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  transition: all 300ms;
}
a:hover {
  color: rgba(0, 0, 0, 0.7);
}
section {
  display: inline-block;
  background-color: rgba(245, 245, 245, 0.5);
  box-shadow: 0px 0px 2px;
  margin-left: 8px;
  width: 1140px;
  height: 600px;
  margin-top: 10px;
}
.sobres {
  display: inline-block;
  cursor: pointer;
  margin: 21px;
  margin-top: 28px;
  margin-left: 49px;
  width: 285px;
  height: 100px;
  background-color: #80cbc4;
  box-shadow: 0px 0px 2px;
  transition: all 200ms;
}
.sobres:hover {
  box-shadow: 0px 0px 7px;
  transform: scale(1.009);
}
#nombreTarea {
  display: block;
}
#espaciador {
  display: block;
  position: relative;
  top: 66px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}
#atras,
#adelante {
  height: 600px;
  width: 25px;
  background-color: rgba(245, 245, 245, 0);
  border: 1px solid rgba(245, 245, 245, 0.5);
  transition: all 500ms;
}
#atras {
  float: left;
}
#adelante {
  float: right;
}
#atras:hover,
#adelante:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.mover-pagina-enter-active {
  transition: all 400ms ease-out;
}
.mover-pagina-leave-active {
  transition: all 300ms ease-in;
  position: absolute;
  z-index: -1;
}
.mover-pagina-enter,
.mover-pagina-leave-to {
  opacity: 0;
}
</style>
