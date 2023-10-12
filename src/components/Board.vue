<script setup>
import { ref, onMounted } from 'vue'
import { DIRECTION_DOWN, DIRECTION_UP, DIRECTION_LEFT, DIRECTION_RIGHT } from '../lib/index'

const props = defineProps({
  isMatrixActive: { type: Boolean, required: true },
})

const emit = defineEmits(['move'])

const ANIM_TTL = 200
const animation = ref('')

onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

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
  [DIRECTION_LEFT]: '-translate-x-2',
  [DIRECTION_RIGHT]: 'translate-x-2',
  [DIRECTION_UP]: '-translate-y-2',
  [DIRECTION_DOWN]: 'translate-y-2'
}

const onKeyUp = (e) => {
  if (!props.isMatrixActive) return
  const direction = KEY_MAP[e.keyCode]
  if (direction) {
    animateBoard(direction)
    emit('move', direction)
  }
}

const onSwipe = (d) => {
  if (!props.isMatrixActive) return
  const direction = SWIPE_MAP[d]
  if (direction) {
    animateBoard(direction)
    emit('move', direction)
  }
}

const animateBoard = (direction) => {
  animation.value = ANIM_MAP[direction]
  setTimeout(() => {
    animation.value = ''
  }, ANIM_TTL)
}

</script>

<template>
  <div
    class="mx-4 md:mx-auto md:max-w-[480px] p-4 bg-white border-yellow-900 rounded-2xl aspect-square transition ease-in-out duration-200"
    :class="animation"
  >
    <slot name="messages" />
    <div
      v-if="isMatrixActive"
      class="relative w-full"
    >
      <div
        v-touch:swipe="onSwipe"
        class="absolute top-0 left-0 right-0 bottom-0 z-10"
      />
      <slot name="matrix" />
    </div>
  </div>
</template>
