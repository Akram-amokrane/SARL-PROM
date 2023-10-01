<template>
  <div class="w-full h-full flex justify-start items-start relative overflow-hidden">
    <div class="w-[calc(100%-64px)] max-h-full flex flex-col gap-2 overflow-hidden">
      <TableHeader
        class="w-full h-16 min-h-[64px] p-3 bg-white dark:bg-gray-800 rounded-md drop-shadow-md overflow-x-hidden overflow-hidden"
      />
      <div
        class="w-full h-full p-3 bg-white dark:bg-gray-800 rounded-md drop-shadow-md overflow-x-hidden overflow-y-auto"
      >
        <Table
          @checkedAll="(v) => clientsStore.checkAll(v)"
          :all="clientsStore.selectedCount == clientsStore.tableData.length"
        >
          <template #header>
            <Column>Nom</Column>
            <Column>Date de naissance</Column>
            <Column>Lieu de naissance</Column>
            <Column>Telephone</Column>
            <Column>Email</Column>
            <Column>Adresse</Column>
            <Column></Column>
          </template>
          <template #body>
            <Row
              v-for="{ data, checked } in clientsStore.tableData"
              :key="data.id"
              :selected="checked"
              @toggleRowChecked="(id) => clientsStore.toggleRowChecked(id)"
              ref="rowsRef"
            >
              <ColItem> {{ data.nom }} {{ data.prenom }}</ColItem>
              <ColItem>{{ data.dateNaissance }} </ColItem>
              <ColItem>{{ data.lieuNaissance }} </ColItem>
              <ColItem>{{ data.telephone }}</ColItem>
              <ColItem>{{ data.email }} </ColItem>
              <ColItem>{{ data.adresse }} </ColItem>
              <ColItem>
                <div class="flex justify-center items-center gap-2">
                  <ButtonIcon class="p-1 hover:bg-purple-100">
                    <EditIcon class="w-6 h-6 p-0.5 fill-purple-500" />
                  </ButtonIcon>
                  <ButtonIcon class="p-1 hover:bg-blue-100">
                    <DataIcon class="w-6 h-6 fill-blue-600 dark:fill-blue-200" />
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
      <ButtonIcon class="p-2 bg-green-100 dark:bg-green-800" @click="showAdd = !showAdd">
        <AddIcon class="w-6 h-6 fill-green-600 dark:fill-green-200" />
      </ButtonIcon>
      <ButtonIcon
        class="p-2 bg-red-100 dark:bg-red-800 relative"
        :disabled="clientsStore.selectedCount == 0"
      >
        <span
          v-show="clientsStore.selectedCount > 0"
          class="absolute flex justify-center items-center rounded-full w-4 h-4 -top-1 -right-1 bg-red-600 text-white text-xs"
          >{{ clientsStore.selectedCount }}</span
        >
        <TrashIcon class="w-6 h-6 fill-red-600 dark:fill-red-200" />
      </ButtonIcon>
    </div>
    <Drawer :show="showAdd" from="right" v-model:close="showAdd">
      <div>
        <PatientsForm />
      </div>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
// Components
import Table from '@/components/table/Table.vue'
import TableHeader from '@/components/table/TableHeader.vue'
import Column from '@/components/table/Column.vue'
import Row from '@/components/table/Row.vue'
import ColItem from '@/components/table/ColItem.vue'
import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
import Drawer from '@/layouts/Drawer.vue'
import PatientsForm from '@/components/forms/PatientsForm.vue'

// Icons
import TrashIcon from '@/components/icons/TrashIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import DataIcon from '@/components/icons/DataIcon.vue'
import { ref } from 'vue'
import { useClientsStore } from '@/stores/clients-store'

const clientsStore = useClientsStore()

const showAdd = ref(false)
</script>
@/stores/projects-store @/stores/clients-store
