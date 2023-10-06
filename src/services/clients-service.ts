import type Client from "@/models/Client";
import { useDbStore } from "@/stores/db-store";
import { useNotificationStore } from "@/stores/notification-store";

export default class ClientsService {
    private dbStore = useDbStore();
    private notification = useNotificationStore()

    constructor() {
    }


    async getAllClients(): Promise<Client[]> {
        await this.dbStore.connect()
        const val = await this.dbStore.db?.select<Client[]>(`SELECT *  FROM clients `, [])
        await this.dbStore.disconnect()
        return Promise.resolve<Client[]>(val ?? [])
    }

    async addClient(c: Client) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `INSERT INTO clients(nom,prenom,dateNaissance,lieuNaissance,adresse,telephone,email,note)
             VAlUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [c.nom, c.prenom, c.dateNaissance, c.lieuNaissance, c.adresse, c.telephone, c.email, c.note]
        )
            .then(() => {
                this.notification.show(`Client ajouter avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show("Error dans la base de données", "Error")
            })
        await this.dbStore.disconnect()
    }

    async editClient(c: Client) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `UPDATE clients SET nom=$1,prenom=$2,dateNaissance=$3,lieuNaissance=$4,adresse=$5,telephone=$6,email=$7,note=$8 WHERE id=$9`,
            [c.nom, c.prenom, c.dateNaissance, c.lieuNaissance, c.adresse, c.telephone, c.email, c.note, c.id]
        )
            .then(() => {
                this.notification.show(`Client modifier avec succés.`, "Succes")
            })
            .catch((e) => {
                this.notification.show(e, "Error")
                console.log(e)
            })
        await this.dbStore.disconnect()
    }

    async deleteClients(id: number) {
        await this.dbStore.connect()
        await this.dbStore.db?.execute(
            `DELETE FROM clients WHERE id=$1`,
            [id]
        )
            .then(() => {
                this.notification.show(`Client supprimer avec succés.`, "Succes")
            })
            .catch((e: Error) => {
                this.notification.show(e.message, "Error")
            })
        await this.dbStore.disconnect()
    }




}