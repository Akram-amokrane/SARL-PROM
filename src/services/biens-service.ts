import { useDbStore } from "@/stores/db-store";
import type Database from "tauri-plugin-sql-api";

export default class BiensService {
    private db: Database = useDbStore().db!

    async getAllBiens() {
        const val = await this.db.select(`SELECT * FROM biens`)
        console.log(val);
        console.log(typeof val);
    }

}