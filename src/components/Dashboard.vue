<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  isPlaying: Boolean,
	defaultSize: Number
})

const boardSize = ref(props.defaultSize)

</script>

<template>
  <div class="">
		<input :disabled="isPlaying" v-model="boardSize" type="number"/>
		<button type="button" @click="$emit('start', boardSize)">New {{ boardSize }} x {{ boardSize }} game </button>
  </div>
</template>