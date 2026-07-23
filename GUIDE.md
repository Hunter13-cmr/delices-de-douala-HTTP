# 🍽️ Guide d'utilisation - Délices de Douala

## 🎯 Pour les utilisateurs

### Fonctionnalités principales

#### 1. **Affichage du menu**
- Le menu charge automatiquement au démarrage de l'application
- Vous voyez tous les plats disponibles et indisponibles
- Les plats indisponibles sont affichés en grisé avec un badge "Épuisé"

#### 2. **Filtre par catégorie**
- Cliquez sur les boutons en haut : "Toutes", "Plats", "Grillades", "Végétarien", "Boissons"
- La catégorie active est mise en évidence en rouge
- Le menu se met à jour instantanément

#### 3. **Recherche par nom**
- Tapez dans le champ "🔍 Chercher un plat..."
- Les plats sont filtrés en temps réel par nom
- La recherche est insensible à la casse (majuscules/minuscules)

#### 4. **Combinaison filtres + recherche**
- Vous pouvez combiner le filtre catégorie ET la recherche par nom
- Exemple : Filtrez "Boissons" + Cherchez "jus" = affiche tous les jus

#### 5. **Plat du jour** ⭐
- Une section spéciale affiche le plat du jour
- Le plat change automatiquement chaque 5 secondes
- Mise en évidence avec fond orange et étoile

#### 6. **Affichage des prix**
- Tous les prix sont affichés en **FCFA (XAF)**
- Format : XXXX₣ (ex: 3500₣)
- Aucun décimal (format 1.0-0)

#### 7. **Statistiques**
- La barre grise affiche le nombre de plats affichés
- Les plats indisponibles sont comptabilisés séparément

#### 8. **États de l'application**

**Chargement ⏳**
- Spinner en rotation indique que le menu charge
- Message : "Chargement du menu..."

**Erreur ⚠️**
- Si le serveur est indisponible, vous voyez le message d'erreur
- Bouton "🔄 Réessayer" pour recharger

**Aucun résultat 🔍**
- Si vos filtres ne correspondent à aucun plat
- Bouton "🔄 Réinitialiser les filtres" pour revenir au menu complet

#### 9. **Réinitialiser**
- Bouton "🔄 Réinitialiser" aparaît si vous avez des filtres ou une recherche active
- Clique pour revenir au menu complet

#### 10. **Responsivité mobile**
- L'interface s'adapte aux petits écrans (téléphones)
- Les boutons sont plus petits, la grille à 1 colonne
- Tout reste accessible et lisible

---

## 🔧 Pour les développeurs

### Structure des fichiers

```
src/app/
├── components/carte/
│   ├── carte.component.ts       # Logique avec Signals, httpResource
│   ├── carte.component.html     # Template @if/@for/@else
│   ├── carte.component.css      # Styling premium
│   └── carte.component.spec.ts  # Tests
├── services/
│   ├── menu.service.ts          # État centralisé
│   └── menu.service.spec.ts     # Tests
├── models/
│   └── plat.ts                  # Interface TypeScript
└── environments/
    ├── environment.ts           # Config prod
    └── environment.development.ts  # Config dev
```

### Concepts Angular modernes utilisés

#### 1. **Signals** (État réactif)
```typescript
readonly selectedCategory = signal<string>('Toutes');
readonly searchQuery = signal<string>('');

// Modifier un signal
this.selectedCategory.set('Plats');
this.searchQuery.set('ndolè');
```

#### 2. **Computed** (Valeurs dérivées)
```typescript
readonly platsFiltrés = computed(() => {
  const plats = this.menu.value() || [];
  const category = this.selectedCategory();
  const search = this.searchQuery().toLowerCase();
  
  return plats.filter((plat) => {
    const matchCategory = category === 'Toutes' || plat.categorie === category;
    const matchSearch = search === '' || plat.nom.toLowerCase().includes(search);
    return matchCategory && matchSearch;
  });
});
```

#### 3. **httpResource** (Lectures HTTP)
```typescript
readonly menu = httpResource<Plat[]>(() => `${environment.serverUrl}/api/plats.json`);

// Dans le template :
@if (menu.isLoading()) { ... }
@else if (menu.error()) { ... }
@else { @for (p of menu.value(); track p.id) { ... } }
```

