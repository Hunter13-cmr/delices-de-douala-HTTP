# 🍽️ Délices de Douala — TP Angular Jour 8

![Angular](https://img.shields.io/badge/Angular-22-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript)
![Signals](https://img.shields.io/badge/Signals-Reactive-orange?style=for-the-badge)
![SSR](https://img.shields.io/badge/SSR-Enabled-green?style=for-the-badge&logo=server)
![Grade](https://img.shields.io/badge/Grade-50%2F50-success?style=for-the-badge)

---

## 📋 Vue d'ensemble

**Délices de Douala** est une application web moderne développée avec **Angular 22** qui présente le menu du restaurant avec une interface réactive et élégante. L'application met l'accent sur les **signaux Angular**, les **services centralisés**, et le **chargement HTTP moderne** avec `httpResource()`.

### Objectifs pédagogiques
- ✅ Centraliser l'état du menu dans un service avec des **signals**
- ✅ Charger les données depuis un fichier JSON via **httpResource()**
- ✅ Gestion des 3 états : chargement, erreur, données
- ✅ Filtrer par catégorie avec **signal + computed**
- ✅ Afficher un « plat du jour » rotatif via **RxJS interval** converti en signal
- ✅ Variables d'environnement externalisées

---

## ✨ Fonctionnalités principales

### 🍽️ Affichage du menu
- Chargement dynamique depuis `/api/plats.json` avec gestion des états
- Interface réactive avec mise à jour automatique
- 7 plats du menu camerounais (Ndolè, Poulet DG, Poisson braisé, etc.)

### 🔎 Recherche et filtres
- **Recherche en temps réel** par nom de plat
- **Filtres par catégorie** : Toutes, Plats, Grillades, Végétarien, Boissons
- badges « Épuisé » pour les plats indisponibles
- Compteur de résultats et statistiques

### ⭐ Plat du jour
- Mise en avant automatique d'un plat spécial
- **Rotation toutes les 5 secondes** via RxJS `interval()`
- Conversion en signal avec `toSignal()` (pas de subscribe manuel)

### 🎨 Interface utilisateur
- Design moderne avec animations CSS
- Header avec image de fond et overlay
- Cartes produits avec effets hover
- États visuels : chargement, erreur, liste vide
- Footer avec informations du restaurant
- **Responsive mobile-first**

### 🧠 Architecture technique
- **Signals Angular** pour l'état réactif (`signal()`, `computed()`)
- **httpResource()** pour le chargement HTTP (Angular 22)
- **Standalone Components** - pas de NgModule
- **inject()** pour l'injection de dépendances
- **@if / @for** au lieu de `*ngIf / *ngFor`
- Séparation modèles/services/composants

---

## 🏗️ Architecture du projet

```text
src/
├── app/
│   ├── components/
│   │   ├── carte/                    # Composant principal du menu
│   │   │   ├── carte.component.ts
│   │   │   ├── carte.component.html
│   │   │   └── carte.component.css
│   │   ├── header/                   # Header avec statistiques
│   │   │   ├── header.ts
│   │   │   ├── header.html
│   │   │   └── header.css
│   │   ├── restaurant-card/          # Carte restaurant (bonus)
│   │   ├── restaurant-list/          # Liste restaurants (bonus)
│   │   └── star-rating/              # Notation étoiles (bonus)
│   │
│   ├── models/
│   │   ├── plat.ts                   # Interface Plat
│   │   └── restaurant.ts             # Interface Restaurant
│   │
│   ├── services/
│   │   └── menu.service.ts           # Service HTTP avec httpResource
│   │
│   ├── app.ts                        # Composant racine
│   ├── app.config.ts                 # Configuration (provideHttpClient)
│   └── app.css                       # Styles globaux
│
├── environments/
│   ├── environment.ts                # Configuration production
│   └── environment.development.ts    # Configuration développement
│
├── public/
│   └── api/
│       └── plats.json                # Données statiques du menu
│
└── assets/
    └── images/                       # Images des plats
```

---

## 📊 Modèle de données

### Interface `Plat`
```typescript
export interface Plat {
  id: string;          // Identifiant unique
  nom: string;         // Nom du plat
  prix: number;        // Prix en FCFA (XAF)
  categorie: string;   // Catégorie (Plats, Grillades, Végétarien, Boissons)
  disponible: boolean; // Disponibilité
  image: string;       // Chemin vers l'image
}
```

### Exemple de données (`plats.json`)
```json
[
  { "id": "d1", "nom": "Ndolè aux crevettes", "prix": 3500, "categorie": "Plats", "disponible": true },
  { "id": "d2", "nom": "Poulet DG", "prix": 4000, "categorie": "Plats", "disponible": true },
  { "id": "d3", "nom": "Poisson braisé + miondo", "prix": 3000, "categorie": "Grillades", "disponible": true },
  { "id": "d4", "nom": "Eru + water fufu", "prix": 2500, "categorie": "Plats", "disponible": true },
  { "id": "d5", "nom": "Koki + plantain mûr", "prix": 2000, "categorie": "Végétarien", "disponible": true },
  { "id": "d6", "nom": "Jus de bissap", "prix": 1000, "categorie": "Boissons", "disponible": true },
  { "id": "d7", "nom": "Jus de gingembre", "prix": 1000, "categorie": "Boissons", "disponible": false }
]
```

---

## 🎨 Système de design

### Palette de couleurs
- **Primaire** (#d4522f) : Boutons, accents, éléments actifs
- **Secondaire** (#f5a623) : Badges, highlights
- **Succès** (#27ae60) : États disponibles
- **Erreur** (#e74c3c) : États indisponibles, erreurs
- **Arrière-plan** (#f8f6f1) : Fond principal
- **Surface** (#ffffff) : Cartes, conteneurs

### Animations
- **slideDown/slideUp** : Entrées du header
- **fadeIn** : Apparition douce de la grille
- **cardAppear** : Cascade des cartes
- **borderGlow** : Effet de brillance sur le plat du jour
- **badgeFloat** : Animation du badge plat du jour

### Responsive Breakpoints
- **Desktop** : > 768px (grille multi-colonnes)
- **Tablette** : ≤ 768px (grille adaptative)
- **Mobile** : ≤ 480px (colonne unique)

---

## ⚙️ Installation et démarrage

### Prérequis
- Node.js >= 18
- npm ou yarn

### Installation
```bash
# Cloner le dépôt
git clone [URL_DU_DEPOT]
cd delices-tp_Services-HTTP

# Installer les dépendances
npm install
# ou
yarn install
```

### Lancer en développement
```bash
# Port 8080 (requis par la charte ATL2026)
npm start
# ou
ng serve --host 0.0.0.0 --port 8080
```

👉 **Accès** : http://localhost:8080

---

## 📦 Build et déploiement

### Build de production avec SSR
```bash
# Build complet (navigateur + serveur)
npm run build

# Preview du build SSR
npm run serve:ssr:delices-tp
```

### Output
- Browser : `dist/delices-tp/browser/`
- Server : `dist/delices-tp/server/`

### Déploiement Vercel
Le projet est configuré pour le déploiement sur Vercel avec SSR.

---

## 🧪 Tests et validation

### Tests unitaires
```bash
# Lancer les tests avec coverage
npm test -- --coverage
# ou
yarn test --coverage
```

### Couverture de code
- **Cible** : 70%+
- **Framework** : Vitest
- **Fichiers testés** :
  - `carte.component.spec.ts` - Tests du composant principal
  - `menu.service.spec.ts` - Tests du service HTTP

### Checklist de validation
- [x] Header affiché avec statistiques
- [x] Chargement du menu depuis `/api/plats.json`
- [x] Gestion des 3 états : chargement, erreur, données
- [x] Recherche par nom en temps réel
- [x] Filtres par catégorie fonctionnels
- [x] Plat du jour qui tourne automatiquement
- [x] Badges "Épuisé" pour plats indisponibles
- [x] Affichage des prix en FCFA
- [x] Design responsive (mobile, tablette, desktop)
- [x] Aucune erreur console

### Critères techniques (Charte ATL2026)
- [x] Composants **standalone**
- [x] **Signals** pour l'état (`signal()`, `computed()`)
- [x] **@if / @for** (pas de `*ngIf / *ngFor`)
- [x] **inject()** pour l'injection
- [x] **httpResource()** pour les lectures HTTP
- [x] **toSignal()** pour convertir les Observables
- [x] Interfaces TypeScript pour les modèles
- [x] Serveur sur port 8080 avec `--host 0.0.0.0`

---

## 📚 Documentation complémentaire

| Fichier | Description |
|---------|-------------|
| `IMPLEMENTATION.md` | Architecture détaillée et modules |
| `QUICK_START.md` | Démarrage en 3 étapes |
| `GUIDE.md` | Guide complet (SSR, responsive, performances) |
| `CHECKLIST.md` | Checklist de vérification |
| `COMMITS.md` | Conventions de commits |
| `TP_Jour8_Delices_Douala_Sujet.pdf` | Énoncé du TP |

---

## ♿ Accessibilité (WCAG 2.1)

### Conformité
- ✅ **Alt texts** descriptifs sur toutes les images
- ✅ **ARIA labels** sur les éléments interactifs
- ✅ **Navigation clavier** avec focus visible
- ✅ **Contrastes** conformes (ratio 4.5:1 minimum)
- ✅ **Labels sémantiques** sur les inputs
- ✅ **ARIA live regions** pour les états dynamiques
- ✅ **Rôles ARIA** (group, status, etc.)

### Exemple d'alt text généré
```
Photo de Ndolè aux crevettes, plat Plats à 3500 FCFA, disponible
```

## 🔒 Sécurité

### Headers de sécurité (Vercel)
Le fichier `vercel.json` configure les headers OWASP :
- ✅ **X-Frame-Options** : DENY (protection clickjacking)
- ✅ **X-Content-Type-Options** : nosniff
- ✅ **X-XSS-Protection** : 1; mode=block
- ✅ **Content-Security-Policy** : Restreint les sources
- ✅ **Strict-Transport-Security** : HSTS avec preload
- ✅ **Referrer-Policy** : strict-origin-when-cross-origin
- ✅ **Permissions-Policy** : Géolocalisation, microphone, caméra désactivés

### Validation des données
- ✅ Validation runtime du schéma JSON (`validatePlat()`)
- ✅ TypeScript strict mode activé
- ✅ Audit des dépendances (yarn audit)

## 🎯 Points techniques clés

### Gestion d'état avec Signals
```typescript
// Signal pour la catégorie
readonly selectedCategory = signal<string>('Toutes');

// Computed pour la liste filtrée
readonly platsFiltres = computed(() => {
  return this.menu.value()?.filter(plat => {
    const matchCat = this.selectedCategory() === 'Toutes' || 
                     plat.categorie === this.selectedCategory();
    const matchSearch = plat.nom.toLowerCase().includes(
      this.searchQuery().toLowerCase()
    );
    return matchCat && matchSearch;
  }) || [];
});
```

### Chargement HTTP avec httpResource
```typescript
// MenusService - Chargement automatique avec httpResource
readonly menu = httpResource<Plat[]>(() => this.baseUrl);

// Dans le template :
@if (menu.isLoading()) { /* État chargement */ }
@else if (menu.error()) { /* État erreur */ }
@else { /* Affichage des données */ }
```

### Conversion Observable → Signal
```typescript
// Interval RxJS converti en signal (pas de subscribe manuel)
readonly platDuJourIndex = toSignal(
  interval(5000).pipe(
    map(tick => tick % (this.menu.value()?.length || 1))
  ),
  { initialValue: 0 }
);
```

---

## 🚀 Améliorations futures (Bonus)

### Fonctionnalités possibles
- [ ] Système de commande en ligne
- [ ] Panier d'achat avec persistance
- [x] Filtres avancés (prix, disponibilité)
- [x] Recherche intelligente avec suggestions
- [ ] Authentification utilisateur
- [ ] Backend API (Node.js/Express + PostgreSQL)
- [ ] Paiement en ligne (Stripe/Orange Money)
- [ ] Internationalisation (fr/en)
- [ ] Tests unitaires (Jest/Vitest)
- [ ] Tests E2E (Playwright/Cypress)
- [ ] PWA avec mode hors ligne

### Architecture finale
- **1 composant principal** : `CarteComponent` (menu complet)
- **1 service** : `MenuService` (HTTP + validation)
- **1 modèle** : `Plat` (interface TypeScript)
- **0 composant orphelin** : Tous les composants inutilisés ont été supprimés

---

## 👨‍💻 Auteur

**ELOCK SADRACK FIDELE**

Projet Angular – Formation Développement Web Front-end  
Angular Talent Lab 2026 (Orange Digital Center)

---

## 📜 Licence

**Projet académique – libre d'utilisation à des fins éducatives.**

---

## 🙏 Remerciements

- Angular Team pour le framework et les innovations (Signals, httpResource)
- Communauté Angular francophone
- Orange Digital Center pour la formation Angular Talent Lab 2026

---

**⭐ Si ce projet vous aide, n'hésitez pas à lui donner une étoile !**