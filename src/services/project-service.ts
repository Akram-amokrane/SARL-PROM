import type Project from "@/models/Project";
import { useDbStore } from "@/stores/db-store";
import { useNotificationStore } from "@/stores/notification-store";
import ComboOption from '@/models/ComboOption'
import type { ProjectFilter } from "@/models/Filters";


export default class ProjectService {
    private dbStore = useDbStore();
    private notification = useNotificationStore()

    constructor() {
    }


    async getAllProjects(): Promise<Project[]> {
        await this.dbStore.connect()
        const val = await this.dbStore.db?.select<Project[]>(`SELECT p.*,count(biens.projectId) as nombreBien FROM projects as p LEFT JOIN biens ON p.id = biens.projectId GROUP BY p.id`, [])
        await this.dbStore.disconnect()
        return Promise.resolve<Project[]>(val ?? [])
    }

    async filterProjects(f: ProjectFilter): Promise<Project[]> {
        await this.dbStore.connect()
        const val = await this.dbStore.db?.select<Project[]>(
            `SELECT p.*,count(biens.projectId) as nombreBien 
            FROM projects as p 
            LEFT JOIN biens ON p.id = biens.projectId 
            WHERE ${f.label ? `p.label LIKE '%${f.label}%'` : 1}
            AND ${f.description ? `p.description LIKE '%${f.description}%'` : 1}
            AND ${f.type ? `p.type='${f.type}%'` : 1}
            AND ${f.nombreBien.min ? `nombreBien>=${f.nombreBien.min}` : 1}
            AND ${f.nombreBien.max ? `nombreBien<=${f.nombreBien.max}` : 1}
            GROUP BY p.id`,
            []
        )
        await this.dbStore.disconnect()
        return Promise.resolve<Project[]>(val ?? [])
    }

    async getProjectToCombo(): Promise<ComboOption[]> {
        await this.dbStore.connect()
        const val = await this.dbStore.db?.select<ComboOption[]>(`SELECT id as value,label  FROM projects`, [])
        await this.dbStore.disconnect()
        return Promise.resolve<ComboOption[]>(val ?? [])
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

    async getPorjectsTypes(): Promise<ProjectType[]> {
        await this.dbStore.connect()
        const val = await this.dbStore.db?.select<ProjectType[]>(`SELECT * FROM project_types`, [])
        await this.dbStore.disconnect()
        return Promise.resolve<ProjectType[]>(val ?? [])
    }

    async addProjectType(p: ProjectType) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `INSERT INTO project_types(label) VAlUES ($1)`,
            [p.label]
        )
            .then(() => {
                this.notification.show(`Type de projet < ${p.label} > ajouter avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }

    async deleteProjectType(id: number) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `DELETE FROM project_types WHERE id=$1`,
            [id]
        )
            .then(() => {
                this.notification.show(`Type de Projet supprimer avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }

    async editProjectType(p: ProjectType) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `UPDATE project_types SET label=$1 WHERE id=$2`,
            [p.label, p.id]
        )
            .then(() => {
                this.notification.show(`Type de projet modifier avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }

}