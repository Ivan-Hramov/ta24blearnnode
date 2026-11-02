<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['page-change'])

const pages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    const numbers = []
    for (let page = 1; page <= total; page++) {
      numbers.push(page)
    }
    return numbers
  }
  if (current <= 4) return [1, 2, 3, 4, 5, 'end', total]
  if (current >= total - 3) {
    return [1, 'start', total - 4, total - 3, total - 2, total - 1, total]
  }
  return [1, 'start', current - 1, current, current + 1, 'end', total]
})
</script>

<template>
  <nav class="pagination" aria-label="Pagination">
    <button
      type="button"
      class="pagination-previous"
      :disabled="currentPage <= 1"
      @click="emit('page-change', currentPage - 1)"
    >
      Previous
    </button>
    <button
      type="button"
      class="pagination-next"
      :disabled="currentPage >= totalPages"
      @click="emit('page-change', currentPage + 1)"
    >
      Next
    </button>
    <ul class="pagination-list">
      <li v-for="page in pages" :key="page">
        <button
          v-if="typeof page === 'number'"
          type="button"
          class="pagination-link"
          :class="{ 'is-current': page === currentPage }"
          :aria-label="`Page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="emit('page-change', page)"
        >
          {{ page }}
        </button>
        <span v-else class="pagination-ellipsis">…</span>
      </li>
    </ul>
  </nav>
</template>
