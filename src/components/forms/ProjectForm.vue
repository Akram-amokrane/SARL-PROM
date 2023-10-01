<template>
  <form>
    <div>
      <TextField
        label="Label"
        placeholder="Project X"
        :validators="[minLength(3)]"
        :required="true"
        v-model:value="project.label"
      >
      </TextField>
      <TextField
        label="Type"
        placeholder="Type X"
        :validators="[minLength(3)]"
        :required="true"
        v-model:value="project.type"
      >
      </TextField>
      <TextArea
        label="Description"
        placeholder="Le projet est ..."
        v-model:value="project.description"
      ></TextArea>
    </div>
    <div class="w-full flex justify-center items-center gap-3 p-3 mt-2">
      <Button
        @click.prevent="resetForm"
        :icon="true"
        class="w-1/2 text-slate-600 bg-slate-300 hover:bg-slate-400"
      >
        Annuler
      </Button>
      <Button
        @click.prevent="saveClient"
        :icon="true"
        class="w-1/2 text-white bg-blue-600 hover:bg-blue-700"
        :disabled="false"
      >
        Ajouter
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { minLength } from '@/utils/validators'
import TextField from '../inputs/TextField.vue'
import TextArea from '../inputs/TextArea.vue'
import Button from '../buttons/Button.vue'
import { ref } from 'vue'
import type Project from '@/models/Project'
import { useProjectsStore } from '@/stores/projects-store'

const projectsStore = useProjectsStore()

const project = ref<Project>({
  label: '',
  type: '',
  description: ''
})

function resetForm() {
  project.value = {
    label: '',
    type: '',
    description: ''
  }
}

async function saveClient() {
  projectsStore.addProject(project.value);
}
</script>
