<script setup>
import { ref } from 'vue'

const props = defineProps({
	defaultSize: Number
})

const boardSize = ref(props.defaultSize)

</script>

<template>
  <div class="">
		<input v-model="boardSize" type="number"/>
		<button type="button" @click="$emit('start', boardSize)">New {{ boardSize }} x {{ boardSize }} game </button>
  </div>
</template>