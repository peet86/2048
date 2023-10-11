<script setup>
import { ref, onMounted, watch } from 'vue'

import Dashboard from './components/Dashboard.vue'
import Board from './components/Board.vue'
import StatusMessage from './components/StatusMessage.vue'
import Game2048, {
  STATUS_WON,
  STATUS_LOST,
  STATUS_IDLE,
  STATUS_PLAYING
} from './lib/game2048'


// init vue state
const boardSize = ref(4)
const boardMatrix = ref(null)
const gameStatus = ref(STATUS_IDLE)

// game instance
let game = null

const onBoardChange = ({ matrix, status }) => {
  boardMatrix.value = matrix
  gameStatus.value = status
}

const onMove = (direction) => {
  game.moveBoard(direction)
}

const onStart = (boardSize) => {
  game = Game2048(boardSize, onBoardChange)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="p-4 justify-center flex">
      <h1 class="text-3xl text-white text-shadow-lg relative font-mono">2048 </h1>
      <small class="text-2xs mt-4 ml-2 text-white">by peet86</small>
    </div>
    <div class="grow justify-center align-middle">
      <Board :matrix="gameStatus === STATUS_PLAYING ? boardMatrix : null" @move="onMove">
          <StatusMessage v-if="gameStatus === STATUS_WON">2048! Congrats! You are awesome.</StatusMessage>
          <StatusMessage v-if="gameStatus === STATUS_LOST">Game Over</StatusMessage>
          <StatusMessage v-if="gameStatus === STATUS_IDLE">
            <h1 class="text-xl mb-2">Manual</h1>
            <p>Slide and combine like-numbered tiles on the board to reach the 2048 tile. Aim to keep the highest tile in
              a
              corner to optimize combinations and avoid gridlock.</p>
            <button @click="onStart(boardSize)"
              class="relative border border-yellow-600 text-yellow-900 rounded-md px-4 py-2 border my-4">
              New Game
            </button>
          </StatusMessage>
      </Board>
    </div>
    <Dashboard @start="onStart" :defaultSize="boardSize"></Dashboard>
  </div>
</template>

