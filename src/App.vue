<script setup lang="ts">
import { ref } from 'vue'
import SeptimaSearch from './components/SeptimaSearch.vue'

defineProps<{
  controller: unknown
}>()

const result = ref()
</script>

<template>
  <div id="search">
    <SeptimaSearch :controller="controller" @selectresult="result = $event"></SeptimaSearch>
  </div>
  <pre id="result">{{ JSON.stringify(result, null, '\t') }}</pre>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}
html,
body {
  width: 100%;
}
#app {
  display: flex;
  align-items: stretch;
  width: 100%;
  margin: 0 0;
  padding: 2rem;
  font-weight: normal;
}
#search {
  flex: 1;
  min-width: 20rem;
  position: fixed; 
  top: 2rem;
  left: 2rem;
  z-index: 99;
}
#result {
  flex: 1;
  padding: 0rem 2rem;
  position: absolute;
  top: 6rem;
}
</style>
