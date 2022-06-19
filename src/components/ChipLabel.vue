<script setup lang="ts">
import ClearIcon from './ClearIcon.vue'
defineProps<{
  type: any
}>()
const emit = defineEmits<{
  (e: 'clickclear'): void
}>()
</script>

<template>
  <div class="chip">
    <span class="text">{{ type.plural }}</span>
    <ClearIcon
      tabindex="0"
      class="icon"
      fill="white"
      @click="emit('clickclear')"
    />
  </div>
</template>
<style scoped>
.chip {
  display: flex;
  user-select: none;
  color: white;
  align-items: center;
  font: 0.8rem sans-serif;
  padding: 0.1rem 0.15rem 0.1rem 0.3rem;
  border: 1px solid gray;
  background-color: gray;
  border-radius: 3px;
  white-space: nowrap;
}
.icon {
  cursor: pointer;
  margin-left: 0.5rem;
  color: white;
  width: 1rem;
  height: 1rem;
}
</style>
