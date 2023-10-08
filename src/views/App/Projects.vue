<template>
  <div class="w-full h-full flex justify-start items-start relative overflow-hidden">
    <div class="w-[calc(100%-64px)] max-h-full flex flex-col gap-2">
      <div
        class="flex z-10 justify-between items-center w-full h-16 min-h-[64px] p-3 bg-white dark:bg-gray-800 rounded-md drop-shadow-md"
      >
        <h2 class="text-2xl font-semibold dark:text-white">Projets</h2>
        <div>
          <Search @search="(s) => search(s)" />
        </div>
        <div>
          <ProjectsFilter></ProjectsFilter>
        </div>
      </div>

      <div
        v-show="projectsStore.tableData.length > 0"
        class="w-full h-full p-3 bg-white dark:bg-gray-800 rounded-md drop-shadow-md overflow-x-hidden overflow-y-auto"
      >
        <Table
          @checkedAll="(v) => projectsStore.checkAll(v)"
          :all="projectsStore.selectedCount == projectsStore.tableData.length"
        >
          <template #header>
            <Column>Label</Column>
            <Column>Type</Column>
            <Column>Description</Column>
            <Column>Nombre de Biens</Column>
            <Column></Column>
          </template>
          <template #body>
            <Row
              v-for="{ data, checked } in projectsStore.tableData"
              :key="data.id"
              :selected="checked"
              @toggleRowChecked="projectsStore.toggleRowChecked(data.id!)"
              ref="rowsRef"
            >
              <ColItem> {{ data.label }}</ColItem>
              <ColItem>{{ data.type }} </ColItem>
              <ColItem>{{ data.description }} </ColItem>
              <ColItem>{{ data.nombreBien }} </ColItem>
              <ColItem>
                <div class="flex justify-center items-center gap-2">
                  <ButtonIcon
                    class="p-1 hover:bg-purple-100"
                    @click.prevent.stop="showEditSheet(data)"
                  >
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
      <div
        class="mt-28 w-full h-full flex flex-col justify-center items-center"
        v-show="!(projectsStore.tableData.length > 0)"
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
      <ButtonIcon :circle="true" class="p-2 bg-green-100 dark:bg-green-800" @click="showAddSheet()">
        <AddIcon class="w-6 h-6 fill-green-600 dark:fill-green-200" />
      </ButtonIcon>
      <ButtonIcon
        :circle="true"
        class="p-2 bg-red-100 dark:bg-red-800 relative"
        :disabled="projectsStore.selectedCount == 0"
        @click.stop="deleteProject()"
      >
        <span
          v-show="projectsStore.selectedCount > 0"
          class="absolute flex justify-center items-center rounded-full w-4 h-4 -top-1 -right-1 bg-red-600 text-white text-xs"
          >{{ projectsStore.selectedCount }}</span
        >
        <TrashIcon class="w-6 h-6 fill-red-600 dark:fill-red-200" />
      </ButtonIcon>
    </div>
    <Sheet :show="showAdd" v-model:close="showAdd">
      <div>
        <ProjectForm />
      </div>
    </Sheet>

    <Sheet v-if="showEdit" :show="showEdit" v-model:close="showEdit">
      <div>
        <ProjectEditForm :p="projectEdit" />
      </div>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
// Components
import Table from '@/components/table/Table.vue'
import Column from '@/components/table/Column.vue'
import Row from '@/components/table/Row.vue'
import ColItem from '@/components/table/ColItem.vue'
import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
import Sheet from '@/layouts/Sheet.vue'
import ProjectForm from '@/components/forms/ProjectForm.vue'
import ProjectEditForm from '@/components/forms/ProjectEditForm.vue'

// Icons
import TrashIcon from '@/components/icons/TrashIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import DataIcon from '@/components/icons/DataIcon.vue'
import { useProjectsStore } from '@/stores/projects-store'
import { onMounted, ref } from 'vue'
import Search from '@/components/Search.vue'
import type Project from '@/models/Project'

//tauri
import { confirm } from '@tauri-apps/api/dialog'
import ProjectsFilter from '@/components/filter/ProjectsFilter.vue'
import NoData from '@/components/icons/NoData.vue'

const projectsStore = useProjectsStore()

const showAdd = ref(false)
const showEdit = ref(false)
const projectEdit = ref<Project>({
  label: '',
  type: '',
  description: ''
})

function showEditSheet(p: Project) {
  if (!showEdit.value) {
    projectEdit.value = JSON.parse(JSON.stringify(p))
    showEdit.value = true
  }
}

async function search(str: string) {
  await projectsStore.search(str)
}

async function deleteProject() {
  const confirmed = await confirm(
    `Êtes-vous sûr de vouloir supprimer ces ${projectsStore.selectedCount} projets? Cette action est irréversible et entraînera la perte de toutes les données associées à ces projets, y compris les biens qui lui sont liés.`,
    { okLabel: 'Supprimer', cancelLabel: 'Annuler' }
  )
  if (confirmed) {
    await projectsStore.deleteProjects()
  }
}

function showAddSheet() {
  showAdd.value = true
}

onMounted(() => {
  projectsStore.getAllProjects()
})
</script>
