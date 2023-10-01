import { useDbStore } from "@/stores/db-store";
import type Database from "tauri-plugin-sql-api";

export default class ClientsService {
    private db: Database = useDbStore().db!

    async getAllClients() {
        const val = await this.db.select(`SELECT * FROM clients`)
        console.log(val);
        console.log(typeof val);
    }

}