<script setup>
defineProps({
  color: {
    type: String,
    default: '',
    validator: (value) =>
      ['', 'primary', 'link', 'info', 'success', 'warning', 'danger'].includes(value),
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['small', 'normal', 'medium', 'large'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  disabled: Boolean,
})
</script>

<template>
  <button
    class="button"
    :class="[color && `is-${color}`, `is-${size}`]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
