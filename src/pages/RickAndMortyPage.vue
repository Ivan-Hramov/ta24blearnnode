<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import CharacterCard from '../components/CharacterCard.vue'
import PaginationBar from '../components/PaginationBar.vue'

const characters = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const searchValue = ref('')
const searchName = ref('')
const loading = ref(false)
const error = ref('')
const characterList = ref(null)

async function getCharacters() {
  loading.value = true
  error.value = ''

  try {
    const res = await axios.get('https://rickandmortyapi.com/api/character', {
      params: { page: currentPage.value, name: searchName.value },
    })
    characters.value = res.data.results
    totalPages.value = res.data.info.pages
  } catch {
    characters.value = []
    totalPages.value = 0
    error.value = 'Could not load characters. Try another search.'
  }

  loading.value = false
}

function search() {
  searchName.value = searchValue.value
  if (currentPage.value === 1) {
    getCharacters()
  } else {
    currentPage.value = 1
  }
}

watch(currentPage, () => {
  getCharacters()
  characterList.value.scrollIntoView({ behavior: 'smooth' })
})

onMounted(getCharacters)
</script>

<template>
  <fieldset :disabled="loading">
    <form @submit.prevent="search">
      <input v-model="searchValue" type="search" aria-label="Search characters" />
      <button type="submit">Search</button>
    </form>

    <div ref="characterList">
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error }}</p>
      <div class="columns is-multiline">
        <div v-for="character in characters" :key="character.id" class="column is-3">
          <CharacterCard :character="character" />
        </div>
      </div>
    </div>

    <PaginationBar
      v-if="totalPages > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="currentPage = $event"
    />
  </fieldset>
</template>
