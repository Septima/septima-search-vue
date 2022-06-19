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

const active = ref(false)
const hover = ref(false)
const clear = ref(false)
const loading = ref(false)
const chip = ref(false)
const source = ref(undefined)
const type: Ref<any> = ref(undefined)

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

function onClickClear() {
  chip.value = false
  source.value = undefined
  type.value = undefined
  doSearch(lastQueryString)
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
      <i v-if="chip" class="chip">
        <ChipLabel :type="type" @clickclear="onClickClear"></ChipLabel>
      </i>
      <input
        class="inputtext"
        type="text"
        placeholder="Søg"
        @keyup="onKeyUp"
        @click="onClick"
        @focusin="active = true"
        @focusout="active = false"
      />
      <i v-if="loading" class="loading">
        <LoadingIndicator />
      </i>
      <i v-else class="icon">
        <ClearIcon v-if="clear" />
        <SearchIcon v-else />
      </i>
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
  padding-left: 0.5rem;
}

.loading {
  opacity: 0.75;
  width: 3.5rem;
}

.icon {
  opacity: 0.75;
  height: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
