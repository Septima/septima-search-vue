<script setup lang="ts">
import { ref, type Ref } from 'vue'

import ChipLabel from './ChipLabel.vue'
import SearchIcon from './SearchIcon.vue'
import ClearIcon from './ClearIcon.vue'
import LoadingIndicator from './LoadingIndicator.vue'
import ResultItem from './ResultItem.vue'

const props = defineProps<{
  controller: any
}>()

const emit = defineEmits<{
  (e: 'selectresult', result: any): void
}>()

const input = ref()
const active = ref(false)
const hover = ref(false)
const clear = ref(false)
const loading = ref(false)
const chip = ref(false)
const source = ref(undefined)
const type: Ref<any> = ref({ plural: 'None' })

let lastQueryString = ''
const results: Ref<any[]> = ref([])

async function doSearch(queryString: string) {
  try {
    loading.value = true
    results.value = []
    const queryResult = await props.controller.fetchData(
      queryString,
      null,
      null,
      null,
      source.value,
      type.value?.id
    )
    results.value = queryResult.getAllResults()
    lastQueryString = queryString
    clear.value = queryString.length > 0
  } finally {
    loading.value = false
  }
}

function onKeyUp(event: any) {
  doSearch(event.target.value)
}

function onClick() {
  if (results.value.length === 0) doSearch(lastQueryString)
}

function onSelectResult(result: any) {
  if (result.newquery !== null) {
    chip.value = true
    source.value = result.source
    type.value = result.type
    const queryString = result.newquery.replace('<select></select>', '')
    doSearch(queryString)
  }
  emit('selectresult', result)
}

function onChipClickClear() {
  chip.value = false
  source.value = undefined
  type.value = undefined
  doSearch(lastQueryString)
}

function onClear() {
  input.value.value = ''
  doSearch('')
}
</script>

<template>
  <div
    class="container"
    :class="{ active: active }"
    @mouseenter="hover = true"
    @mouseleave="hover = true"
  >
    <span class="inputbar">
      <ChipLabel
        v-if="chip"
        class="chip"
        :type="type"
        @clickclear="onChipClickClear"
      ></ChipLabel>
      <input
        ref="input"
        class="inputtext"
        type="text"
        placeholder="Søg"
        @keyup="onKeyUp"
        @click="onClick"
        @focusin="active = true"
        @focusout="active = false"
      />
      <LoadingIndicator v-if="loading" />
      <ClearIcon v-if="clear && !loading" class="clear icon" @click="onClear" />
      <SearchIcon v-if="!clear && !loading" class="icon" />
    </span>
    <div v-if="hover || active" class="results">
      <ResultItem
        v-for="result in results"
        :key="result.id"
        :result="result"
        @selectresult="onSelectResult"
      ></ResultItem>
    </div>
  </div>
</template>

<style scoped>
.container {
  font: 0.8rem sans-serif;
  border: 1px solid #aaaaaa;
  background-color: white;
  overflow: hidden;
}

.clear {
  cursor: pointer;
}

.results {
  overflow: auto;
  max-height: 30rem;
}

.active {
  box-shadow: 0 0 4px #aaa;
}

.inputtext {
  appearance: none;
  border: none;
  margin: 0;
  font: 0.8rem sans-serif;
  box-sizing: border-box;
  width: 100%;
  padding-left: 0.5rem;
}

.inputtext:focus {
  outline: none;
}

.inputbar {
  display: flex;
  align-items: center;
  height: 2.5rem;
}

.chip {
  flex: 1 0 auto;
  margin-left: 0.5rem;
}

.loading {
  flex: 1 0 auto;
  opacity: 0.75;
  width: 3.5rem;
}

.icon {
  flex: 1 0 auto;
  opacity: 0.75;
  margin: 0rem 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
}
</style>
