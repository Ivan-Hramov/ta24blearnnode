<script setup>
import { ref } from 'vue'

const text = ref('Hello, maailm! 👋')
const result = ref(null)
const error = ref('')

function encodeText() {
  result.value = null
  error.value = ''

  if (typeof TextEncoder === 'undefined' || typeof TextDecoder === 'undefined') {
    error.value = 'Text Encoding API is not supported in this browser.'
    return
  }

  try {
    const bytes = new TextEncoder().encode(text.value)
    result.value = {
      bytes: Array.from(bytes),
      text: new TextDecoder().decode(bytes),
    }
  } catch {
    error.value = 'Could not encode the text. Please try again.'
  }
}
</script>

<template>
  <div>
    <h1>Text Encoding API</h1>
    <p>Convert text to UTF-8 bytes and decode them back to text.</p>

    <form @submit.prevent="encodeText">
      <label for="text-input">Text</label>
      <textarea id="text-input" v-model="text" rows="3" />
      <button type="submit">Encode text</button>
    </form>

    <div v-if="result" aria-live="polite">
      <p>Byte count: {{ result.bytes.length }}</p>
      <p>UTF-8 bytes: {{ result.bytes.join(', ') || '(empty)' }}</p>
      <p>Decoded text: {{ result.text || '(empty)' }}</p>
    </div>
    <p v-if="error" role="alert">{{ error }}</p>
  </div>
</template>
