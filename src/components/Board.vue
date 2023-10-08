<script setup>
import { ref, onMounted } from 'vue'

// keybo. code - direction
const keyMap = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

const keyControl = (e) => {
  const direction = keyMap[e.keyCode]
  if(direction) emit('move', direction)
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
