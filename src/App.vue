<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "蒙黑体";
  font-display:block;
  src: url("./assets/font/LeefontMHT.ttf");
}

/*@font-face {*/
/*  font-family: "品如体";*/
/*  src: url("./assets/font/品如手写体.ttf");*/
/*}*/

/*@font-face {*/
/*  font-family: "云峰体";*/
/*  src: url("./assets/font/云峰静龙行书.ttf");*/
/*}*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 15px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>

</script>