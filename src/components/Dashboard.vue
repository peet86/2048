<script setup>
import { ref } from 'vue'

const emit = defineEmits(['start'])

const props = defineProps({
	defaultSize: Number,
})

const boardSize = ref(props.defaultSize)

const BOARD_SIZES = [4, 6, 8, 12]
</script>

<template>
	<div class="text-white text-center text-sm p-2">
		Use the keyboard ←↑↓→ or swipe to play.
	</div>
	<div class="p-2 text-white text-center p-2">
		<span class="text-xl">▩</span>&nbsp;{{ boardSize }}&nbsp;x
		<select v-model="boardSize" class="bg-transparent" name="size">
			<option v-for="size in BOARD_SIZES">{{ size }}</option>
		</select>
		<button @click="emit('start', parseInt(boardSize))" class="border-white rounded-md px-2 border ml-2">
			↺ restart
		</button>
	</div>
</template>