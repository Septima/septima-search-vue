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
    const fetchDataArgs = [queryString, null, null, null, source.value, type.value?.id]
    const queryResult = await props.controller.fetchData(...fetchDataArgs)
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
  <div class="s-search" :class="{ active }" @mouseenter="hover = true" @mouseleave="hover = false">
    <!-- input -->
    <div class="s-search__field">
      <ChipLabel v-if="chip" class="s-search-badges" :type="type" @clickclear="onChipClickClear"></ChipLabel>
      <input
        ref="input"
        class="s-search-input"
        type="text"
        placeholder="Søg"
        aria-label="Søgefelt"
        aria-controls="sSearchResult"
        :aria-expanded="hover || active ? true : false"
        id="sSearchInput" 
        role="combobox"
        @keyup="onKeyUp"
        @click="onClick"
        @focusin="active = true"
        @focusout="active = false"
      />
      <LoadingIndicator v-if="loading" class="s-search-loader" />
      <button v-if="clear && !loading" @click="onClear" type="button" class="s-search-clear">
        <ClearIcon />
      </button>
      <SearchIcon v-if="!clear && !loading" class="s-search-icon" />
    </div>
    <!-- result -->
    <ul 
      v-if="hover || active" 
      id="sSearchResult"
      class="s-search__result" 
      aria-label="Resultater"
      role="listbox"
      aria-live="polite"
    >
      <ResultItem
        v-for="result in results"
        :key="result.id"
        :result="result"
        @selectresult="onSelectResult"
      ></ResultItem>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '../style/_variables.scss' as *;

.#{$prefix}-search {
  font-size: 0.8rem;
  font-family: sans-serif;
  border: 1px solid $border-color;
  box-shadow: $box-shadow;
  border-radius: $border-radius;
  background-color: white;
  overflow: hidden;
  max-width: 100%;
  width: 20rem;
  &__field {
    display: flex;
    align-items: center;
    height: 2.5rem;
    margin-right: 0.5rem;
    box-sizing: border-box;
    .#{$prefix}-search-badges {
      flex: 1 0 auto;
      margin-left: 0.5rem;
    }
    .#{$prefix}-search-input {
      appearance: none;
      border: none;
      margin: 0;
      font-size: 0.8rem;
      box-sizing: border-box;
      width: 100%;
      padding-left: 0.5rem;
      height: inherit;
      &:focus {
        outline: none;
      }
    }
    // actions
    .#{$prefix}-search-clear {
      line-height: 1;
      padding: 0;
      display: flex;
      border: 0;
      &:hover {
        cursor: pointer;
      }
    }
    .#{$prefix}-search-loading {
      background-color: red;
    }
    .#{$prefix}-search-icon { //ikoner har samme style
      flex: 1 0 auto;
      opacity: 0.75;
      // margin: 0rem 0.5rem;
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  &__result {
    margin: 0;
    padding: 0;
    overflow: auto;
    max-height: 30rem;
  }
  &.active {
    border: 1px solid $dark;
  }
}


.loading {
  flex: 1 0 auto;
  opacity: 0.75;
  width: 3.5rem;
}

</style>
