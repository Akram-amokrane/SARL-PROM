import { ref } from 'vue'
import { defineStore } from 'pinia'
import Database from "tauri-plugin-sql-api"


export const useDbStore = defineStore('dbStore', () => {
    const db = ref<Database>();

    async function connect() {
        db.value = await Database.load("sqlite:data.db");

    }

    async function disconnect() {
        db.value?.close()
    }




    return { db, connect, disconnect }
})
