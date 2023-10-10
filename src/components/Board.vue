<script setup>
import { ref, onMounted } from 'vue'
import { DIRECTION_DOWN, DIRECTION_UP, DIRECTION_LEFT, DIRECTION_RIGHT } from '../lib/game2048'

defineProps({
  matrix: Array,
})

const emit = defineEmits(['move'])

onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

// keybo. code - direction
const KEY_MAP = {
  37: DIRECTION_LEFT,
  38: DIRECTION_UP,
  39: DIRECTION_RIGHT,
  40: DIRECTION_DOWN
}

const SWIPE_MAP = {
  'left': DIRECTION_LEFT,
  'right': DIRECTION_RIGHT,
  'top': DIRECTION_UP,
  'down': DIRECTION_DOWN
}

const onKeyUp = (e) => {
  const direction = KEY_MAP[e.keyCode]
  if (direction) emit('move', direction)
}

const onSwipe = (d) => {
  const direction = SWIPE_MAP[d]
  if (direction) emit('move', direction)
}

const getTextSize = (value) => {
  if (value < 10) return "text-3xl"
  if (value < 100) return "text-2xl"
  if (value < 1000) return "text-xl"
  if (value < 10000) return "text-lg"
}

const getTextColor = (value) => {
  if (value <= 4) return "text-stone-400"
  if (value < 8) return "text-yellow-200"
  if (value < 16) return "text-yellow-400"
  if (value < 64) return "text-orange-400"
  if (value < 512) return "text-orange-600"
  if (value < 1024) return "text-red-400"
  if (value < 2048) return "text-red-600"
  return "text-red-800"
}

</script>

<template>
  <div class="w-full" v-touch:swipe="onSwipe" style="">
    <div class="pointer-events-none flex" v-for="col in matrix">
      <div class="pointer-events-none border h-full shadow-inner grow m-1 aspect-square rounded-xl justify-center align-middle relative"
        :class="getTextSize(value)" v-for="value in col">
        <div :class="getTextColor(value)" class="select-none font-bold pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{ value ? value :
          '&nbsp;' }}</div>
      </div>
    </div>
  </div>
</template>
