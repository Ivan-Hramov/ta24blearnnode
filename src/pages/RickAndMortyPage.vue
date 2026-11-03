<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import axios from 'axios'
import CharacterCard from '../components/CharacterCard.vue'
import PaginationBar from '../components/PaginationBar.vue'
import SearchBar from '../components/SearchBar.vue'
import { debounce } from '../utils/debounce'

const characters = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const searchName = ref('')
const loading = ref(false)
const error = ref('')
const characterList = ref(null)
let controller

async function getCharacters() {
  controller?.abort()
  const request = new AbortController()
  controller = request
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get('https://rickandmortyapi.com/api/character', {
      params: { page: currentPage.value, name: searchName.value },
      signal: request.signal,
    })
    if (request.signal.aborted) return
    characters.value = res.data.results
    totalPages.value = res.data.info.pages
  } catch (errorResponse) {
    if (request.signal.aborted) return
    characters.value = []
    totalPages.value = 0
    error.value = errorResponse.response?.status === 404
      ? 'No characters found'
      : 'Could not load characters. Please try again.'
  } finally {
    if (!request.signal.aborted) loading.value = false
  }
}

function search(query) {
  searchName.value = query
  if (currentPage.value === 1) {
    getCharacters()
  } else {
    currentPage.value = 1
  }
}

// Questions (stage 2):
// 1. Typing "morty" made 5 requests, one for each input event.
// 2. If request 2 finishes after request 5, its old results overwrite the new ones.
// 3. Extra requests load the server and can show flickering or incorrect results.
const debouncedSearch = debounce(search, 400)

function handleSearch(query) {
  controller?.abort()
  loading.value = true
  debouncedSearch(query)
}

watch(currentPage, () => {
  getCharacters()
  characterList.value.scrollIntoView({ behavior: 'smooth' })
})

onMounted(getCharacters)
onUnmounted(() => {
  debouncedSearch.cancel()
  controller?.abort()
})
</script>

<template>
  <div>
    <SearchBar @search="handleSearch" />

    <div ref="characterList">
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error }}</p>
      <div class="columns is-multiline">
        <div v-for="character in characters" :key="character.id" class="column is-3">
          <CharacterCard :character="character" />
        </div>
      </div>
    </div>

    <fieldset :disabled="loading">
      <PaginationBar
        v-if="totalPages > 0"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="currentPage = $event"
      />
    </fieldset>
  </div>
</template>
