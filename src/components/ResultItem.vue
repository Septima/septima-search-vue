<script setup lang="ts">
import { ref } from 'vue'
import ResultIcon from './ResultIcon.vue'
import MoreIcon from './MoreIcon.vue'

const props = defineProps<{
  result: any
}>()

const emit = defineEmits<{
  (e: 'selectresult', result: any): void
}>()

const more = ref(props.result.newquery !== null)
const active = ref(false)
</script>

<template>
  <span
    class="resultitem"
    :class="{ active }"
    @mouseover="active = true"
    @mouseout="active = false"
    @click="emit('selectresult', result)"
  >
    <i class="resulticon">
      <ResultIcon :result="result" />
    </i>
    <div class="heading">
      <div class="title">{{ result.title }}</div>
      <div class="subtitle">{{ result.description }}</div>
    </div>
    <i v-if="more" class="icon">
      <MoreIcon />
    </i>
  </span>
</template>

<style scoped>
.resultitem {
  display: flex;
  align-items: center;
  border-top: 1px solid #ecf0f1;
  transition: all 0.2s ease;
}
.active {
  background-color: #ecf0f1;
}
.heading {
  padding: 0.6rem 1rem;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
}
.subtitle {
  font: 0.8rem / 1.5 sans-serif;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon {
  opacity: 0.75;
  height: 1rem;
  width: 1rem;
  margin-right: 0.5rem;
}

.resulticon {
  opacity: 0.65;
  height: 1rem;
  width: 1rem;
  margin-top: -0.2rem;
  margin-left: 1rem;
}
</style>
