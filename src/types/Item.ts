export interface Item {
    titre_voiture: string;
    marque: string;
    modele: string;
    categorie: string;
    transmission: string;
    kilometrage: any;
    carburant: string;
    places: any;
    portes: any;
    annee_fabrication: any;
    equipement: Array<string>;
    puissance_fiscale: any;
    puissance_reelle: any;
    description_supplementaire: string |null;
}