# Plan d'implémentation — Délices de Douala 10/10

**Objectif:** Atteindre 10/10 dans tous les axes d'audit (UI/UX, Sécurité, Performance, Code Quality).

**Stack:** Angular 22 + TypeScript + SSR + Signals

**Date:** 28 juillet 2026

---

## [Overview]

Atteindre la note maximale de 10/10 dans chacun des 4 axes d'audit (UI/UX & Contenu, Sécurité, Performance, Code Quality) pour le projet "Délices de Douala". 

Ce plan corrige l'intégralité des points détectés lors de l'audit initial : accessibilité WCAG, headers de sécurité OWASP, optimisation images WebP, uniformisation des templates Angular 22, suppression du code mort, et ajout de tests unitaires. L'objectif est d'obtenir un projet "exemplaire" respectant 100% des critères de la charte ATL2026 et des standards industriels.

---

## [Types]

Aucune modification du système de types nécessaire.

**Types existants conservés:**
```typescript
// src/app/models/plat.ts
export interface Plat {
  id: string;
  nom: string;
  prix: number;        // FCFA
  categorie: string;
  disponible: boolean;
  image: string;
}

// src/app/models/restaurant.ts
export interface Restaurant {
  id: number;
  name: string;
  district: string;
  specialty: string;
  currentRating: number;
  image: string;
}
```

---

## [Files]

Modifications et créations de fichiers pour atteindre 10/10.

**Fichiers à créer:**
- `vercel.json` — Configuration sécurité headers (CSP, HSTS, etc.)
- `src/assets/images/*.webp` — Versions optimisées des images (à générer)
- `src/app/components/carte/carte.component.spec.ts` — Tests unitaires CarteComponent
- `src/app/services/menu.service.spec.ts` — Tests unitaires MenuService
- `src/app/components/star-rating/star-rating.spec.ts` — Tests unitaires StarRatingComponent
- `vercelfix.json` — Backup temporaire (si besoin)

**Fichiers à modifier:**
- `README.md` — Ajouter section accessibilité et tests
- `src/index.html` — Ajouter meta tags accessibilité et CSP inline
- `src/app/components/carte/carte.component.html` — Uniformiser vers @if/@for, ajouter alt text
- `src/app/components/carte/carte.component.css` — Vérifier contrastes WCAG
- `src/app/components/header/header.html` — Ajouter alt text si image présente
- `src/app/components/restaurant-card/restaurant-card.html` — Ajouter alt dynamique
- `src/app/components/star-rating/star-rating.html` — Ajouter aria-labels
- `public/api/plats.json` — Ajouter champ description pour alt texts
- `package.json` — Vérifier budgets, ajouter scripts de test si nécessaire
- `angular.json` — Configurer budgets et strict类型检查
- `tsconfig.json` — Activer strict mode complet

**Fichiers à supprimer:**
- `src/app/components/header/` (si non intégré au flux principal)
- `src/app/components/restaurant-card/` (si non intégré)
- `src/app/components/restaurant-list/` (si non intégré)
- `src/assets/images/restaurant.jpg` (si remplacé par header image dans header component)

**Configuration:**
- `vercel.json` — Headers de sécurité
- `.prettierrc` — Renforcer règles
- `tslint.json` ou `eslint.json` — Règles strictes

---

## [Functions]

**Nouvelles fonctions:**

1. `getAltText(plat: Plat): string` dans `carte.component.ts`
   - Purpose: Générer alt text descriptif pour accessibilité
   - Signatures: `getAltText(plat: Plat): string`

2. `validatePlat(plat: any): boolean` dans `menu.service.ts`
   - Purpose: Valider structure d'un plat (runtime safety)
   - Signature: `validatePlat(plat: any): boolean`

**Fonctions modifiées:**

1. `platsFiltres()` computed dans `carte.component.ts`
   - Changement: Utiliser uniquement @if/@for (supprimer *ngIf résiduels)
   - Fichier: `src/app/components/carte/carte.component.ts`

2. `getPlatClasses()` dans `carte.component.ts`
   - Changement: Ajouter aria-label dynamique
   - Fichier: `src/app/components/carte/carte.component.ts`

**Fonctions supprimées:**
- Aucune suppression nécessaire (seulement des composants orphelins)

---

## [Classes]

**Nouvelles classes:**

Aucune nouvelle classe nécessaire.

**Classes modifiées:**

