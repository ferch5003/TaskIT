<template>
    <div>
        <h1>Agregar descripción</h1>
        <div id="subtareas">
            <h1>Subtarea/s</h1>
            <select @change="cambiarValores()" v-model="subTareaAActualizar" id="seleccionarSubTarea">
                <option value="nada">Nada</option>
                <option v-for="(subTarea,key,index) in subTareas" :key="index"
                :value="subTarea">{{ subTarea.nombre }}</option>
            </select>
        </div>
        <div id="texto">
            <div id="form">
                <input type="text" v-model="nombreSubTarea" 
                placeholder="Nombre de la subtarea" required
                @keyup.enter="guardarSubTarea()"><br>
                <textarea v-model="descripcion" placeholder="Descripción" required></textarea><br>
                <button :disabled="actualizar" @click="guardarSubTarea()">Agregar</button>
                <button :disabled="!actualizar" @click="actualizarSubTarea()">Actualizar</button>
                <button :disabled="actualizar" @click="guardarTarea()">Guardar</button><br>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['nombreTarea'],
    data(){
        return {
            descripcion: '',
            nombreSubTarea: '',
            subTareas: [],
            subTareaAActualizar: '',
            tareas: [],
            agregado: false,
            actualizar: false,
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
            this.tareas.push({ id: this.id, nombre: this.nombreTarea, subTareas: this.subTareas });
            localStorage.setItem("tareas",JSON.stringify(this.tareas));
            location.reload(true);
        },
        guardarSubTarea: function(){
            this.agregado = true;
            this.subTareas.push({ nombre: this.nombreSubTarea, descripcion: this.descripcion});
            this.descripcion = '';
            this.nombreSubTarea = '';
        },
        cambiarValores: function(){
            if(this.subTareaAActualizar == 'nada'){
                this.nombreSubTarea = '';
                this.descripcion = '';
            }else{
                var indice = this.subTareas.indexOf(this.subTareaAActualizar);
                this.nombreSubTarea = this.subTareas[indice].nombre;
                this.descripcion = this.subTareas[indice].descripcion;
                this.actualizar = true;
                document.querySelector('#seleccionarSubTarea').disabled = true;
            }
        },
        actualizarSubTarea: function(){
            var indice = this.subTareas.indexOf(this.subTareaAActualizar);
            this.subTareas[indice].nombre = this.nombreSubTarea;
            this.subTareas[indice].descripcion = this.descripcion;
            this.nombreSubTarea = '';
            this.descripcion = '';
            this.subTareaAActualizar = '';
            this.actualizar = false;
            document.querySelector('#seleccionarSubTarea').disabled = false;            
        }
    }
}
/* 
tareas = [
    {
        nombre: '',
        subTareas: {
            {
                nombre: '',
                descripcion: '',
                completada: false
            }
        }
    },
    {
        nombre: '',
        subTareas: [
                {
                    nombre: '',
                    descripcion: '',
                    completada: false
                }
            ]
        }
    }
]
*/
</script>

<style scoped>
h1{
  text-align: center;
  position: relative;
  top: 150px;
}
#subtareas{
    float: right;
    position: relative;
    bottom: 66px;
    margin-right: 220px;
}
select{
    position: relative;
    top: 150px;
    width: 180px;
    background-color: #FFFFFF;
    border-style: hidden;
    border: 1px solid rgba(0, 0, 0, 0.5);
}
#texto{
    text-align: center;
    margin-top: 160px;
}
textarea,
input[type="text"]{
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
input[type="text"]{
    height: 20px;
    margin-bottom: 5px;
}
button{
  padding: 12px 45px;
  background-color: #FFFFFF;
  border: 0px solid #FFFFFF;
  border-radius: 3px;
  box-shadow: 0px 0px 3px;
  cursor: pointer;
  transition: all 600ms;
  margin-left: 15px;
}
button:hover{
  background-color: rgba(225,225,225,0.7);
}
</style>