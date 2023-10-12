<script setup>
import { ref } from 'vue'

import Dashboard from './components/Dashboard.vue'
import Board from './components/Board.vue'
import StatusMessage from './components/StatusMessage.vue'
import Game2048, {
  STATUS_WON,
  STATUS_LOST,
  STATUS_IDLE,
  STATUS_PLAYING,
  LEVEL_ROOKIE
} from './lib/index'


const defaultSize = ref(4)
const defaultLevel = ref(LEVEL_ROOKIE)

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

const onStart = (size, level) => {
  game = Game2048(size, level, onBoardChange)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="p-4 justify-center flex">
      <h1 class="text-3xl text-white text-shadow-lg relative font-mono">
        Game2048
      </h1>
      <a href="https://github.com/peet86/2048" class="text-2xs mt-4 ml-2 text-white">by peet86</a>
    </div>
    <div class="grow justify-center align-middle">
      <Board
        :matrix="gameStatus === STATUS_PLAYING ? boardMatrix : []"
        @move="onMove"
      >
        <StatusMessage
          v-if="gameStatus === STATUS_WON"
          class="font-mono text-center text-3xl text-green-800 mt-8"
        >
          2048!<br>You are awesome.
        </StatusMessage>
        <StatusMessage
          v-if="gameStatus === STATUS_LOST"
          class="font-mono text-center text-3xl text-red-700 mt-8"
        >
          Game Over
        </StatusMessage>
        <StatusMessage v-if="gameStatus === STATUS_IDLE">
          <h1 class="text-xl mb-2">
            Manual
          </h1>
          <p>
            Slide and combine like-numbered tiles on the board to reach the 2048 tile. Aim to keep the highest tile in
            a
            corner to optimize combinations and avoid gridlock.
          </p>
          <button
            class="relative border border-yellow-600 text-yellow-900 rounded-md px-4 py-2 my-4"
            @click="onStart(defaultSize, defaultLevel)"
          >
            New Game
          </button>
        </StatusMessage>
      </Board>
    </div>
    <Dashboard
      :default-size="defaultSize"
      :default-level="defaultLevel"
      @start="onStart"
    />
  </div>
</template>

