<script setup>
import { ref } from 'vue'

const query = ref('')
const emit = defineEmits(['search'])
</script>

<template>
  <input
    v-model="query"
    type="text"
    aria-label="Search characters"
    @input="emit('search', query)"
  />
</template>
