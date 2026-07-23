/**
 * Modèle Plat - Représente un plat du menu de "Délices de Douala"
 * Tous les prix sont en FCFA (XAF)
 */
export interface Plat {
  id: string;
  nom: string;
  prix: number; // en FCFA (XAF)
  categorie: string;
  disponible: boolean;
  image: string; // Chemin vers l'image du plat
}
