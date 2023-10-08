import { useDbStore } from "@/stores/db-store";

export default class DBCreator {
    dbStore = useDbStore();

    constructor() {
        this.dbStore.connect();
    }

    // Create Clients Table
    async createClientsTable() {
        const query = `CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            dateNaissance DATE,
            lieuNaissance TEXT,
            adresse TEXT,
            telephone TEXT,
            email TEXT,
            Note TEXT
        );`;
        await this.dbStore.db?.execute(query).catch((e) => {
            console.error(e);
        })
    }

    // Create Projects Table
    async createProjectsTable() {
        const query = `CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY,
            label TEXT NOT NULL UNIQUE,
            description TEXT,
            type TEXT
        );`;
        await this.dbStore.db?.execute(query).catch((e) => {
            console.error(e);
        });
    }

    // Create Projects Table
    async createProjectsTypeTable() {
        const query = `CREATE TABLE IF NOT EXISTS project_types (
            id INTEGER  PRIMARY KEY,
            label TEXT NOT NULL UNIQUE
        );`;
        await this.dbStore.db?.execute(query).catch((e) => {
            console.error(e);
        });
    }

    // Create Biens Table
    async createBiensTable() {
        const query = `CREATE TABLE IF NOT EXISTS biens (
            id INTEGER PRIMARY KEY,
            projectId INTEGER NOT NULL,
            ilot INTEGER NOT NULL,
            lot INTEGER,
            bloc TEXT,
            port INTEGER,
            etage INTEGER,
            type TEXT,
            supHab REAL,
            supUtil REAL,
            coutM2 REAL,
            montant REAL,
            etat TEXT,
            FOREIGN KEY (project_id) REFERENCES project(id)
        );`;
        await this.dbStore.db?.execute(query).catch((e) => {
            console.error(e);
        })
    }



    async createAllTables() {
        await this.createClientsTable();
        await this.createProjectsTable();
        await this.createProjectsTypeTable()
        await this.createBiensTable();
    }


}