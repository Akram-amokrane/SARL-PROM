<template>
  <form>
    <div class="flex flex-col gap-3">
      <ComboBox
        label="Projet"
        placeholder="Projet A"
        :options="biensStore.projectOptions"
        :required="true"
        v-model:value="bien.projectId"
        v-model:is-valid="formValid.projectId"
        :val="bien.projectId"
      ></ComboBox>
      <div class="max-w-sm flex justify-start items-center gap-1">
        <NumberField
          label="Ilot"
          placeholder=""
          :required="true"
          v-model:value="bien.ilot"
          v-model:is-valid="formValid.ilot"
        >
        </NumberField>
        <NumberField
          label="Lot"
          placeholder=""
          :required="true"
          v-model:value="bien.lot"
          v-model:is-valid="formValid.lot"
        >
        </NumberField>
        <TextField
          label="Bloc"
          placeholder=""
          :required="true"
          v-model:value="bien.bloc"
          v-model:is-valid="formValid.bloc"
        >
        </TextField>
        <NumberField
          label="Port"
          placeholder=""
          :required="true"
          v-model:value="bien.port"
          v-model:is-valid="formValid.port"
        >
        </NumberField>
        <NumberField
          label="Etage"
          placeholder=""
          :required="true"
          v-model:value="bien.etage"
          v-model:is-valid="formValid.etage"
        >
        </NumberField>
      </div>
      <ComboBox
        label="Type"
        placeholder="appartement"
        :options="biensStore.bienTypes"
        :required="true"
        v-model:value="bien.type"
        v-model:is-valid="formValid.type"
        :valstr="bien.type"
      ></ComboBox>
      <NumberField
        label="Superficier Habitable"
        placeholder=""
        :required="true"
        v-model:value="bien.supHab"
        v-model:is-valid="formValid.supHab"
      >
      </NumberField>
      <NumberField
        label="Superficier Utile"
        placeholder=""
        :required="true"
        v-model:value="bien.supUtil"
        v-model:is-valid="formValid.supUtil"
      >
      </NumberField>
      <NumberField
        label="Cout (m2)"
        placeholder=""
        :required="true"
        v-model:value="bien.coutM2"
        v-model:is-valid="formValid.coutM2"
      >
      </NumberField>
      <NumberField
        label="Montant"
        placeholder=""
        :required="true"
        v-model:value="bien.montant"
        v-model:is-valid="formValid.coutM2"
      >
      </NumberField>
      <ComboBox
        label="Etat"
        placeholder="Dispobile"
        :options="biensStore.bienEtats"
        :required="true"
        v-model:value="bien.etat"
        v-model:is-valid="formValid.etat"
        :valstr="bien.etat"
      ></ComboBox>
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
        @click.prevent="saveBien"
        :icon="true"
        class="w-1/2 text-white bg-blue-600 hover:bg-blue-700"
        :disabled="!formIsValid()"
      >
        Modifier
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import TextField from '../inputs/TextField.vue'
import NumberField from '../inputs/NumberField.vue'
import ComboBox from '../inputs/ComboBox.vue'
import Button from '../buttons/Button.vue'
import { onMounted, ref, watch } from 'vue'
import Bien from '@/models/Bien'
import { useBiensStore } from '@/stores/biens-store'
import { useNotificationStore } from '@/stores/notification-store'

const props = defineProps({
  b: { type: Object, required: true }
})

const biensStore = useBiensStore()

const bien = ref<Bien>(props.b as Bien)
const bien0 = JSON.parse(JSON.stringify(props.b)) as Bien

const formValid = ref({
  projectId: true,
  ilot: true,
  lot: true,
  bloc: true,
  port: true,
  etage: true,
  type: true,
  supHab: true,
  supUtil: true,
  coutM2: true,
  montant: true,
  etat: true
})

function resetForm() {
  bien.value = bien0

  formValid.value = {
    projectId: true,
    ilot: true,
    lot: true,
    bloc: true,
    port: true,
    etage: true,
    type: true,
    supHab: true,
    supUtil: true,
    coutM2: true,
    montant: true,
    etat: true
  }
}

watch(bien.value, (n, o) => {
  if (n.supHab && n.coutM2) {
    bien.value.montant = n.supHab * n.coutM2
    formValid.value.montant = true
  } else {
    bien.value.montant = undefined
    formValid.value.montant = false
  }
})

function formIsValid(): boolean {
  const { projectId, ilot, lot, bloc, port, etage, type, supHab, supUtil, coutM2, montant, etat } =
    formValid.value
  return (
    projectId &&
    ilot &&
    lot &&
    bloc &&
    port &&
    etage &&
    type &&
    supHab &&
    supUtil &&
    coutM2 &&
    montant &&
    etat
  )
}

async function saveBien() {
  if (formIsValid()) {
    biensStore.editBien(bien.value).then(() => {
      resetForm()
    })
  }
}

onMounted(() => {
  biensStore.getProjectsCombo()
})
</script>
