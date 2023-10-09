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
  <div class="matrix">
    <div class="col" v-for="col in matrix">
      <div class="cell" style="width:20px; height: 20px; display: inline-block; border: 1px solid #ccc;" v-for="cel in col">
        {{ cel ? cel : '' }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
