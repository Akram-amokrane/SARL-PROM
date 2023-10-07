<template>
  <Filter
    @reset="
      () => {
        clientsStore.getAllClients()
        filters = new ClientFilter()
      }
    "
  >
    <div class="flex flex-col gap-1">
      <div class="flex gap-1">
        <TextField label="Nom" placeholder="Doe" v-model:value="filters.nom"></TextField>
        <TextField label="Prénom" placeholder="John" v-model:value="filters.prenom"></TextField>
      </div>
      <TextField
        label="Lieu de Naissance"
        placeholder="Bejaia"
        v-model:value="filters.lieuNaissance"
      ></TextField>
      <TextField label="Adresse" placeholder="Tichy" v-model:value="filters.adresse"></TextField>
      <TextField
        label="Telephone"
        placeholder="0541812523"
        v-model:value="filters.telephone"
      ></TextField>
      <TextField
        label="email"
        placeholder="jogndoe@xyz.abc"
        v-model:value="filters.email"
      ></TextField>
    </div>
  </Filter>
</template>

<script setup lang="ts">
import { useClientsStore } from '@/stores/clients-store'
import Filter from './Filter.vue'
import { onMounted, ref, watch } from 'vue'
import ComboBox from '../inputs/ComboBox.vue'
import NumberField from '../inputs/NumberField.vue'
import TextField from '../inputs/TextField.vue'
import { ClientFilter } from '@/models/Filters'

const clientsStore = useClientsStore()

const filters = ref<ClientFilter>(new ClientFilter())

watch(
  filters.value,
  async (n, o) => {
    console.log(n)
    await clientsStore.filterClients(n)
  },
  { deep: true }
)
</script>
