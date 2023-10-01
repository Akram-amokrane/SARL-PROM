import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import Client from '@/models/Client'
import RowData from '@/models/RowData'
import ClientsService from '@/services/clients-service'

export const useClientsStore = defineStore('clientsStore', () => {
    const clients = ref<Client[]>([])
    const clientsService = new ClientsService()
    const tableData: RowData<Client>[] = []
    const selectedCount = ref(0)

    async function getAllClients() {
        await clientsService.getAllClients();
    }


    function toggleRowChecked(id: number) {

    }

    function checkAll(v: boolean) { }



    return { tableData, selectedCount, getAllClients, toggleRowChecked, checkAll }
})
