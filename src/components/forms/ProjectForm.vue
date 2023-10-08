<template>
  <form>
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
      <div class="flex gap-1 items-end">
        <ComboBox
          label="Type"
          placeholder="type"
          :options="projectsStore.projectTypes"
          :required="true"
          v-model:value="project.type"
          v-model:is-valid="formValid.type"
        ></ComboBox>
        <Modal id="projects-type-modal">
          <template #toggle-button>
            <ButtonIcon
              class="p-2 bg-slate-200 rounded-md hover:bg-orange-100 hover:text-orange-500 text-slate-600 duration-200"
            >
              <PencilSquareIcon class="w-6 h-6" />
            </ButtonIcon>
          </template>
          <ProjectTypeForm />
        </Modal>
      </div>
      <TextArea
        label="Description"
        placeholder="Le projet est ..."
        v-model:value="project.description"
        v-model:is-valid="formValid.description"
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
        :disabled="!formIsValid()"
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
import { onMounted, ref } from 'vue'
import Project from '@/models/Project'
import { useProjectsStore } from '@/stores/projects-store'
import Modal from '@/layouts/Modal.vue'
import ButtonIcon from '../buttons/ButtonIcon.vue'
import { PencilSquareIcon, type PencilIcon } from '@heroicons/vue/24/outline'
import ProjectTypeForm from './ProjectTypeForm.vue'
import ComboBox from '../inputs/ComboBox.vue'

const projectsStore = useProjectsStore()

const project = ref<Project>({
  label: '',
  type: '',
  description: ''
})
const formValid = ref({
  label: false,
  type: false,
  description: true
})

function resetForm() {
  project.value = {
    label: '',
    type: '',
    description: ''
  }

  formValid.value = {
    label: false,
    type: false,
    description: true
  }
}

function formIsValid(): boolean {
  const { description, label, type } = formValid.value
  return label && type && description
}

async function saveClient() {
  if (formIsValid()) {
    projectsStore.addProject(project.value).then(() => {
      resetForm()
    })
  }
}

onMounted(() => {
  projectsStore.getAllProjectType()
})
</script>
