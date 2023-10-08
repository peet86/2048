<script setup>
import { ref, onMounted, watch } from 'vue'

import Dashboard from './components/Dashboard.vue'
import Board from './components/Board.vue'

import Game2048 from './lib/game2048'

// init vue state
const boardSize = ref(4)
const boardMatrix = ref(null)
const isPlaying = ref(false)

// game instance
let game = null

const onBoardChange = (matrix) => {
  boardMatrix.value = matrix
}

const onMove = (direction) => {
  game.moveTiles(direction)
}

onMounted(() => {
  onStart(boardSize.value)
})

const onStart = (boardSize) => {
  game = Game2048(boardSize, onBoardChange)
}
</script>

<template>
  <h1>2048 <small>by peet86</small></h1>
  <Dashboard @start="onStart" :isPlaying="isPlaying" :defaultSize="boardSize"></Dashboard>
  <Board :matrix="boardMatrix" @move="onMove" />
</template>

