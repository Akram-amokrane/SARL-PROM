<template>
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-semibold dark:text-white">Clients</h2>
    <div>
      <Search v-model:search="filters.search" />
    </div>
    <div>
      <ToggleGroup
        group="gender"
        :options="['all', 'Male', 'Female']"
        init="all"
        v-model:selected="filters.gender"
      >
        <template #all>
          <DotIcon class="w-5 h-5" />
        </template>
        <template #Male>
          <MaleIcon class="w-5 h-4" />
        </template>
        <template #Female>
          <FemaleIcon class="w-5 h-5" />
        </template>
      </ToggleGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '../Search.vue'
import ToggleGroup from '../inputs/ToggleGroup.vue'
import MaleIcon from '../icons/MaleIcon.vue'
import FemaleIcon from '../icons/FemaleIcon.vue'
import DotIcon from '../icons/DotIcon.vue'
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['update:filters'])

const filters = ref({ gender: 'all', search: '' })

watch(filters.value, (n, _) => {
  emit('update:filters', n)
})
</script>
