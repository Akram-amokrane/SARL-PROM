<template>
  <Filter
    @reset="
      () => {
        biensStore.getAllBiens()
        filters = new BienFilter()
      }
    "
  >
    <div class="flex flex-col gap-1">
      <ComboBox
        v-show="biensStore.projectOptions.length > 0"
        label="Projet"
        :options="[{ label: 'Tout', value: undefined }, ...biensStore.projectOptions]"
        placeholder="Projet X"
        v-model:value="filters.projet"
      ></ComboBox>
      <div class="flex gap-1">
        <NumberField label="Ilot" placeholder="0" v-model:value="filters.ilot"></NumberField>
        <NumberField label="Lot" placeholder="0" v-model:value="filters.lot"></NumberField>
        <TextField label="Bloc" placeholder="A" v-model:value="filters.bloc"></TextField>
        <NumberField label="Port" placeholder="0" v-model:value="filters.port"></NumberField>
        <NumberField label="Etage" placeholder="0" v-model:value="filters.etage"></NumberField>
      </div>
      <ComboBox
        label="Type"
        :options="biensStore.projectOptions"
        placeholder="Projet"
        v-model:value="filters.type"
      ></ComboBox>
      <div class="flex gap-1">
        <NumberField
          label="Superficier habitable"
          placeholder="min"
          v-model:value="filters.SupHab.min"
        ></NumberField>
        <NumberField label="‎" placeholder="max" v-model:value="filters.SupHab.max"></NumberField>
      </div>
      <div class="flex gap-1">
        <NumberField
          label="Cout (m2)"
          placeholder="min"
          v-model:value="filters.coutM2.min"
        ></NumberField>
        <NumberField label="‎" placeholder="max" v-model:value="filters.coutM2.max"></NumberField>
      </div>
      <div class="flex gap-1">
        <NumberField
          label="Montant"
          placeholder="min"
          v-model:value="filters.montant.min"
        ></NumberField>
        <NumberField label="‎" placeholder="max" v-model:value="filters.montant.max"></NumberField>
      </div>
    </div>
  </Filter>
</template>

<script setup lang="ts">
import { useBiensStore } from '@/stores/biens-store'
import Filter from './Filter.vue'
import { onMounted, ref, watch } from 'vue'
import ComboBox from '../inputs/ComboBox.vue'
import NumberField from '../inputs/NumberField.vue'
import TextField from '../inputs/TextField.vue'
import { BienFilter } from '@/models/Filters'

const biensStore = useBiensStore()

const filters = ref<BienFilter>(new BienFilter())

watch(
  filters.value,
  async (n, o) => {
    console.log(n)
    await biensStore.filterBiens(n)
  },
  { deep: true }
)

onMounted(() => {
  biensStore.getProjectsCombo()
})
</script>
