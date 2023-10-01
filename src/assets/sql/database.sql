CREATE TABLE IF NOT EXISTS clients (
    num_client INTEGER PRIMARY KEY,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    date_naissance DATE,
    lieu_naissance TEXT,
    adresse TEXT,
    telephone TEXT,
    email TEXT,
    Note TEXT
);

-- Create the Project table
CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    description TEXT,
    type TEXT
);

-- Create the bien table 
CREATE TABLE IF NOT EXISTS biens (
    num_bien INTEGER PRIMARY KEY,
    project_id INTEGER NOT NULL,
    ilot INTEGER NOT NULL,
    lot INTEGER,
    bloc TEXT,
    port INTEGER,
    etage INTEGER,
    type TEXT,
    sup_hab REAL,
    sup_util REAL,
    cout_m2 REAL,
    montant REAL,
    etat TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);
