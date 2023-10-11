<script setup>
import { ref } from 'vue'
import { LEVEL_PRO, LEVEL_ROOKIE } from '../lib/constants';

const emit = defineEmits(['start'])

const props = defineProps({
  defaultSize: Number,
  defaultLevel: Number,
})

const size = ref(props.defaultSize)
const level = ref(props.defaultLevel)


const SIZES = [3, 4, 6, 8, 12]
const LEVELS = [
  { value: LEVEL_PRO, label: 'Pro' },
  { value: LEVEL_ROOKIE, label: 'Rookie' }
]
</script>

<template>
  <div class="text-white text-center text-sm p-2">
    Use the keyboard ←↑↓→ or swipe to play.
  </div>
  <div class="p-2 text-white text-center">
    New game:
    <span class="text-xl mx-1">▩</span>
    <select v-model="size" class="bg-transparent" name="size">
      <option v-for="s in SIZES" :value="s">{{ s }} x {{ s }}</option>
    </select>
    <span class="text-xl mx-1">♛</span>
    <select v-model="level" class="bg-transparent" name="level">
      <option v-for="l in LEVELS" :value="l.value">{{ l.label }}</option>
    </select>
    <button @click="emit('start', parseInt(size), parseInt(level))" class="border-white rounded-md px-2 border ml-2">
      ↺ Start
    </button>
  </div>
</template>