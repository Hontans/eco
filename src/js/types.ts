export interface Product {
  id: number;
  name?: string | null;
  price?: number | null;
  category?: string | null;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

//#region test database
export interface Adresse {
    rue: string;
    ville: string;
    code_postal: string;
}

export interface Utilisateur {
    prenom: string;
    nom: string;
    age: number;
    email: string;
    adresse: Adresse;
}

// Pour représenter le tableau d'utilisateurs comme dans votre fichier JSON
export type ListeUtilisateurs = Utilisateur[];
//#endregion
