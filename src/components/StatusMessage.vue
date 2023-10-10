<script setup>
import { ref } from 'vue'

const props = defineProps({
	defaultSize: Number,
})

const boardSize = ref(props.defaultSize)

const BOARD_SIZES = [4, 6, 8, 12]
</script>

<template>
	<div class="p-8">
		<slot></slot>
	</div>
</template>