<script setup>
import { ref } from 'vue';
import axios from 'axios';

let fact = ref('');
let res = await axios.get('https://catfact.ninja/fact');
fact.value = res.data.fact;
</script>

<template>
  <div class="content">
    <h1>{{ fact }}</h1>
  </div>
</template>
