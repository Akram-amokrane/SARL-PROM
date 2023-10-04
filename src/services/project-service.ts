import type Project from "@/models/Project";
import { useDbStore } from "@/stores/db-store";
import { useNotificationStore } from "@/stores/notification-store";
import type Database from "tauri-plugin-sql-api";

export default class ProjectService {
    private dbStore = useDbStore();
    private notification = useNotificationStore()

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
            .then(() => {
                this.notification.show(`Projet ${p.label} ajouter avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }

    async editProject(p: Project) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `UPDATE projects SET label=$1,type=$2,description=$3 WHERE id=$4`,
            [p.label, p.type, p.description, p.id]
        )
            .then(() => {
                this.notification.show(`Projet modifier avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }

    async deleteProjects(id: number) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `DELETE FROM projects WHERE id=$1`,
            [id]
        )
            .then(() => {
                this.notification.show(`Projet supprimer avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }



}