<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header" :class="{ completado: laTarea.completada }">
            {{ laTarea.nombre }}
          </div>

          <div class="modal-body lista">
            <div v-if="laTarea.subTareas">
              <div v-for="(subTarea,key) in laTarea.subTareas" :key="key">
                <div class="cabezera-subtarea">
                  {{ subTarea.nombre }}
                  <button class="fas fa-check verificar" id="verificarSubtarea" :title="'Terminar sub-tarea'" 
                  @click="finalizarSubtarea(subTarea)"></button>
                </div>
                <div class="descripcion-subtarea">
                  {{ subTarea.descripcion }}
                </div>
              </div>
            </div>
            <div v-else>
              <div id="descripcion">
                {{ laTarea.descripcion }}
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div v-if="!laTarea.subTareas" id="terminado">
              <button class="fas fa-check verificar" :title="'Terminar tarea'" 
              @click="borrarTarea(); $emit('close')"> Terminar</button>
            </div>
            <div v-else id="terminado">
              <button class="fas fa-check verificar" :class="{ subTareasNoTerminadas: laTarea.subTareas.length > 0 }"
              :title="tituloDeLista" 
              @click="borrarListaTareas()"> Terminar</button>
            </div>
            <button class="modal-default-button" @click="$emit('close')">
                OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['tarea'],
  data() {
      return {
          laTarea: this.tarea,
          tituloDeLista: 'Todavia hay sub-tareas que debes terminar'
      }
  },
  methods: {
    borrarTarea: function(){
      this.$emit('borrar');
    },
    finalizarSubtarea: function(subTarea){
      var indice = this.laTarea.subTareas.indexOf(subTarea);
      this.laTarea.subTareas.splice(indice,1);
      this.$emit('finalizarSubtarea');
      if(this.laTarea.subTareas.length == 0){
        this.tituloDeLista = 'Terminar tarea';        
      }
    },
    borrarListaTareas: function(){
      if(this.laTarea.subTareas.length > 1){
        alert('No puede borrar la lista de tareas porque aún falta tareas');
      }else{
        this.$emit('borrarLista');
        this.$emit('close');
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  height: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header{
  margin-top: 0;
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,.3);
}

.modal-body {
  margin: 20px 0;
  width: 500px;
  height: 320px;
  background-color: rgba(245, 245, 245, 1);
  box-shadow: 0px 0px 3px;
  border-radius: 5px;
}
.lista{
  overflow: auto;
}
button{
  cursor: pointer;

}
.modal-default-button {
  float: right;
  padding: 5px 28px;
  background-color: #FFFFFF;
  border: 0px solid #FFFFFF;
  border-radius: 3px;
  box-shadow: 0px 0px 3px;
  transition: all 600ms;
}
.modal-default-button:hover{
  background-color: rgba(225,225,225,0.7);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.cabezera-subtarea{
  display: block;
  height: 22px;
  background-color: #80CBC4;
  border-radius: 5px 0px 0px 0px;
  border: 1px solid rgba(0,0,0,.3);
}
.descripcion-subtarea{
  display: inline-block;
  background-color: rgb(255,255,255);
}
.completado{
  text-decoration: line-through;
}
#terminado{
  float: left;
}
#verificarSubtarea{
  float: right;
}
.verificar{
  background-color:transparent;
  border: transparent;
  padding: 5px;
  transition: all 500ms;
}
.verificar:hover{
  background-color: rgba(225,225,225,0.7);
}
.subTareasNoTerminadas{
  color: rgba(0,0,0,0.7);
  cursor: default;
  text-decoration: line-through;
}
</style>
