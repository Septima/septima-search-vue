<script setup lang="ts">
import { onMounted, ref } from 'vue'
const props = defineProps<{
  result: any
}>()

const el = ref()

onMounted(() => {
  el.value.src = props.result.image
})
</script>

<template>
  <img ref="el" class="image" />
</template>
<style scoped>
.image {
  width: 1.1rem;
  height: 1.1rem;
}
</style>
