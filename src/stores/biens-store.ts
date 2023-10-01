import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import RowData from '@/models/RowData'
import BiensService from "@/services/biens-service"
import type Bien from '@/models/Bien'

export const useBiensStore = defineStore('biensStore', () => {
    const biens = ref<Bien[]>([])
    const biensService = new BiensService()
    const tableData: RowData<Bien>[] = []
    const selectedCount = ref(0)

    async function getAllBiens() {
        await biensService.getAllBiens();
    }


    function toggleRowChecked(id: number) {

    }

    function checkAll(v: boolean) { }



    return { tableData, selectedCount, getAllBiens, toggleRowChecked, checkAll }
})
