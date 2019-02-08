<template>
    <div>
        <h1>Agregar descripción</h1>
        <div id="texto">
            <div>
                <textarea v-model="descripcion" required></textarea><br>
                <button @click="guardarTarea()">Guardar</button><br>
            </div>
            {{ $data }}
        </div>
    </div>
</template>

<script>
export default {
    props: ['nombreTarea'],
    data(){
        return {
            descripcion: '',
            tareas: [],
            id: 0
        }
    },
    created(){
        if(localStorage.getItem("tareas")){
            this.tareas = JSON.parse(localStorage.getItem("tareas"));  
            this.id = this.tareas.length;
        }
    },
    methods: {
        guardarTarea: function(){
            this.tareas.push({ id: this.id, nombre: this.nombreTarea, descripcion: this.descripcion });
            localStorage.setItem("tareas",JSON.stringify(this.tareas));
            location.reload(true);
        }
    }
}
</script>

<style scoped>
h1{
  text-align: center;
  position: relative;
  top: 150px;
}
#texto{
    text-align: center;
    margin-top: 160px;
}
textarea{
    width: 300px;
    height: 100px;
    resize: none;
    padding: 5px;
    margin: 10px;
    font-size: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid gray;
    box-shadow: 0px 0px 1px;
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

