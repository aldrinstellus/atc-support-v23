# v19 Design Tokens

Tokens Studio compatible design tokens for v19-unified-modes.

## Structure

```
tokens/
├── $metadata.json     # Token set order
├── $themes.json       # Theme configuration (Dark/Light)
├── core.json          # Core tokens (spacing, typography, shadows, radii, etc.)
├── dark.json          # Dark theme semantic colors
├── light.json         # Light theme semantic colors
└── _archive-w3c-format/  # Old W3C DTCG format (archived)
```

## Token Counts

| File | Tokens | Description |
|------|--------|-------------|
| `core.json` | 77+ | spacing (13), borderRadius (8), borderWidth (4), opacity (15), boxShadow (7), fontFamilies (3), fontWeights (4), fontSizes (7), lineHeights (6), letterSpacing (6), typography (7), chart (5) |
| `dark.json` | 27 | Semantic colors for dark theme |
| `light.json` | 27 | Semantic colors for light theme |

## Usage with Tokens Studio

### Load Locally
1. Open Figma file
2. Run **Tokens Studio** plugin
3. Click **Load tokens from file/folder**
4. Select this `tokens/` folder

### Sync via GitHub
1. In Tokens Studio, go to **Settings** → **Sync providers** → **GitHub**
2. Configure:
   - **Repository**: `aldrinstellus/v19-design-tokens`
   - **Branch**: `main`
   - **File path**: `.`
3. Click **Pull from GitHub**

### Export to Figma
1. Load tokens (local or GitHub)
2. Click **Styles & Variables** → **Export styles & variables to Figma**
3. Select variable types and themes
4. Click **Export to Figma**

## Format

Uses **Tokens Studio Legacy format** (not W3C DTCG):

```json
{
  "tokenName": {
    "value": "#cbff00",
    "type": "color",
    "description": "Primary action - hsl(72 100% 50%)"
  }
}
```

## Source

Extracted from `src/app/globals.css` in v19-unified-modes.

## GitHub Repository

https://github.com/aldrinstellus/v19-design-tokens
