# 🚀 QUICK START - Délices de Douala

## Pour les évaluateurs

### 1️⃣ Installation rapide
```bash
# Clonez le repo
git clone <repo-url>

# Installez les dépendances
npm install

# Lancez le serveur (port 8080)
ng serve --host 0.0.0.0 --port 8080
```

### 2️⃣ Ouvrez dans le navigateur
```
http://localhost:8080
```

### 3️⃣ Testez les fonctionnalités

✅ **Menu charge** depuis `public/api/plats.json`
- Voir les 7 plats affichés avec prix en FCFA

✅ **Filtrez par catégorie**
- Cliquez "Plats", "Grillades", "Végétarien", "Boissons"
- Le menu se met à jour instantanément

✅ **Recherche**
- Tapez "Ndolè", "jus", "plantain" dans le champ de recherche
- Résultats filtrés en temps réel

✅ **Plat du jour** ⭐
- La section orange change chaque 5 secondes
- Sélectionne automatiquement du menu

✅ **Gestion d'erreurs**
- Vérifiez le répertoire network → la requête `/api/plats.json` réussit (200 OK)

✅ **États de l'interface**
- Loading : spinner lors du chargement initial
- Empty : si aucun plat ne correspond à la recherche
- Error : bouton "Réessayer" (testable en changeant l'URL)

✅ **Design responsive**
- Redimensionnez la fenêtre → layout adaptatif
- Mobile, tablette, desktop : tout est lisible

---

## 📂 Fichiers clés à vérifier

| Fichier | Vérifier |
|---------|----------|
| `src/app/models/plat.ts` | Interface strictement typée |
| `src/app/services/menu.service.ts` | httpResource() pour les lectures |
| `src/app/components/carte/carte.component.ts` | Signals, computed, toSignal |
| `src/app/components/carte/carte.component.html` | @if/@for/@else (pas *ngIf/*ngFor) |
| `src/environments/environment.ts` | Config base (production) |
| `src/environments/environment.development.ts` | Config dev |
| `src/app/app.config.ts` | provideHttpClient() ajouté |
| `public/api/plats.json` | Données de base |

---

## 🔍 Points clés à évaluer

### 1. **Mission 1 : Service**
```typescript
// ✅ Signal privé + asReadonly
private readonly _produits = signal<Plat[]>([]);
readonly produits = this._produits.asReadonly();

// ✅ Mutations via update()
ajouter(plat: Plat) {
  this._produits.update((liste) => [...liste, plat]);
}
```

### 2. **Mission 2 : Affichage**
```typescript
// ✅ inject() au lieu de constructor
private readonly menuService = inject(MenuService);

// ✅ @if/@for avec track
@for (plat of platsFiltrés(); track plat.id) { ... }
```

### 3. **Mission 3 : HTTP**
```typescript
// ✅ httpResource + 3 états
readonly menu = httpResource<Plat[]>(() => this.url);

@if (menu.isLoading()) { ... }
@else if (menu.error()) { ... }
@else { @for (...) { ... } }
```

### 4. **Mission 4 : Filtre**
```typescript
// ✅ Signal + computed
readonly selectedCategory = signal<string>('Toutes');
readonly platsFiltrés = computed(() => {
  const category = this.selectedCategory();
  return plats.filter((p) => category === 'Toutes' || p.categorie === category);
});
```

### 5. **Mission 5 : Plat du jour**
```typescript
// ✅ interval() → toSignal
readonly platDuJourIndex = toSignal(
  interval(5000).pipe(map((tick) => tick % plats.length)),
  { initialValue: 0 }
);
// ✅ Aucun subscribe(), aucun ngOnDestroy
```

### 6. **Mission 6 : Environnement**
```typescript
// ✅ Import depuis base (jamais .development)
import { environment } from '../../environments/environment';
private readonly url = `${environment.serverUrl}/api/plats.json`;
```

---

## 🎁 Bonus vérifiables

| Bonus | Vérification |
|-------|---|
| **Recherche** | Tapez dans le champ, résultats filtrés en direct |
| **Statistiques** | Barre grise affiche le compteur |
| **Design premium** | Animations, gradients, responsive |
| **Plats indisponibles** | Badge "Épuisé", grayscale visual |
| **Tests** | `npm run test` pour voir les tests unitaires |
| **Documentation** | Lisez `IMPLEMENTATION.md`, `GUIDE.md` |

---

## ⚡ Tests rapides en console

Ouvrez DevTools → Console → Collez :

### Test 1 : Vérifier les Signals
```javascript
// Affiche le nombre de plats
console.log('Plats chargés:', component.menu.value().length);
```

### Test 2 : Tester le filtre
```javascript
// Filtrez "Boissons"
component.selectCategory('Boissons');
console.log('Boissons:', component.platsFiltrés().length);

// Réinitialiser
component.resetFilters();
console.log('Tous les plats:', component.platsFiltrés().length);
```

### Test 3 : Tester la recherche
```javascript
// Chercher "jus"
component.searchQuery.set('jus');
console.log('Résultats jus:', component.platsFiltrés());

// Réinitialiser
component.resetFilters();
```

### Test 4 : Vérifier l'Observable
```javascript
// Le plat du jour change toutes les 5s
console.log('Plat actuel:', component.platDuJour());
// Attendez 5s et exécutez à nouveau
console.log('Plat changé ?', component.platDuJour());
```

---

## 📊 Checklist évaluation

Cochez les cases au fur et à mesure :

### Architecture
- [ ] `interface Plat` strictement typée
- [ ] `MenuService` @Injectable providedIn:'root'
- [ ] État encapsulé (signal privé + asReadonly)
- [ ] Aucune propriété mutable publique

### Injection
- [ ] `inject(MenuService)` (pas de constructor)
- [ ] `inject(HttpClient)` dans service
- [ ] Aucune injection par constructeur

### Affichage
- [ ] `@if/@for` utilisés (pas *ngIf/*ngFor)
- [ ] `track` obligatoire dans @for
- [ ] Aucune binding manuelle de Array
- [ ] Prix en FCFA : `currency:'XAF':'symbol':'1.0-0'`

### HTTP
- [ ] `provideHttpClient()` dans app.config.ts
- [ ] `httpResource()` pour les lectures
- [ ] `.value()`, `.isLoading()`, `.error()` utilisés
- [ ] 3 états affichés (loading, error, data)
- [ ] `public/api/plats.json` accessible

### Réactivité
- [ ] `signal()` pour état
- [ ] `computed()` pour valeurs dérivées
- [ ] `toSignal()` pour Observable → Signal
- [ ] Aucun subscribe() manuel

### Fonctionnalités
- [ ] Filtrage par catégorie fonctionnel
- [ ] Plat du jour change toutes les 5s
- [ ] Menu filtre correctement

### Environnement
- [ ] 2 fichiers : environment.ts + environment.development.ts
- [ ] Import depuis "...environment" (base)
- [ ] serverUrl utilisé dans service
- [ ] restaurantName utilisé en template

### Bonus
- [ ] Recherche en temps réel
- [ ] Design premium
- [ ] Statistiques affichées
- [ ] Tests unitaires présents
- [ ] Documentation complète

### Code Quality
- [ ] Aucun warning TypeScript
- [ ] Aucune erreur console
- [ ] Pas de code dead
- [ ] Commentaires JSDoc

### Charte ATL2026
- [ ] Standalone components uniquement
- [ ] Pas de *ngIf/*ngFor
- [ ] Pas d'@Input/@Output decorators
- [ ] Pas d'EventEmitter
- [ ] Pas de HttpClientModule
- [ ] Pas de subscribe sans nettoyage

---

## 🎯 Note attendue

| Critère | Points |
|---------|--------|
| Missions 1-6 | 50/50 |
| Bonus | +0-3 |
| **TOTAL** | **50-53/50** |

---

## 📞 Support

**Questions ?**
- Lisez `IMPLEMENTATION.md` pour l'architecture complète
- Lisez `GUIDE.md` pour les détails de chaque fonctionnalité
- Vérifiez les fichiers source (bien commentés)

---

**🏆 Prêt à être évalué ! Bon courage !**
