<script setup>
import { ref } from 'vue'

const query = ref('')
const emit = defineEmits(['search'])
</script>

<template>
  <form @submit.prevent="emit('search', query)">
    <input v-model="query" type="text" aria-label="Search characters" />
    <button type="submit">Search</button>
  </form>
</template>
