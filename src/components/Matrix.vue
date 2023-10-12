<script setup>

defineProps({
  matrix: { type: Array, required: true },
})

const getSize = (value) => {
  if (value < 10) return "text-3xl"
  if (value < 100) return "text-2xl"
  if (value < 1000) return "text-xl"
  if (value < 10000) return "text-lg"
}

const getColor = (value) => {
  if (value == 2) return "text-stone-400"
  if (value == 4) return "text-yellow-400"
  if (value < 8) return "text-yellow-600"
  if (value < 16) return "text-orange-400"
  if (value < 64) return "text-orange-600"
  if (value < 512) return "text-red-400"
  if (value < 1024) return "text-red-500"
  if (value < 2048) return "text-red-600"
  return "text-red-800"
}

</script>

<template>
  <div
    v-for="(col, i) in matrix"
    :key="i"
    class="flex"
  >
    <div
      v-for="(value, j) in col"
      :key="j"
      class="border h-full shadow-inner grow m-1 aspect-square rounded-xl justify-center align-middle relative"
      :class="getSize(value)"
    >
      <div
        :class="getColor(value)"
        class="select-none font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {{ value || '&nbsp;' }}
      </div>
    </div>
  </div>
</template>