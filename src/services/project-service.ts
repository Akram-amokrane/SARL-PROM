import type Project from "@/models/Project";
import { useDbStore } from "@/stores/db-store";
import type Database from "tauri-plugin-sql-api";

export default class ProjectService {
    private dbStore = useDbStore();

    constructor() {
    }


    async getAllProjects(): Promise<Project[]> {
        await this.dbStore.connect()
        const val = await this.dbStore.db?.select<Project[]>(`SELECT p.*,count(biens.project_id) as nombreBien FROM projects as p LEFT JOIN biens ON p.id = biens.project_id GROUP BY p.id`, [])
        await this.dbStore.disconnect()
        console.log(val)
        return Promise.resolve<Project[]>(val ?? [])
    }

    async addProject(p: Project) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `INSERT INTO projects(label,type,description) VAlUES ($1,$2,$3)`,
            [p.label, p.type, p.description]
        )
            .catch((e) => {
                console.log(e)
            })
        await this.dbStore.disconnect()
    }



}