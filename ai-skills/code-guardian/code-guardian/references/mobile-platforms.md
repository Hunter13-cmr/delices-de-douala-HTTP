# Mobile Platforms — Design & Architecture Reference

## Native Android (Kotlin / Java)

### Recommended Architecture
- **MVVM + Clean Architecture** for most apps
- **MVI** (Model-View-Intent) for complex state flows
- Layer structure:
  ```
  ui/          → Composables / Fragments / ViewModels
  domain/      → UseCases, Repository interfaces, Models
  data/        → Repository implementations, Room DAOs, API services
  di/          → Hilt modules
  ```

### Jetpack Compose
- Prefer `remember` + `State` hoisting — lift state up to ViewModel
- Use `LaunchedEffect`, `DisposableEffect` for side effects — not directly in composables
- Avoid recomposition triggers: use `derivedStateOf`, stable data classes, `key()` in LazyColumn

### Navigation
- Use **Navigation Component** (Compose or Fragment)
- Pass only IDs in nav arguments, not full objects — serialize at boundaries

### State Management
- `StateFlow` / `SharedFlow` in ViewModel, collected with `collectAsStateWithLifecycle`
- Never use `LiveData` in new Compose code

### Performance
- Profile with **Android Profiler** (CPU, Memory, Network)
- Use `Paging 3` for large lists
- Optimize images with **Coil** or **Glide**; use WebP format

### UI Guidelines (Material Design 3)
- Use `MaterialTheme` tokens — avoid hardcoded colors/typography
- Follow navigation patterns: Bottom Navigation Bar for 3-5 top-level destinations
- Minimum touch target: 48×48dp
- Support dark theme via dynamic color (Material You) when possible

---

## Native iOS (Swift / SwiftUI)

### Recommended Architecture
- **MVVM** with SwiftUI is the standard
- **Clean Architecture** for larger apps: split into Feature modules
- Layer structure:
  ```
  Features/    → Views, ViewModels
  Domain/      → UseCases, Repository protocols, Entities
  Data/        → Repository implementations, API clients, CoreData
  Core/        → DI container, Extensions, Utilities
  ```

### SwiftUI
- Use `@StateObject` for ViewModels owned by a View, `@ObservedObject` for injected ones
- Use `@Observable` macro (iOS 17+) as modern replacement
- Prefer `task {}` modifier for async work over `onAppear` + `Task {}`
- Avoid state in parent views if only child needs it

### Navigation
- Use `NavigationStack` (iOS 16+) with path-based navigation
- Pass lightweight values (IDs, enums) via navigation path — not full models

### State Management
- `@Observable` + `@Environment` for shared state
- `Combine` or `async/await` + `AsyncStream` for reactive flows

### Performance
- Profile with **Instruments** (Time Profiler, Allocations, SwiftUI view body hits)
- Use `LazyVStack` / `LazyHStack` / `List` for large collections
- Optimize images with `AsyncImage` or **Kingfisher**; use HEIF/WebP

### UI Guidelines (Human Interface Guidelines)
- Use SF Symbols for iconography — scale with Dynamic Type automatically
- Support Dynamic Type: use `.font(.body)` semantic sizes, not fixed point sizes
- Follow iOS navigation patterns: tab bar for top-level, push navigation for depth
- Minimum touch target: 44×44pt

---

## Flutter (Dart)

### Recommended Architecture
- **Clean Architecture + BLoC** or **Riverpod** for most apps
- **MVVM with Riverpod** for simpler apps
- Layer structure:
  ```
  features/
    feature_name/
      presentation/  → Widgets, BLoCs/Notifiers
      domain/        → UseCases, Repository abstractions, Entities
      data/          → Repository implementations, data sources, DTOs
  core/              → DI, routing, theme, utils
  ```

### State Management
- **Riverpod** (recommended): `AsyncNotifier`, `StateNotifier`, `Provider`
- **BLoC/Cubit**: well-suited for event-driven flows; prefer `Cubit` for simple cases
- Avoid `setState` outside of truly local, ephemeral UI state

### Navigation
- **GoRouter** (official recommendation) for declarative, deep-link-friendly routing
- Avoid `Navigator.push` directly in widget trees

### Performance
- Use `const` constructors everywhere possible — prevents unnecessary rebuilds
- Profile with **Flutter DevTools** (Widget rebuild inspector, Timeline)
- Use `ListView.builder` / `GridView.builder` — never fixed-length for large lists
- Minimize `build()` scope; extract sub-widgets

### Adaptive UI
- Use `LayoutBuilder` and `MediaQuery` for responsive layouts
- `Platform.isAndroid` / `Platform.isIOS` only for platform-specific behavior, not UI branching
- Support both Material (Android) and Cupertino (iOS) widgets where appropriate

---

## React Native (TypeScript / JavaScript)

### Recommended Architecture
- **Feature-based folder structure** with custom hooks
- **Redux Toolkit** or **Zustand** for global state; React Query for server state
- Layer structure:
  ```
  src/
    features/        → screens, components, hooks per feature
    store/           → Redux slices or Zustand stores
    services/        → API clients
    navigation/      → React Navigation config
    shared/          → reusable components, utils, types
  ```

### State Management
- **React Query / TanStack Query**: server state, caching, background sync
- **Zustand**: lightweight global state
- **Redux Toolkit**: large apps with complex state interactions

### Navigation
- **React Navigation v6+** — Stack, Tab, Drawer navigators
- Use typed navigation params with TypeScript generics

### Performance
- Use **Hermes** engine (enabled by default in RN 0.70+)
- Profile with **Flipper** + React DevTools
- Use `FlatList` / `SectionList` — never `ScrollView` for large lists
- Use `memo`, `useCallback`, `useMemo` strategically — profile before optimizing

### Adaptive UI
- Use `StyleSheet.create` — avoid inline styles
- Use `Platform.select` for platform-specific styles
- Support safe areas with `react-native-safe-area-context`

---

## .NET MAUI (C#)

### Recommended Architecture
- **MVVM** with `CommunityToolkit.Mvvm` (source generators for commands and properties)
- Clean separation: `ViewModels`, `Services`, `Models`, `Views`

### State Management
- Use `ObservableProperty` and `RelayCommand` from CommunityToolkit
- `INotifyPropertyChanged` via source generators — no boilerplate

### Navigation
- **Shell navigation** for most apps — URI-based, supports deep linking

### Performance
- Use `CollectionView` over `ListView`
- Enable AOT compilation for release builds
- Profile with Visual Studio Diagnostic Tools

---

## Kotlin Multiplatform (KMP)

### Recommended Architecture
- Shared: `domain/` and `data/` layers in `commonMain`
- Platform-specific: UI layer in `androidMain` (Compose) and `iosMain` (SwiftUI via KMP-NativeCoroutines)

### State Management
- `StateFlow` in shared ViewModels — consumed natively on each platform
- Use **SKIE** or **KMP-NativeCoroutines** to expose flows to Swift

### Key Libraries
- **Ktor** for networking, **SQLDelight** for local DB, **Koin/Kodein** for DI
