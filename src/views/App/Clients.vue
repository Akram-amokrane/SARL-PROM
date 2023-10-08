<template>
  <div class="w-full h-full flex justify-start items-start relative overflow-hidden">
    <div class="w-[calc(100%-64px)] max-h-full flex flex-col gap-2">
      <div
        class="flex justify-between z-10 items-center w-full h-16 min-h-[64px] p-3 bg-white dark:bg-gray-800 rounded-md drop-shadow-md"
      >
        <h2 class="text-2xl font-semibold dark:text-white">Clients</h2>
        <div>
          <Search @search="(e) => search(e)" />
        </div>
        <div>
          <ClientsFilter />
        </div>
      </div>

      <div
        class="w-full h-full p-3 bg-white dark:bg-gray-800 rounded-md drop-shadow-md overflow-x-hidden overflow-y-auto"
      >
        <Table
          @checkedAll="(v) => clientsStore.checkAll(v)"
          :all="clientsStore.selectedCount == clientsStore.tableData.length"
        >
          <template #header>
            <Column>Nom</Column>
            <Column>Prénom</Column>
            <Column>Date de Naissance</Column>
            <Column>Lieu de Naissance</Column>
            <Column>Adresse</Column>
            <Column>Telephone</Column>
            <Column>Email</Column>
            <Column>note</Column>
          </template>
          <template #body>
            <Row
              v-for="{ data, checked } in clientsStore.tableData"
              :key="data.id"
              :selected="checked"
              @toggleRowChecked="clientsStore.toggleRowChecked(data.id!)"
              ref="rowsRef"
            >
              <ColItem> {{ data.nom }}</ColItem>
              <ColItem>{{ data.prenom }}</ColItem>
              <ColItem>{{ data.dateNaissance }} </ColItem>
              <ColItem>{{ data.lieuNaissance }} </ColItem>
              <ColItem class="">{{ data.adresse }} </ColItem>
              <ColItem>{{ data.telephone }}</ColItem>
              <ColItem>{{ data.email }}</ColItem>
              <ColItem>
                <div class="relative">
                  <DocumentTextIcon class="peer w-5 h-5 text-slate-600" />
                  <div
                    class="absolute w-52 bottom-full right-2 hidden peer-hover:block bg-yellow-200 p-2 justify-center items-center"
                  >
                    {{ data.note }}
                  </div>
                </div>
              </ColItem>
              <ColItem>
                <div class="flex justify-center items-center gap-2">
                  <ButtonIcon
                    class="p-1 hover:bg-blue-100"
                    @click.prevent.stop="showEditDrawer(data)"
                  >
                    <EditIcon class="w-6 h-6 p-0.5 fill-blue-600" />
                  </ButtonIcon>
                </div>
              </ColItem>
            </Row>
          </template>
        </Table>
      </div>
    </div>
    <div
      class="w-16 h-full py-3 gap-4 bg-white dark:bg-gray-800 flex flex-col justify-start items-center drop-shadow-md absolute -right-2 rounded-l-lg"
    >
      <ButtonIcon
        :circle="true"
        class="p-2 bg-green-100 dark:bg-green-800"
        @click="showAddDrawer()"
      >
        <AddIcon class="w-6 h-6 fill-green-600 dark:fill-green-200" />
      </ButtonIcon>
      <ButtonIcon
        :circle="true"
        class="p-2 bg-red-100 dark:bg-red-800 relative"
        :disabled="clientsStore.selectedCount == 0"
        @click.stop="deleteClient()"
      >
        <span
          v-show="clientsStore.selectedCount > 0"
          class="absolute flex justify-center items-center rounded-full w-4 h-4 -top-1 -right-1 bg-red-600 text-white text-xs"
          >{{ clientsStore.selectedCount }}</span
        >
        <TrashIcon class="w-6 h-6 fill-red-600 dark:fill-red-200" />
      </ButtonIcon>
    </div>
    <Drawer from="right" :show="showAdd && !showEdit" @close="showAdd = false">
      <div>
        <ClientForm></ClientForm>
      </div>
    </Drawer>
    <Drawer
      from="right"
      v-if="showEdit && clientEdit && !showAdd"
      :show="showEdit && clientEdit && !showAdd"
      @close="showEdit = false"
    >
      <div>
        <ClientEditForm :b="clientEdit"></ClientEditForm>
      </div>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
// Components
import Table from '@/components/table/Table.vue'
import Column from '@/components/table/Column.vue'
import Row from '@/components/table/Row.vue'
import ColItem from '@/components/table/ColItem.vue'
import ButtonIcon from '@/components/buttons/ButtonIcon.vue'

// Icons
import TrashIcon from '@/components/icons/TrashIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import { useClientsStore } from '@/stores/clients-store'
import { onMounted, ref } from 'vue'
import Search from '@/components/Search.vue'

//tauri
import { confirm } from '@tauri-apps/api/dialog'
import Client from '@/models/Client'
import Drawer from '@/layouts/Drawer.vue'
import ClientForm from '@/components/forms/ClientForm.vue'
import ClientEditForm from '@/components/forms/ClientEditForm.vue'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
import ClientsFilter from '@/components/filter/ClientsFilter.vue'

const clientsStore = useClientsStore()

const showAdd = ref(false)
const showEdit = ref(false)
const clientEdit = ref<Client>({})

function showEditDrawer(p: Client) {
  if (!showEdit.value) {
    clientEdit.value = JSON.parse(JSON.stringify(p)) as Client
    showEdit.value = true
  }
}

async function search(str: string) {
  await clientsStore.search(str)
}

async function deleteClient() {
  const confirmed = await confirm(
    `Êtes-vous sûr de vouloir supprimer ces ${clientsStore.selectedCount} clients? Cette action est irréversible et entraînera la perte de toutes les données associées à ces clients.`,
    { okLabel: 'Supprimer', cancelLabel: 'Annuler' }
  )
  if (confirmed) {
    await clientsStore.deleteClients()
  }
}

function showAddDrawer() {
  showAdd.value = true
}

onMounted(() => {
  clientsStore.getAllClients()
})
</script>
