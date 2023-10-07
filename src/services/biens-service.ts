import Bien from "@/models/Bien";
import type { BienFilter } from "@/models/Filters";
import { useDbStore } from "@/stores/db-store";
import { useNotificationStore } from "@/stores/notification-store";

export default class BiensService {
    private dbStore = useDbStore();
    private notification = useNotificationStore()

    constructor() {
    }


    async getAllBiens(): Promise<Bien[]> {
        await this.dbStore.connect()
        const val = await this.dbStore.db?.select<Bien[]>(`SELECT biens.*,projects.label as projectLabel FROM biens LEFT JOIN projects ON biens.projectId = projects.id`, [])
        await this.dbStore.disconnect()
        return Promise.resolve<Bien[]>(val ?? [])
    }

    async filterBiens(f: BienFilter): Promise<Bien[]> {
        await this.dbStore.connect()
        const val = await this.dbStore.db?.select<Bien[]>(
            `SELECT biens.*, projects.label AS projectLabel
            FROM biens
            LEFT JOIN projects ON biens.projectId = projects.id
            WHERE
                ${f.projet ? `projectId = ${f.projet}` : 1}
                AND  ${f.ilot ? `ilot=${f.ilot}` : 1}
                AND  ${f.lot ? `lot=${f.lot}` : 1}
                AND  ${f.bloc ? `bloc='%${f.bloc}%'` : 1}
                AND  ${f.port ? `port=${f.port}` : 1}
                AND  ${f.etage ? `etage=${f.etage}` : 1}
                AND  ${f.type ? `type LIKE '%${f.type}%'` : 1}
                AND  ${f.SupHab.min ? `supHab>=${f.SupHab.min}` : 1} AND ${f.SupHab.max ? `supHab<=${f.SupHab.max}` : 1}
                AND  ${f.coutM2.min ? `coutM2>=${f.coutM2.min}` : 1} AND ${f.coutM2.max ? `coutM2<=${f.coutM2.max}` : 1}
                AND  ${f.montant.min ? `montant>=${f.montant.min}` : 1} AND ${f.montant.max ? `montant<=${f.montant.max}` : 1}`,
            []
        ).catch((e: Error) => {
            this.notification.show(e.message, "Error")
        })
        await this.dbStore.disconnect()
        return Promise.resolve<Bien[]>(val ?? [])
    }

    async addBien(b: Bien) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `INSERT INTO biens(projectId,ilot,lot,bloc,port,etage,type,supHab,supUtil,coutM2,montant,etat)
             VAlUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [b.projectId, b.ilot, b.lot, b.bloc, b.port, b.etage, b.type, b.supHab, b.supUtil, b.coutM2, b.montant, "Disponible"]
        )
            .then(() => {
                this.notification.show(`Bien ajouter avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }

    async editBien(b: Bien) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `UPDATE biens SET projectId=$1,ilot=$2,lot=$3,bloc=$4,port=$5,etage=$6,type=$7,supHab=$8,supUtil=$9,coutM2=$10,montant=$11,etat=$12 WHERE id=$13`,
            [b.projectId, b.ilot, b.lot, b.bloc, b.port, b.etage, b.type, b.supHab, b.supUtil, b.coutM2, b.montant, b.etat, b.id]
        )
            .then(() => {
                this.notification.show(`Bien modifier avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }

    async deleteBiens(id: number) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `DELETE FROM biens WHERE id=$1`,
            [id]
        )
            .then(() => {
                this.notification.show(`Bien supprimer avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }



}