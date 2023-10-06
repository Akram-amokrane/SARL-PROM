<template>
  <form>
    <div class="flex flex-col gap-3">
      <ComboBox
        label="Projet"
        placeholder="Projet A"
        :options="biensStore.projectOptions"
        :required="true"
        v-model:value="bien.projectId"
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
      <TextField
        label="Type"
        placeholder=""
        :required="true"
        v-model:value="bien.type"
        v-model:is-valid="formValid.type"
      >
      </TextField>
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
        Ajouter
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { minLength } from '@/utils/validators'
import TextField from '../inputs/TextField.vue'
import NumberField from '../inputs/NumberField.vue'
import ComboBox from '../inputs/ComboBox.vue'
import Button from '../buttons/Button.vue'
import { onMounted, ref, watch } from 'vue'
import Bien from '@/models/Bien'
import { useBiensStore } from '@/stores/biens-store'

const biensStore = useBiensStore()

const bien = ref<Bien>({})
const formValid = ref({
  projectId: false,
  ilot: false,
  lot: false,
  bloc: false,
  port: false,
  etage: false,
  type: false,
  supHab: false,
  supUtil: false,
  coutM2: false,
  montant: false,
  etat: false
})

function resetForm() {
  bien.value = {} as Bien

  formValid.value = {
    projectId: false,
    ilot: false,
    lot: false,
    bloc: false,
    port: false,
    etage: false,
    type: false,
    supHab: false,
    supUtil: false,
    coutM2: false,
    montant: false,
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
  // return (
  //   projectId &&
  //   ilot &&
  //   lot &&
  //   bloc &&
  //   port &&
  //   etage &&
  //   type &&
  //   supHab &&
  //   supUtil &&
  //   coutM2 &&
  //   montant &&
  //   etat
  // )
  return true
}

async function saveBien() {
  if (formIsValid()) {
    biensStore.addBien(bien.value).then(() => {
      resetForm()
    })
  }
  console.log(bien.value)
}

onMounted(() => {
  biensStore.getProjectsCombo()
})
</script>
