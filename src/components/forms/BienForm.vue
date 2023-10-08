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

      <div class="w-full flex items-end gap-1">
        <ComboBox
          label="Type"
          placeholder="appartement"
          :options="biensStore.bienTypes"
          :required="true"
          v-model:value="bien.type"
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
          <BienTypeForm />
        </Modal>
      </div>
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
      <div class="w-full flex items-end gap-1">
        <ComboBox
          label="Etat"
          placeholder="Dispobile"
          :options="biensStore.bienEtats"
          :required="true"
          v-model:value="bien.etat"
          v-model:is-valid="formValid.etat"
        ></ComboBox>
        <Modal id="projects-type-modal">
          <template #toggle-button>
            <ButtonIcon
              class="p-2 bg-slate-200 rounded-md hover:bg-orange-100 hover:text-orange-500 text-slate-600 duration-200"
            >
              <PencilSquareIcon class="w-6 h-6" />
            </ButtonIcon>
          </template>
          <BienEtatForm />
        </Modal>
      </div>
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
import Modal from '@/layouts/Modal.vue'
import ButtonIcon from '../buttons/ButtonIcon.vue'
import BienTypeForm from './BienTypeForm.vue'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import BienEtatForm from './BienEtatForm.vue'

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
    etat: false
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
    biensStore.addBien(bien.value).then(() => {
      resetForm()
    })
  }
}

onMounted(() => {
  biensStore.getProjectsCombo()
  biensStore.getAllBienEtat()
})
</script>
