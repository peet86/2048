<script setup>
import { ref, onMounted } from 'vue'
import { DIRECTION_DOWN, DIRECTION_UP, DIRECTION_LEFT, DIRECTION_RIGHT } from '../lib/game2048'

const props = defineProps({
  matrix: Array,
})

const emit = defineEmits(['move'])

const ANIM_TTL = 300
const animation = ref('')

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
  'bottom': DIRECTION_DOWN
}

const ANIM_MAP = {
  [DIRECTION_LEFT]: '-translate-x-3',
  [DIRECTION_RIGHT]: 'translate-x-3',
  [DIRECTION_UP]: '-translate-y-3',
  [DIRECTION_DOWN]: 'translate-y-3'
}

const onKeyUp = (e) => {
  if(!props.matrix) return
  const direction = KEY_MAP[e.keyCode]
  if (direction) {
    animateBoard(direction)
    emit('move', direction)
  }
}

const onSwipe = (d) => {
  if(!props.matrix) return
  const direction = SWIPE_MAP[d]
  if (direction) {
    animateBoard(direction)
    emit('move', direction)
  }
}

const animateBoard = (direction) => {
  console.log(ANIM_MAP[direction])
  animation.value = ANIM_MAP[direction]
  setTimeout(() => {
    animation.value = ''
  }, ANIM_TTL)
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
  <div
    class="mx-4 md:mx-auto md:max-w-[480px] p-4 bg-white border-yellow-900 rounded-2xl aspect-square transition ease-in-out duration-200"
    :class="animation">
    <slot></slot>
    <div v-if="matrix" class="relative w-full">
      <div class="absolute top-0 left-0 right-0 bottom-0 z-10" v-touch:swipe="onSwipe"></div>
      <div class="flex" v-for="col in matrix">
        <div class="border h-full shadow-inner grow m-1 aspect-square rounded-xl justify-center align-middle relative"
          :class="getTextSize(value)" v-for="value in col">
          <div :class="getTextColor(value)"
            class="select-none font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{ value ? value :
              '&nbsp;' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
