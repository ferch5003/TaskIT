<template>
  <div>
    <nav id="navegacion">
        <ul>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/tareas/agregar">Tareas</router-link></li>
        </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>

</script>

<style scoped>
*{
    margin: 0px;
    padding: 0px;
}
#navegacion {
    background-color: #ffffff;
    box-shadow: 0px 0px 3px black; 
}
#navegacion ul li{
    display: inline-block;
    transition: all 500ms;
}
#navegacion ul li:hover,
nav a.router-link-exact-active{
    background-color: rgba(238,238,238,1);
}
a{
    text-decoration: none;
    display: block;
    max-width: 455px;
    width: 100px;
    padding: 13px 0px;
    text-align: center;
    color: black;
    cursor: pointer;
}

</style>
