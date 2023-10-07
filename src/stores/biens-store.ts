import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import RowData from '@/models/RowData'
import BiensService from "@/services/biens-service"
import type Bien from '@/models/Bien'
import ProjectService from '@/services/project-service'
import type ComboOption from '@/models/ComboOption'
import type { BienFilter } from '@/models/Filters'

export const useBiensStore = defineStore('biensStore', () => {
    const biens = ref<Bien[]>([])
    const biensService = new BiensService()
    const projectService = new ProjectService()
    const tableData = ref<RowData<Bien>[]>([])
    const selectedCount = computed(() => (tableData.value.filter((row) => row.checked)).length)
    const selectedBienIds = computed(() => (tableData.value.filter((row) => row.checked).map((row) => row.data.id)))
    const projectOptions = ref<ComboOption[]>([])

    watch(biens, (n, o) => {
        tableData.value = biens.value.map((p: Bien) => new RowData<Bien>(p));
    }, { deep: true })


    function search(str: string) {
        tableData.value = biens.value.filter((p: Bien) => {
            return `${p.projectLabel} ${p.bloc} ${p.type} ${p.etat}`.toLowerCase().includes(str)
        }).map((p: Bien) => new RowData<Bien>(p));
    }



    function toggleRowChecked(id: number) {
        tableData.value = tableData.value.map((row) =>
            row.data.id == id ? { data: row.data, checked: !row.checked } : row
        );
    }

    function checkAll(b: boolean) {
        tableData.value = tableData.value.map((row) => {
            return { ...row, checked: b };
        });
    }

    async function getAllBiens() {
        biensService.getAllBiens().then((p) => {
            biens.value = p;
        })
    }

    async function filterBiens(filter: BienFilter) {
        biensService.filterBiens(filter).then((b) => {
            biens.value = b
        })
    }


    async function getProjectsCombo() {
        projectService.getProjectToCombo().then((p) => {
            projectOptions.value = p;
        })
    }

    async function addBien(p: Bien) {
        await biensService.addBien(p)
        await getAllBiens()
    }

    async function editBien(p: Bien) {
        await biensService.editBien(p)
        await getAllBiens();
    }

    async function deleteBiens() {
        selectedBienIds.value.forEach(async (id) => {
            await biensService.deleteBiens(id as number);
        })
        await getAllBiens();
    }



    return { tableData, selectedCount, projectOptions, search, getAllBiens, filterBiens, addBien, editBien, deleteBiens, toggleRowChecked, checkAll, getProjectsCombo }
})
