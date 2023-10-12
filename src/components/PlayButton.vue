<script setup>
defineProps({
	gameSize: { type: Number, required: true },
	gameLevel: { type: Number, required: true },
	label: { type: String, required: true }
})

const emit = defineEmits(['start'])
</script>

<template>
  <button
    class="block border border-yellow-600 text-yellow-900 rounded-md px-4 py-2 my-8"
    @click="emit('start', gameSize, gameLevel)"
  >
    {{ label }}
  </button>
</template>