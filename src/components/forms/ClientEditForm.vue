<template>
  <form>
    <div class="flex flex-col gap-3">
      <div class="flex justify-center items-center gap-1">
        <TextField
          label="Nom"
          placeholder="Martin"
          :required="true"
          v-model:value="client.nom"
          v-model:is-valid="formValid.nom"
        ></TextField>
        <TextField
          label="Prénom"
          placeholder="John"
          :required="true"
          v-model:value="client.prenom"
          v-model:is-valid="formValid.prenom"
        ></TextField>
      </div>
      <DateField
        label="Date de Naissance"
        placeholder="09/05/2000"
        :required="true"
        :val="client.dateNaissance"
        v-model:value="client.dateNaissance"
        v-model:is-valid="formValid.dateNaissance"
      >
      </DateField>
      <TextField
        label="Lieu de Naissance"
        placeholder="Paris"
        :required="true"
        v-model:value="client.lieuNaissance"
        v-model:is-valid="formValid.lieuNaissance"
      >
      </TextField>
      <TextField
        label="Adresse"
        placeholder=""
        :required="true"
        v-model:value="client.adresse"
        v-model:is-valid="formValid.adresse"
      >
      </TextField>
      <TextField
        label="Telephone"
        placeholder=""
        :required="true"
        v-model:value="client.telephone"
        v-model:is-valid="formValid.telephone"
      >
      </TextField>
      <TextField
        label="Email"
        placeholder=""
        :required="true"
        v-model:value="client.email"
        v-model:is-valid="formValid.email"
      >
      </TextField>
      <TextArea
        label="Note"
        placeholder=""
        :required="true"
        v-model:value="client.note"
        v-model:is-valid="formValid.note"
      >
      </TextArea>
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
import TextField from '../inputs/TextField.vue'
import NumberField from '../inputs/NumberField.vue'
import ComboBox from '../inputs/ComboBox.vue'
import Button from '../buttons/Button.vue'
import { onMounted, ref, watch } from 'vue'
import Client from '@/models/Client'
import { useClientsStore } from '@/stores/clients-store'
import { useNotificationStore } from '@/stores/notification-store'
import DateField from '../inputs/DateField.vue'
import TextArea from '../inputs/TextArea.vue'

const props = defineProps({
  b: { type: Object, required: true }
})

const clientsStore = useClientsStore()
const notStore = useNotificationStore()

const client = ref<Client>(props.b as Client)
const client0 = JSON.parse(JSON.stringify(props.b)) as Client

const formValid = ref({
  nom: true,
  prenom: true,
  dateNaissance: true,
  lieuNaissance: true,
  adresse: true,
  telephone: true,
  email: true,
  note: true
})

function resetForm() {
  client.value = client0

  formValid.value = {
    nom: true,
    prenom: true,
    dateNaissance: true,
    lieuNaissance: true,
    adresse: true,
    telephone: true,
    email: true,
    note: true
  }
}

function formIsValid(): boolean {
  const { nom, prenom, dateNaissance, lieuNaissance, adresse, telephone, email, note } =
    formValid.value
  return nom && prenom && dateNaissance && lieuNaissance && adresse && telephone && email && note
}

async function saveClient() {
  if (formIsValid()) {
    clientsStore.editClient(client.value).then(() => {
      resetForm()
    })
  }
}
</script>
