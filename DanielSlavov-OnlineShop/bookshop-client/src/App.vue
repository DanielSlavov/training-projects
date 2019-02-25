<template>
  <div id="app">
    <TestInput/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TestInput from './components/TestInput.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    TestInput
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
