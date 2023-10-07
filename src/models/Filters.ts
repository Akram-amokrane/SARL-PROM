export class BienFilter {
    projet?: number;
    ilot?: number;
    lot?: number;
    bloc?: string;
    port?: number;
    etage?: number;
    type?: number;
    SupHab: { min?: number, max?: number } = { min: undefined, max: undefined };
    coutM2: { min?: number, max?: number } = { min: undefined, max: undefined };
    montant: { min?: number, max?: number } = { min: undefined, max: undefined }
}

export class ProjectFilter {
    label?: string;
    type?: string;
    description?: string;
    nombreBien: { min?: number, max?: number } = { min: undefined, max: undefined }
}

export class ClientFilter {
    nom?: string;
    prenom?: string;
    lieuNaissance?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
}