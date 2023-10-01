<template>
  <form id="clients-form" class="w-full h-full flex flex-col justify-between items-center gap-4">
    <div
      class="w-auto h-full flex justify-center items-start gap-3 overflow-y-auto overflow-x-hidden"
    >
      <div class="w-80 flex flex-col justify-start gap-2 h-full">
        <TextField
          label="Prénom"
          placeholder="John"
          :icon="true"
          :validators="[minLength(3)]"
          :required="true"
          v-model:value="client.prenom"
        >
          <template #icon>
            <UserIcon class="w-5 h-5" />
          </template>
        </TextField>
        <TextField
          label="Nom"
          placeholder="Doe"
          :icon="true"
          :validators="[minLength(3)]"
          :required="true"
          v-model:value="client.nom"
        >
          <template #icon>
            <UserIcon class="w-5 h-5" />
          </template>
        </TextField>
        <DateField label="Date of birth" :required="true" v-model:value="client.dateNaissance" />
        <TextField
          label="Telephone"
          placeholder="phone number"
          :icon="true"
          :validators="[minLength(10), pattern(myPatterns.mobile)]"
          v-model:value="client.telephone"
        >
          <template #icon>
            <DevicePhoneMobileIcon class="w-5 h-5" />
          </template>
        </TextField>
        <TextField
          label="Email"
          placeholder="johndoe@gmail.com"
          :icon="true"
          :validators="[pattern(myPatterns.email)]"
          v-model:value="client.email"
        >
          <template #icon>
            <AtSymbolIcon class="w-5 h-5" />
          </template>
        </TextField>
        <TextField
          label="Lieu de naissance"
          placeholder="Annaba"
          :icon="true"
          :validators="[minLength(0)]"
          v-model:value="client.lieuNaissance"
        >
          <template #icon>
            <IdentificationIcon class="w-5 h-5" />
          </template>
        </TextField>
        <TextField
          label="Adresse"
          placeholder="Bejaia"
          :icon="true"
          :validators="[minLength(0)]"
          v-model:value="client.adresse"
        >
          <template #icon>
            <IdentificationIcon class="w-5 h-5" />
          </template>
        </TextField>
      </div>
    </div>
    <div class="absolute bottom-0 w-full flex justify-end items-center gap-3 p-3">
      <Button
        @click.prevent="resetForm"
        :icon="true"
        class="w-36 text-slate-600 bg-slate-300 hover:bg-slate-400"
      >
        RESET
      </Button>
      <Button
        @click.prevent="saveClient"
        :icon="true"
        class="w-36 text-white bg-blue-600 hover:bg-blue-700"
        :disabled="false"
      >
        SAVE
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import TextField from '../inputs/TextField.vue'
import TextArea from '../inputs/TextArea.vue'
import DateField from '../inputs/DateField.vue'
import ToggleGroup from '../inputs/ToggleGroup.vue'
import Button from '../buttons/Button.vue'
import { minLength, pattern } from '@/utils/validators'
import { myPatterns } from '@/utils/constants'
import {
  AtSymbolIcon,
  DevicePhoneMobileIcon,
  UserIcon,
  IdentificationIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { computed, ref, watch } from 'vue'
import Client from '@/models/Client'
import { useClientsStore } from '@/stores/clients-store'

const clientsStore = useClientsStore()

const client = ref<Client>({
  nom: '',
  prenom: '',
  dateNaissance: '',
  lieuNaissance: '',
  email: '',
  telephone: '',
  adresse: '',
  note: ''
})

function resetForm() {
  client.value = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    email: '',
    telephone: '',
    adresse: '',
    note: ''
  }
}

function saveClient() {
  console.log(client.value)
}
</script>
