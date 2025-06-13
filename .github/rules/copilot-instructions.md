---
applyTo: "**"
---

## Environnement de développement

## Framework principal et UI

### Vue.js Ecosystem
- **Vue.js :** ^3.4.18 (Composition API avec `<script setup>`)
- **Vue Router :** ^4.0.12 (Routing SPA avec garde d'authentification)

### Framework UI
- **Quasar :** ^2.18.1 (Framework UI complet)
- **@quasar/app-vite :** ^2.1.0 (CLI et tooling)
- **@quasar/extras :** ^1.16.17 (Icônes et polices)

### Plugins Quasar activés
- `Notify` (Notifications toast)

---

## Gestion d'état et utilitaires

### State Management
- **Pinia :** ^3.0.2 (Store state management moderne pour Vue 3)
- **@vueuse/core :** ^13.2.0 (Utilitaires composables Vue)
  - `useLocalStorage` pour la persistance du store

---

## Architecture du projet

### Structure des composants
- **Composition API :** Utilisée partout avec `<script setup lang="ts">`
- **TypeScript strict :** Configuration avec type checking complet
- **Interfaces TypeScript :** Définies dans `src/js/types.ts`

### Patterns utilisés
- **Composables :** API métier via `useApi()`
- **Store Pinia :** State management réactif avec persistance localStorage
- **Route guards :** Authentification automatique
- **Type imports :** Import de types uniquement pour optimisation

### Conventions de code
- **Régions de code :** Organisation en `#region` / `#endregion`
- **Naming :** PascalCase pour composants, camelCase pour variables
