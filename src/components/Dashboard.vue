<script setup>
import { ref } from 'vue'

const boardSize = ref(4)

defineProps({
  isPlaying: Boolean,
})
</script>

<template>
  <div class="">
		<input :disabled="isPlaying" v-model="boardSize" type="number"/>
		<button type="button" @click="$emit('start', boardSize)">New {{ boardSize }} x {{ boardSize }} game </button>
  </div>
</template>