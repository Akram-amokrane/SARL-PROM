<template>
  <div>
    <div>
      <TextField
        label="Label"
        placeholder="Project X"
        :validators="[minLength(3)]"
        :required="true"
        v-model:value="project.label"
        v-model:is-valid="formValid.label"
      >
      </TextField>
      <TextField
        label="Type"
        placeholder="Type X"
        :validators="[minLength(3)]"
        :required="true"
        v-model:value="project.type"
        v-model:is-valid="formValid.type"
      >
      </TextField>
      <TextArea
        label="Description"
        placeholder="Le projet est ..."
        v-model:value="project.description"
        v-model:is-valid="formValid.description"
      ></TextArea>
    </div>
    <div class="w-full flex justify-center items-center gap-3 p-3 mt-2">
      <Button
        @click.prevent.stop="resetForm"
        :icon="true"
        class="w-1/2 text-slate-600 bg-slate-300 hover:bg-slate-400"
      >
        Annuler
      </Button>
      <Button
        @click.stop.prevent="saveClient"
        :icon="true"
        class="w-1/2 text-white bg-blue-600 hover:bg-blue-700"
        :disabled="!formIsValid()"
      >
        Ajouter
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { minLength } from '@/utils/validators'
import TextField from '../inputs/TextField.vue'
import TextArea from '../inputs/TextArea.vue'
import Button from '../buttons/Button.vue'
import { onMounted, onUpdated, ref, watch } from 'vue'
import Project from '@/models/Project'
import { useProjectsStore } from '@/stores/projects-store'

const props = defineProps({
  p: { type: Object, required: true }
})

const projectsStore = useProjectsStore()

const project = ref<Project>(props.p as Project)

const project0 = JSON.parse(JSON.stringify(props.p))

const formValid = ref({
  label: true,
  type: true,
  description: true
})

function resetForm() {
  console.log(project.value)
  project.value = project0

  formValid.value = {
    label: true,
    type: true,
    description: true
  }

  console.log(project.value)
}

function formIsValid(): boolean {
  const { description, label, type } = formValid.value
  return label && type && description
}

async function saveClient() {
  if (formIsValid()) {
    projectsStore.editProject(project.value)
  }
}
</script>
