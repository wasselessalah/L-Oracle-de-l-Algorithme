# L'Oracle de l'Algorithme 🔮

**Projet développé pour le hackathon organisé par APPEL EPI SOUSSE**

🌐 **Demo Live** : [https://l-oracle-de-l-algorithme.vercel.app](https://l-oracle-de-l-algorithme.vercel.app/?w_likes=0.5&w_shares=0.5&w_readTime=0.3&w_similarity=0.5&randomness=0)

## 📖 Description

**L'Oracle de l'Algorithme** est une plateforme interactive de simulation et de visualisation des algorithmes de recommandation des réseaux sociaux. Ce projet vise à démystifier les mécanismes cachés derrière les fils d'actualité personnalisés et à sensibiliser sur les phénomènes de **bulles de filtrage** et de **biais algorithmiques**.

### 🎯 Objectifs du Projet

- **Éducation & Sensibilisation** : Permettre aux utilisateurs de comprendre comment les algorithmes façonnent leur perception de l'information
- **Visualisation en Temps Réel** : Observer l'impact direct des paramètres algorithmiques sur la diversité du contenu
- **Expérimentation Interactive** : Tester différentes configurations pour comprendre les mécanismes de recommandation
- **Analyse des Métriques** : Mesurer quantitativement l'intensité des bulles cognitives formées par l'algorithme

### 💡 Problématique Abordée

Les algorithmes de recommandation des réseaux sociaux créent des **chambres d'écho** où les utilisateurs sont principalement exposés à des contenus qui confirment leurs opinions existantes. Ce projet simule ce phénomène en :

- Modélisant le profil idéologique d'un utilisateur basé sur son historique d'interactions
- Filtrant et classant le contenu selon la proximité avec ce profil
- Visualisant la diminution progressive de la diversité informationnelle
- Permettant d'ajuster les paramètres pour observer différents scénarios

### ✨ Fonctionnalités Principales

- **Simulation de Feed Personnalisé** : Algorithme de scoring basé sur l'engagement et la proximité idéologique
- **Modes Prédéfinis** : 
  - Mode Équilibré (diversité maximale)
  - Mode Engagement (privilégie les interactions)
  - Mode Bulle (filtre fort sur les opinions similaires)
- **Visualisations Dynamiques** :
  - Graphique de distribution idéologique
  - Jauge d'intensité de la bulle cognitive
  - Évolution de la diversité du contenu
- **Contrôles Interactifs** : Ajustement en temps réel des poids de l'algorithme
- **Métriques Détaillées** : Score de diversité, intensité de bulle, distribution des catégories

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Running the Simulation

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Simulation Logic

Le moteur de simulation se trouve dans [src/lib/simulation-engine.ts](src/lib/simulation-engine.ts) et implémente un algorithme sophistiqué de scoring de contenu.

### Algorithme de Scoring

Chaque post reçoit un score calculé selon trois dimensions pondérables :

1. **Engagement (Weight: 0-1)** 
   - Likes, partages, et temps de lecture normalisés
   - Simule l'attrait viral du contenu
   - Favorise les posts à forte interaction

2. **Proximité Idéologique (Weight: 0-1)**
   - Compare la position idéologique du post (-1 à +1) avec l'historique de l'utilisateur
   - Crée l'effet de "bulle" en privilégiant les contenus similaires
   - Plus le poids est élevé, plus le filtre est fort

3. **Randomness (Weight: 0-1)**
   - Facteur de bruit pour injecter de la diversité
   - Empêche une personnalisation trop stricte
   - Simule les découvertes aléatoires

**Formule de Score :**
```
Score = (engagement × w_engagement) + (proximité × w_idéologie) + (random × w_random)
```

### Architecture du Code

-   **Feed Engine** : [src/lib/simulation-engine.ts](src/lib/simulation-engine.ts) - Réordonnancement du contenu selon les poids dynamiques
-   **Gestion d'État** : [src/hooks/use-simulation.ts](src/hooks/use-simulation.ts) - Hook React gérant le feed, les métriques et le profil utilisateur
-   **Calcul de Métriques** : [src/lib/metrics.ts](src/lib/metrics.ts) - Algorithmes de calcul de diversité et d'intensité de bulle
-   **Visualisations** : [src/components/viz/](src/components/viz/) - Graphiques interactifs (Chart.js)
-   **Contrôles** : [src/components/controls/](src/components/controls/) - Interface de configuration des paramètres

## 📊 Metrics

### Score de Diversité
Pourcentage de catégories uniques présentes dans le top 20 des posts affichés. 
- **100%** : Diversité maximale, toutes les catégories représentées
- **0%** : Diversité minimale, une seule catégorie dominante

### Intensité de la Bulle Cognitive
Calculée comme `100 - Score de Diversité`. 
- **Valeur élevée** : Bulle forte, contenu homogène et filtré
- **Valeur faible** : Exposition diversifiée à différents points de vue

### Distribution Idéologique
Visualise la répartition des posts selon leur position sur le spectre idéologique (-1 à +1), permettant d'identifier les biais de filtrage.

## 🛠 Tech Stack

-   **Framework** : Next.js 14 (App Router) avec TypeScript
-   **Styling** : Tailwind CSS pour un design moderne et responsive
-   **Visualisation** : Chart.js avec react-chartjs-2
-   **UI Components** : Composants custom avec Radix UI primitives
-   **Icons** : Lucide React
-   **State Management** : React Hooks (useState, useEffect, useCallback)
-   **URL Sync** : Synchronisation des paramètres avec l'URL pour le partage

## 🎨 Structure du Projet

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Page d'accueil avec simulation
├── components/
│   ├── controls/           # Contrôles de l'algorithme
│   ├── feed/               # Composants du fil d'actualité
│   ├── viz/                # Visualisations et graphiques
│   └── ui/                 # Composants UI réutilisables
├── lib/
│   ├── simulation-engine.ts # Moteur de scoring
│   ├── metrics.ts          # Calculs de métriques
│   └── scoring.ts          # Fonctions de scoring
├── hooks/
│   ├── use-simulation.ts   # Hook principal de simulation
│   └── use-sync-url-params.ts # Sync URL
├── data/
│   └── posts.ts            # Dataset de posts simulés
└── types/
    └── index.ts            # Définitions TypeScript
```

## 🚀 Déploiement

Le projet est déployé sur Vercel et accessible à l'adresse :
**[https://l-oracle-de-l-algorithme.vercel.app](https://l-oracle-de-l-algorithme.vercel.app/?w_likes=0.5&w_shares=0.5&w_readTime=0.3&w_similarity=0.5&randomness=0)**

### Déployer votre propre instance

```bash
# Build de production
npm run build

# Démarrage du serveur de production
npm start
```

## 👥 Équipe & Contribution

Projet réalisé dans le cadre du hackathon APPEL EPI SOUSSE.

## 📄 Licence

Ce projet est à but éducatif et de sensibilisation.
