<script setup>
import { ref } from 'vue'

import Dashboard from './components/Dashboard.vue'
import Board from './components/Board.vue'

import { start } from './lib/game2048'

const isPlaying = ref(false) 

const onStart = (boardSize) =>{
  start(boardSize)
}

</script>

<template>
  <h1>2048 <small>by peet86</small></h1>
  <Dashboard @start="onStart" :isPlaying="isPlaying"></Dashboard>
  <Board :matrix="[]" />
</template>

