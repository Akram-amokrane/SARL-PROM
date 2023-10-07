import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import Client from '@/models/Client'
import RowData from '@/models/RowData'
import ClientsService from '@/services/clients-service'
import type { ClientFilter } from '@/models/Filters'

export const useClientsStore = defineStore('clientsStore', () => {
    const clients = ref<Client[]>([])
    const clientsService = new ClientsService()
    const tableData = ref<RowData<Client>[]>([])
    const selectedCount = computed(() => (tableData.value.filter((row) => row.checked)).length)
    const selectedClientIds = computed(() => (tableData.value.filter((row) => row.checked).map((row) => row.data.id)))


    watch(clients, (n, o) => {
        tableData.value = clients.value.map((p: Client) => new RowData<Client>(p));
    }, { deep: true })


    function search(str: string) {
        tableData.value = clients.value.filter((p: Client) => {
            return `${p.nom} ${p.prenom} ${p.adresse} ${p.telephone} ${p.email} ${p.note}`.toLowerCase().includes(str)
        }).map((p: Client) => new RowData<Client>(p));
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

    async function getAllClients() {
        clientsService.getAllClients().then((p) => {
            clients.value = p;
        })
    }

    async function filterClients(filter: ClientFilter) {
        clientsService.filterBiens(filter).then((b) => {
            clients.value = b
        })
    }

    async function addClient(p: Client) {
        await clientsService.addClient(p)
        await getAllClients()
    }

    async function editClient(p: Client) {
        await clientsService.editClient(p)
        await getAllClients();
    }

    async function deleteClients() {
        selectedClientIds.value.forEach(async (id) => {
            await clientsService.deleteClients(id as number);
        })
        await getAllClients();
    }



    return { tableData, selectedCount, search, getAllClients, filterClients, addClient, editClient, deleteClients, toggleRowChecked, checkAll }
})
