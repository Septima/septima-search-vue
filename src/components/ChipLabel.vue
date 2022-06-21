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
    <button @click="emit('clickclear')" class="clear">
      <ClearIcon class="icon" fill="white"/>
    </button>
  </div>
</template>
<style scoped lang="scss">
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

.clear {
  line-height: 1;
  padding: 0;
  display: flex;
  border: 0;
  margin-left: 0.5rem;
  background-color: transparent;
  .icon {
    cursor: pointer;
    color: white;
    width: 1rem;
    height: 1rem;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
