<template>
  <Filter
    @reset="
      () => {
        projectsStore.getAllProjects()
        filters = new ProjectFilter()
      }
    "
  >
    <div class="flex flex-col gap-1">
      <TextField label="Label" placeholder="Projet X" v-model:value="filters.label"></TextField>
      <ComboBox
        label="Type"
        :options="[
          { label: 'Tout', value: undefined },
          { label: 'Appartement', value: 'Appartement' },
          { label: 'House', value: 'House' }
        ]"
        placeholder="Batiment"
        v-model:value="filters.type"
      ></ComboBox>
      <TextField
        label="Description"
        placeholder="Le projet ..."
        v-model:value="filters.description"
      ></TextField>
    </div>
  </Filter>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects-store'
import Filter from './Filter.vue'
import { onMounted, ref, watch } from 'vue'
import ComboBox from '../inputs/ComboBox.vue'
import TextField from '../inputs/TextField.vue'
import { ProjectFilter } from '@/models/Filters'

const projectsStore = useProjectsStore()

const filters = ref<ProjectFilter>(new ProjectFilter())

watch(
  filters.value,
  async (n, o) => {
    await projectsStore.filterProjects(n)
  },
  { deep: true }
)

onMounted(() => {
  //projectsStore.getProjectsCombo()
})
</script>
