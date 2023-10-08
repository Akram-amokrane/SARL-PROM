<template>
  <div class="w-full h-full flex flex-col justify-start items-center gap-2">
    <div class="w-full flex justify-start items-end gap-1">
      <TextField label="Type" placeholder="Industriel" v-model:value="newType.label"></TextField>
      <ButtonIcon
        @click="addType"
        class="p-2 rounded-md bg-green-100 hover:bg-green-200 duration-200"
      >
        <PlusIcon class="w-6 h-6 text-green-500" />
      </ButtonIcon>
    </div>
    <span class="w-11/12 h-px bg-slate-300 my-1"></span>
    <div class="w-full h-96 overflow-y-auto overflow-x-hidden flex flex-col gap-1">
      <div
        class="w-full bg-slate-200 flex items-center"
        v-for="t in biensService.bienTypes"
        :key="t.id"
      >
        <TextField :read-only="true" :value="t.label"></TextField>
        <div class="p-2 cursor-pointer" @click="selectedType = JSON.parse(JSON.stringify(t))">
          <PencilIcon class="w-5 h-5 text-purple-400 hover:text-purple-600" />
        </div>
        <div @click="deleteType(t.id!)" class="p-2 text-red-400 hover:text-red-600 cursor-pointer">
          <XMarkIcon class="w-5 h-5" />
        </div>
      </div>
    </div>
    <div
      v-if="selectedType"
      class="absolute bottom-0 p-2 w-full flex justify-start items-end gap-1 bg-white rounded-t-md"
    >
      <TextField
        label="Type"
        placeholder="Industriel"
        v-model:value="selectedType!.label"
      ></TextField>
      <ButtonIcon
        @click="editType"
        class="p-2 rounded-md bg-green-100 hover:bg-green-200 duration-200"
      >
        <CheckIcon class="w-6 h-6 text-green-500" />
      </ButtonIcon>
      <ButtonIcon
        @click.stop="selectedType = undefined"
        class="p-2 rounded-md bg-red-100 hover:bg-green-200 duration-200"
      >
        <XMarkIcon class="w-6 h-6 text-red-500" />
      </ButtonIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBiensStore } from '@/stores/biens-store'
import { onMounted, ref } from 'vue'
import TextField from '../inputs/TextField.vue'
import ButtonIcon from '../buttons/ButtonIcon.vue'
import { CheckIcon, PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { confirm } from '@tauri-apps/api/dialog'

const biensService = useBiensStore()
const selectedType = ref<BienType | undefined>()
const newType = ref<BienType>({})

function addType() {
  if (newType.value.label) {
    biensService.addBienType(newType.value).then(() => {
      newType.value = {}
    })
  }
}

async function deleteType(id: number) {
  const confirmed = await confirm(`Êtes-vous sûr de vouloir supprimer ce type ? `, {
    okLabel: 'Supprimer',
    cancelLabel: 'Annuler'
  })
  if (confirmed) {
    await biensService.deleteBienType(id)
  }
}

function editType() {
  if (selectedType.value) {
    biensService.editBienType(selectedType.value).then(() => {
      selectedType.value = undefined
    })
  }
}

onMounted(async () => {
  await biensService.getAllBienType()
})
</script>