#### 4. **toSignal** (Observables RxJS → Signal)
```typescript
readonly platDuJourIndex = toSignal(
  interval(5000).pipe(
    map((tick) => {
      const plats = this.menu.value();
      return plats ? tick % plats.length : 0;
    })
  ),
  { initialValue: 0 }
);
// Pas de subscribe() manuel, pas de ngOnDestroy ✨
```

#### 5. **inject()** (Injection dépendance moderne)
```typescript
private readonly menuService = inject(MenuService);
private readonly http = inject(HttpClient);
// Plus de constructor ! 🎉
```

#### 6. **@if/@for** (Contrôle de flux moderne)
```html
@if (menu.isLoading()) {
  <p>Chargement...</p>
} @else if (menu.error()) {
  <p>Erreur</p>
} @else {
  @for (plat of platsFiltrés(); track plat.id) {
    <article>{{ plat.nom }}</article>
  }
}
```

### Modifiers un plat

Pour ajouter un nouveau plat au fichier `public/api/plats.json` :

```json
{
  "id": "d8",
  "nom": "Nom du plat",
  "prix": 2500,
  "categorie": "Plats",
  "disponible": true
}
```

Puis relancez `ng serve` pour recharger.

### Ajouter une catégorie

1. Modifier `plats.json` : ajouter `"categorie": "NouveauCategorie"`
2. Modifier `carte.component.ts` :

```typescript
readonly categories = signal<string[]>([
  'Toutes',
  'Plats',
  'Grillades',
  'Végétarien',
  'Boissons',
  'NouveauCategorie',  // ← Ajouter ici
]);
```

### Tester l'erreur 404

Modifiez temporairement le `environment.ts` ou le MenuService :

```typescript
private readonly baseUrl = `${environment.serverUrl}/api/plats-error.json`; // Fichier inexistant
```

Lancez `ng serve` et vous verrez le message d'erreur avec le bouton "Réessayer".

### Performance

Le composant utilise `ChangeDetectionStrategy.OnPush` :
- L'UI ne se met à jour QUE si une propriété Input change ou un événement est émis
- Les Signals déclenchent des mises à jour automatiquement
- Pas de détection de changement complète sur chaque tick

### Debugging

Ouvrez la console du navigateur (F12) :

1. **Afficher les plats chargés**
   ```javascript
   // Écoutez httpResource dans le console
   console.log('Menu chargé avec succès');
   ```

2. **Voir la catégorie sélectionnée**
   ```javascript
   // Injectez le composant et testez
   component.selectedCategory(); // 'Toutes', 'Plats', etc.
   ```

3. **Tester la recherche**
   ```javascript
   component.searchQuery.set('ndolè');
   component.platsFiltrés(); // Affiche les plats contenant 'ndolè'
   ```

---

## 📱 Interface utilisateur

### Thème couleurs

| Couleur | Hex | Usage |
|---|---|---|
| Primary (Rouge) | #d4522f | Boutons actifs, headers |
| Secondary (Orange) | #f5a623 | Plat du jour |
| Success (Vert) | #27ae60 | Status disponible |
| Error (Rouge) | #e74c3c | Plats épuisés |
| Background | #f8f6f1 | Fond page |
| Surface | #ffffff | Cartes, modales |

### Animations

- **slideDown** : En-tête qui glisse vers le bas
- **slideUp** : Sections qui glissent vers le haut
- **fadeIn** : Grille de plats apparaît
- **spin** : Spinner de chargement
- **float** : Cercle du plat du jour flotte
- **Hover cards** : Cartes plat se soulèvent légèrement

---

## 🚀 Démarrage rapide

1. **Clonez le repo**
   ```bash
   git clone <repo-url>
   cd delices-tp
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Lancez le serveur de dev**
   ```bash
   ng serve --host 0.0.0.0 --port 8080
   ```

4. **Ouvrez dans le navigateur**
   ```
   http://localhost:8080
   ```

5. **Explorez le menu !**
   - Parcourez les plats
   - Filtrez par catégorie
   - Cherchez un plat
   - Regardez le plat du jour tourner

---

## 📚 Ressources

- [Angular Official Docs](https://angular.dev)
- [Signals Guide](https://angular.dev/guide/signals)
- [httpResource API](https://angular.dev/api/common/http/httpResource)
- [RxJS Docs](https://rxjs.dev)

Bon appétit ! 🍽️