1. `CarteComponent` (`src/app/components/carte/carte.component.ts`)
   - Ajouter méthode `getAltText()`
   - Uniformiser template vers @if/@for uniquement
   - Ajouter aria-labels sur éléments interactifs
   - Améliorer gestion focus states

2. `MenuService` (`src/app/services/menu.service.ts`)
   - Ajouter validation runtime des données plats.json
   - Exposer signal readonly avec asReadonly()
   - Ajouter méthode de logging sécurisé (sans données sensibles)

3. `StarRatingComponent` (`src/app/components/star-rating/star-rating.component.ts`)
   - Ajouter aria-label sur étoiles
   - Ajouter role="slider" pour accessibilité clavier

**Classes supprimées:**

1. `HeaderComponent` (si non utilisé dans app.ts)
   - Raison: Composant orphelin, non intégré au flux principal
   - Migration: Supprimer dossier complet `src/app/components/header/`

2. `RestaurantCardComponent`
   - Raison: Composant orphelin
   - Migration: Supprimer ou documenter usage futur

3. `RestaurantListComponent`
   - Raison: Composant orphelin
   - Migration: Supprimer

---

## [Dependencies]

**Ajouts:**
- Aucune nouvelle dépendance nécessaire

**Mises à jour:**
- Vérifier que toutes les dépendances sont à jour (npm audit)
- Angular 22.0.0 → 22.0.1 (dernière version stable)

**Suppressions:**
- Aucune suppression nécessaire

**Intégration:**
- Toutes les dépendances actuelles sont appropriées
- `@angular/ssr` déjà configuré ✓
- `prettier` déjà configuré ✓

---

## [Testing]

**Tests à ajouter:**

1. **carte.component.spec.ts**
   - Test chargement httpResource (loading/error/success)
   - Test filtres catégories
   - Test recherche temps réel
   - Test plat du jour rotation
   - Test affichage 3 états

2. **menu.service.spec.ts**
   - Test injection dépendances
   - Test httpResource endpoint
   - Test validation plat (si ajoutée)
   - Test asReadonly()

3. **star-rating.component.spec.ts**
   - Test affichage étoiles
   - Test hover et sélection
   - Test aria-labels

**Stratégie:**
- Framework: Jest (déjà configuré dans package.json)
- Coverage cible: 70%+
- Mock httpResource avec HttpResourceTestingController
- Tests isolés avec TestBed

---

## [Implementation Order]

Séquence logique pour atteindre 10/10 sans régression:

### Phase 1 — Accessibilité & UI/UX (objectif: 10/10)
1. **Auditer contrastes WCAG** sur tous les composants avec browser DevTools
2. **Corriger CSS** pour atteindre ratio 4.5:1 minimum sur textes
3. **Ajouter alt texts** sur toutes les images (template + JSON)
4. **Implémenter navigation clavier** (tabindex, aria-labels, focus visible)
5. **Uniformiser templates** — Remplacer *ngIf/*ngFor restants par @if/@for

### Phase 2 — Sécurité (objectif: 10/10)
6. **Créer vercel.json** avec headers: CSP, HSTS, X-Frame-Options, etc.
7. **Mettre à jour index.html** avec meta tags sécurité
8. **Valider plats.json** au runtime (schéma Zod ou validation manuelle)
9. **Vérifier npm audit** et corriger vulnérabilités

### Phase 3 — Performance (objectif: 10/10)
10. **Convertir images en WebP** avec outils (Squoosh, ImageMagick)
11. **Ajouter lazy loading** (`loading="lazy"`) sur images sous fold
12. **Configurer budgets Angular** dans angular.json (max 500KB)
13. **Auditer bundle** avec `ng build --stats-json` et analyser avec webpack-bundle-analyzer

### Phase 4 — Code Quality (objectif: 10/10)
14. **Supprimer composants orphelins** (header/, restaurant-card/, restaurant-list/)
15. **Ajouter tests unitaires** (carte, service, star-rating)
16. **Configurer ESLint strict** (+ angular-eslint)
17. **Activer strict TypeScript** dans tsconfig.json
18. **Nettoyer code mort** (imports inutilisés, commentaires obsolètes)
19. **Finaliser README** avec section accessibilité et sécurité

### Phase 5 — Validation finale
20. **Linter:** `npm run lint` — 0 erreur
21. **Tests:** `npm test -- --coverage` — 70%+
22. **Build:** `npm run build` — 0 warning
23. **Audit sécurité:** `npm audit` — 0 vulnérabilité
24. **Lighthouse:** Score > 90 sur toutes les métriques
25. **Commit et push** avec message conventionnel