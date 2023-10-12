<script setup>
import { ref } from 'vue'

import Dashboard from './components/Dashboard.vue'
import Board from './components/Board.vue'
import StatusMessage from './components/StatusMessage.vue'
import Matrix from './components/Matrix.vue'
import PlayButton from './components/PlayButton.vue'

import Game2048, {
  STATUS_WON,
  STATUS_LOST,
  STATUS_IDLE,
  STATUS_PLAYING,
  LEVEL_ROOKIE
} from './lib/index'

const DEFAULT_BOARD_SIZE = 4

const gameStatus = ref(STATUS_IDLE)
const gameLevel = ref(LEVEL_ROOKIE)
const gameSize = ref(DEFAULT_BOARD_SIZE)
const boardMatrix = ref(null)

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
  gameSize.value = size
  gameLevel.value = level
  console.log(size,level)
  game = Game2048(size, level, onBoardChange)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="p-4 justify-center flex">
      <h1 class="text-3xl text-white text-shadow-lg relative font-mono">
        Game2048
      </h1>
      <a
        href="https://github.com/peet86/2048"
        class="text-2xs mt-4 ml-2 text-white"
      >by peet86</a>
    </div>
    <div class="grow justify-center align-middle">
      <Board
        :is-matrix-active="gameStatus === STATUS_PLAYING"
        @move="onMove"
      >
        <template #messages>
          <StatusMessage v-if="gameStatus === STATUS_WON">
            <h1 class="font-mono text-center text-3xl text-green-800 mt-8">
              2048!<br>You are awesome.
            </h1>
            <PlayButton
              label="New Game"
              :game-level="gameLevel"
              :game-size="gameSize"
              class="mx-auto w-2/3"
              @start="onStart"
            />
          </StatusMessage>
          <StatusMessage v-if="gameStatus === STATUS_LOST">
            <h1 class="font-mono text-center text-3xl text-red-700 mt-8">
              Game Over
            </h1>
            <PlayButton
              label="New Game"
              :game-level="gameLevel"
              :game-size="gameSize"
              class="mx-auto w-2/3"
              @start="onStart"
            />
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
            <PlayButton
              label="Let's Play!"
              :game-level="gameLevel"
              :game-size="gameSize"
              @start="onStart"
            />
          </StatusMessage>
        </template>
        <template #matrix>
          <Matrix :matrix="boardMatrix" />
        </template>
      </Board>
    </div>
    <Dashboard
      :game-size="gameSize"
      :game-level="gameLevel"
      @start="onStart"
    />
  </div>
</template>

