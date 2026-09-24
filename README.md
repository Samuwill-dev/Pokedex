# Pokedex

A responsive Pokedex web app built with plain HTML, CSS and JavaScript. It loads Pokemon data from the [PokeAPI](https://pokeapi.co/) and displays it as interactive cards.

## Features

- **Pokemon cards** with ID, name, type and image, colored by the main type
- **Lazy loading**: 20 Pokemon are loaded at a time, more via the "Load More" button
- **Search** by name (at least 3 letters, with a warning message for shorter input)
- **Detail dialog** with tabs for "About" and "Base Stats"
- **Caching** of already loaded Pokemon to avoid duplicate API requests
- **Loading screen** while data is being fetched
- **Keyboard accessible**: cards and dialog controls can be used with Tab and Enter

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+, `async`/`await`, Fetch API)
- [PokeAPI](https://pokeapi.co/) as data source

## Project Structure

```
Pokedex/
├── fonts/          # Custom fonts
├── imgs/           # Images and icons
├── script/
│   ├── script.js     # Data fetching, caching, rendering
│   ├── search.js     # Search logic
│   └── templates.js  # HTML template functions
├── styles/         # CSS files
└── index.html
```

## Getting Started

No build step or dependencies are required.

1. Clone the repository:
   ```bash
   git clone https://github.com/Samuwill-dev/Pokedex.git
   ```
2. Open the project folder:
   ```bash
   cd Pokedex
   ```
3. Open `index.html` in your browser, or start it with a local server (e.g. the **Live Server** extension in VS Code).

An internet connection is required, since all data is fetched from the PokeAPI.

## Author

Samuel W
