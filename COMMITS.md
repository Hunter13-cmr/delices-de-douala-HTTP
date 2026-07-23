# JOURNAL DES COMMITS CONVENTIONNELS

## Jour 8 - TP Délices de Douala

### Architecture & Configuration
- `feat: init project structure for menu service`
- `feat: add Plat interface and data model`
- `feat: setup environment files (dev/prod)`
- `feat: configure provideHttpClient in app.config.ts`

### Services
- `feat: create MenuService with httpResource`
- `feat: implement reactive state with signals`
- `test: add unit tests for MenuService`

### Components
- `feat: create CarteComponent with @if/@for`
- `feat: implement httpResource for menu loading`
- `feat: add category filter with signal + computed`
- `feat: implement "plat du jour" with RxJS interval`
- `feat: add search functionality (bonus)`
- `feat: add statistics bar (bonus)`
- `test: add CarteComponent unit tests`

### UI/UX Design
- `style: add premium CSS with animations`
- `style: implement responsive design for mobile/tablet`
- `style: add loading spinner and error states`
- `style: create badge system for unavailable dishes`

### Documentation
- `docs: add IMPLEMENTATION.md with architecture guide`
- `docs: add JSDoc comments to service and component`
- `docs: add inline comments for reactive logic`

### Quality Assurance
- `test: verify all missions fulfilled`
- `test: verify ATL2026 compliance`
- `test: performance optimization (OnPush strategy)`

---

## Standards de commit

Format : `<type>(<scope>): <message>`

Types acceptés :
- **feat** : Nouvelle fonctionnalité
- **fix** : Correction de bug
- **style** : Changements de style (CSS, formatting)
- **refactor** : Refactorisation sans nouvelle feature
- **test** : Ajout ou modification de tests
- **docs** : Modification de documentation
- **chore** : Maintenance

Exemples :
```
feat(menu-service): add httpResource for async loading
fix(carte-component): correct filter computed dependency
style(carte): add premium gradient and animations
test(menu-service): add unit test for searchQuery signal
```

Tous les commits respectent cette convention pour une meilleure traçabilité.
