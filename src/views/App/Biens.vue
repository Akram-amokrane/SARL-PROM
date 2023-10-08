<template>
  <div class="w-full h-full flex justify-start items-start relative overflow-hidden">
    <div class="w-[calc(100%-64px)] max-h-full flex flex-col gap-2">
      <div
        class="flex z-10 justify-between items-center w-full h-16 min-h-[64px] p-3 bg-white dark:bg-gray-800 rounded-md drop-shadow-md"
      >
        <h2 class="text-2xl font-semibold dark:text-white">Biens</h2>
        <div>
          <Search @search="(s) => search(s)" />
        </div>
        <div>
          <BiensFilter></BiensFilter>
        </div>
      </div>

      <div
        v-show="biensStore.tableData.length > 0"
        class="w-full h-full p-3 bg-white dark:bg-gray-800 rounded-md drop-shadow-md overflow-x-hidden overflow-y-auto"
      >
        <Table
          @checkedAll="(v) => biensStore.checkAll(v)"
          :all="biensStore.selectedCount == biensStore.tableData.length"
        >
          <template #header>
            <Column>Projet</Column>
            <Column>Ilot</Column>
            <Column>Lot</Column>
            <Column>Bloc</Column>
            <Column>Port</Column>
            <Column>Etage</Column>
            <Column>Type</Column>
            <Column>S.Habitable</Column>
            <Column>S.Utile</Column>
            <Column>Cout M2</Column>
            <Column>Montant</Column>
            <Column>Etat</Column>
          </template>
          <template #body>
            <Row
              v-for="{ data, checked } in biensStore.tableData"
              :key="data.id"
              :selected="checked"
              @toggleRowChecked="biensStore.toggleRowChecked(data.id!)"
              ref="rowsRef"
              :class="{
                'bg-red-100': data.etat == 'Reserver'
              }"
            >
              <ColItem> {{ data.projectLabel }}</ColItem>
              <ColItem align="right">{{ data.ilot }} </ColItem>
              <ColItem align="right">{{ data.lot }} </ColItem>
              <ColItem>{{ data.bloc }} </ColItem>
              <ColItem align="right">{{ data.port }}</ColItem>
              <ColItem align="right">{{ data.etage }}</ColItem>
              <ColItem>{{ data.type }}</ColItem>
              <ColItem align="right">{{ data.supHab }}</ColItem>
              <ColItem align="right">{{ data.supUtil }}</ColItem>
              <ColItem align="right">{{ data.coutM2 }}</ColItem>
              <ColItem align="right">{{ data.montant }}</ColItem>
              <ColItem>{{ data.etat }}</ColItem>
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
      <div
        class="mt-28 w-full h-full flex flex-col justify-center items-center"
        v-show="!(biensStore.tableData.length > 0)"
      >
        <NoData class="w-72 h-72" />
        <p class="text-xl text-slate-400 inline-block w-72 text-center">
          La base de données est vide cliquer sur (+) pour ajouter
        </p>
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
        :disabled="biensStore.selectedCount == 0"
        @click.stop="deleteBien()"
      >
        <span
          v-show="biensStore.selectedCount > 0"
          class="absolute flex justify-center items-center rounded-full w-4 h-4 -top-1 -right-1 bg-red-600 text-white text-xs"
          >{{ biensStore.selectedCount }}</span
        >
        <TrashIcon class="w-6 h-6 fill-red-600 dark:fill-red-200" />
      </ButtonIcon>
    </div>
    <Drawer from="right" :show="showAdd && !showEdit" @close="showAdd = false">
      <div>
        <BienForm></BienForm>
      </div>
    </Drawer>
    <Drawer
      from="right"
      v-if="showEdit && bienEdit && !showAdd"
      :show="showEdit && bienEdit && !showAdd"
      @close="showEdit = false"
    >
      <div>
        <BienEditForm :b="bienEdit"></BienEditForm>
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
import BiensFilter from '@/components/filter/BiensFilter.vue'

// Icons
import TrashIcon from '@/components/icons/TrashIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import { useBiensStore } from '@/stores/biens-store'
import { onMounted, ref } from 'vue'
import Search from '@/components/Search.vue'

//tauri
import { confirm } from '@tauri-apps/api/dialog'
import type Bien from '@/models/Bien'
import Drawer from '@/layouts/Drawer.vue'
import BienForm from '@/components/forms/BienForm.vue'
import BienEditForm from '@/components/forms/BienEditForm.vue'
import NoData from '@/components/icons/NoData.vue'

const biensStore = useBiensStore()

const showAdd = ref(false)
const showEdit = ref(false)
const bienEdit = ref<Bien>({})

function showEditDrawer(p: Bien) {
  if (!showEdit.value) {
    bienEdit.value = JSON.parse(JSON.stringify(p)) as Bien
    showEdit.value = true
  }
}

async function search(str: string) {
  await biensStore.search(str)
}

async function deleteBien() {
  const confirmed = await confirm(
    `Êtes-vous sûr de vouloir supprimer ces ${biensStore.selectedCount} biens? Cette action est irréversible et entraînera la perte de toutes les données associées à ces biens.`,
    { okLabel: 'Supprimer', cancelLabel: 'Annuler' }
  )
  if (confirmed) {
    await biensStore.deleteBiens()
  }
}

function showAddDrawer() {
  showAdd.value = true
}

onMounted(() => {
  biensStore.getAllBiens()
})
</script>
