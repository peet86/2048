<script setup>
import { ref, onMounted, watch } from 'vue'

import Dashboard from './components/Dashboard.vue'
import Board from './components/Board.vue'

import Game2048 from './lib/game2048'

// init vue state
const boardSize = ref(4)
const boardMatrix = ref(null)
const gameStatus = ref('idle')

// game instance
let game = null

const onBoardChange = ({ matrix, status }) => {
  boardMatrix.value = matrix
  gameStatus.value = status
}

const onMove = (direction) => {
  game.moveUser(direction)
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
  <Dashboard @start="onStart" :defaultSize="boardSize"></Dashboard>
  <Board :matrix="boardMatrix" @move="onMove" />
  <template v-if="gameStatus === 'won'">
    <div>Congrats! You have won!</div>
  </template>
  <template v-if="gameStatus === 'lost'">
    <div>Game Over</div>
  </template>
</template>

