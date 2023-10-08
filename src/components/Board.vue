<script setup>
import { ref, onMounted } from 'vue'
import { DIRECTION_DOWN, DIRECTION_UP, DIRECTION_LEFT, DIRECTION_RIGHT } from '../lib/game2048'

// keybo. code - direction
const keyMap = {
  37: DIRECTION_LEFT,
  38: DIRECTION_UP,
  39: DIRECTION_RIGHT,
  40: DIRECTION_DOWN
}

const keyControl = (e) => {
  const direction = keyMap[e.keyCode]
  if (direction) emit('move', direction)
}

defineProps({
  matrix: Array,
})

const emit = defineEmits(['move'])

onMounted(() => {
  document.addEventListener('keyup', keyControl)
})

</script>

<template>
  <div class="" v-for="col in matrix">
    {{ col }}
  </div>
</template>

<style scoped></style>
