<template>
  <div>
    <aside>
      <ul id="menu">
        <li><a @click="refrescar()">Agregar</a></li>
        <li><router-link to="/tareas/ver">Ver</router-link></li>
      </ul>
      <router-view/>
    </aside>
    <section v-if="!agregado">
      <h1>Agregar Tarea</h1>
      <form>
        <div id="texto">
          <input type="text" placeholder="Nombre de la tarea" v-model="nombre" required>
          <br>
          <span id="mensaje-lista">Hacerla en forma de lista</span>
          <input type="checkbox" v-model="confirmacion" @click="conListas()">
          <span id="mensaje-confirmacion">{{ mensaje }}</span>
          <br>
          <button @click.prevent="agregarNombre()">Aceptar</button>
        </div>
      </form>
    </section>
    <section v-else>
      <Normal v-if="!confirmacion" :nombreTarea="nombre"/>
      <Lista v-if="confirmacion" :nombreTarea="nombre"/>
    </section>
  </div>
</template>

<script>
import Lista from './Lista.vue';
import Normal from './Normal.vue';

export default {
  components: {
    Lista,
    Normal
  },
  data() {
    return {
      confirmacion: '',
      mensaje: 'No',
      nombre: '',
      agregado: false,
    };
  },
  methods: {
    conListas: function() {
      if (!this.confirmacion) {
        this.mensaje = "Si";
      } else {
        this.mensaje = "No";
      }
    },
    agregarNombre: function(){
      if(this.nombre){
        this.agregado = !this.agregado;
      }
    },
    refrescar: function(){
      location.reload(true);
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
a{
  cursor: pointer;
  text-decoration: none;
  color: rgb(0,0,0);
  transition: all 300ms;
}
a:hover{
  color: rgba(0,0,0,.7);
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
#mensaje-lista {
  font-size: 20px;
  position: relative;
  right: 110px;
}
#texto {
  text-align: center;
}
form{
  position: relative;
  top: 150px;
}
h1{
  text-align: center;
  position: relative;
  top: 150px;
}
input[type="text"] {
  width: 300px;
  text-align: center;
  padding: 5px;
  margin: 10px;
  font-size: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid gray;
  box-shadow: 0px 0px 1px;
}
input[type="checkbox"] {
  margin-bottom: 20px;
  position: relative;
  right: 60px;
}
#mensaje-confirmacion{
  position: relative;
  right: 60px;
}
button{
  padding: 12px 45px;
  background-color: #FFFFFF;
  border: 0px solid #FFFFFF;
  border-radius: 3px;
  box-shadow: 0px 0px 3px;
  cursor: pointer;
  transition: all 600ms;
}
button:hover{
  background-color: rgba(225,225,225,0.7);
}
</style>
