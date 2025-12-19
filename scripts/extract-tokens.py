#!/usr/bin/env python3
"""
Token Extraction Script for v19-unified-modes
Extracts CSS variables from globals.css and converts to W3C DTCG format
for Tokens Studio compatibility.

Usage:
    python3 extract-tokens.py

Output:
    tokens/           - W3C DTCG format token files
    ├── $themes.json
    ├── $metadata.json
    ├── core/
    │   ├── colors.json
    │   ├── typography.json
    │   ├── shadows.json
    │   ├── radii.json
    │   ├── spacing.json
    │   └── breakpoints.json
    └── semantic/
        ├── dark.json
        └── light.json
"""

import json
import os
import re
import colorsys
from pathlib import Path
from datetime import datetime


def hsl_to_hex(h: float, s: float, l: float) -> str:
    """Convert HSL values to HEX color."""
    # Convert percentage to 0-1 range
    s = s / 100
    l = l / 100
    h = h / 360

    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return f"#{int(r*255):02x}{int(g*255):02x}{int(b*255):02x}"


def parse_hsl_value(value: str) -> dict:
    """Parse HSL value like '240 6% 7%' to components."""
    match = re.match(r'(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%', value.strip())
    if match:
        h, s, l = float(match.group(1)), float(match.group(2)), float(match.group(3))
        return {
            'h': h,
            's': s,
            'l': l,
            'hex': hsl_to_hex(h, s, l)
        }
    return None


def extract_css_variables(css_content: str, selector: str = ':root') -> dict:
    """Extract CSS custom properties from a specific selector block."""
    variables = {}

    # Find the selector block
    if selector == ':root':
        pattern = r':root\s*\{([^}]+)\}'
    else:
        pattern = rf'\.{selector}\s*\{{([^}}]+)\}}'

    matches = re.findall(pattern, css_content, re.DOTALL)

    for block in matches:
        # Extract individual variables
        var_pattern = r'--([a-zA-Z0-9-]+)\s*:\s*([^;]+);'
        for match in re.finditer(var_pattern, block):
            name = match.group(1)
            value = match.group(2).strip()
            variables[name] = value

    return variables


def create_color_token(name: str, hsl_value: str, description: str = "") -> dict:
    """Create a W3C DTCG color token."""
    parsed = parse_hsl_value(hsl_value)
    if parsed:
        return {
            "$value": parsed['hex'],
            "$type": "color",
            "$description": f"{description} - hsl({hsl_value})" if description else f"hsl({hsl_value})"
        }
    # For non-HSL values (like shadow references), return as-is
    return {
        "$value": hsl_value,
        "$type": "color",
        "$description": description
    }


def create_shadow_token(name: str, value: str) -> dict:
    """Create a W3C DTCG shadow token."""
    return {
        "$value": value,
        "$type": "shadow",
        "$description": f"Shadow level: {name}"
    }


def create_dimension_token(value: str, description: str = "") -> dict:
    """Create a W3C DTCG dimension token."""
    return {
        "$value": value,
        "$type": "dimension",
        "$description": description
    }


def main():
    # Paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    css_path = project_root / "src" / "app" / "globals.css"
    tokens_dir = project_root / "tokens"

    print(f"Reading CSS from: {css_path}")

    # Read CSS file
    with open(css_path, 'r') as f:
        css_content = f.read()

    # Extract variables from both :root (dark) and .light blocks
    dark_vars = extract_css_variables(css_content, ':root')
    light_vars = extract_css_variables(css_content, 'light')

    print(f"Found {len(dark_vars)} dark mode variables")
    print(f"Found {len(light_vars)} light mode variables")

    # Create output directories
    (tokens_dir / "core").mkdir(parents=True, exist_ok=True)
    (tokens_dir / "semantic").mkdir(parents=True, exist_ok=True)

    # ========== CORE COLORS ==========
    core_colors = {
        "sana": {
            "neon": create_color_token("sana-neon", dark_vars.get("sana-neon", "72 100% 50%"), "Sana Neon Lime - Primary Brand"),
            "royal": create_color_token("sana-royal", dark_vars.get("sana-royal", "220 100% 48%"), "Sana Royal Blue"),
            "fuschia": create_color_token("sana-fuschia", dark_vars.get("sana-fuschia", "320 98% 47%"), "Sana Fuschia Pink"),
            "midnight": create_color_token("sana-midnight", dark_vars.get("sana-midnight", "226 74% 10%"), "Sana Midnight Blue"),
        },
        "chart": {
            "1": create_color_token("chart-1", dark_vars.get("chart-1", "72 100% 50%"), "Chart Color 1 - Neon Lime"),
            "2": create_color_token("chart-2", dark_vars.get("chart-2", "220 100% 55%"), "Chart Color 2 - Blue"),
            "3": create_color_token("chart-3", dark_vars.get("chart-3", "320 98% 55%"), "Chart Color 3 - Pink"),
            "4": create_color_token("chart-4", dark_vars.get("chart-4", "38 92% 60%"), "Chart Color 4 - Orange"),
            "5": create_color_token("chart-5", dark_vars.get("chart-5", "142 76% 45%"), "Chart Color 5 - Green"),
        }
    }

    with open(tokens_dir / "core" / "colors.json", 'w') as f:
        json.dump(core_colors, f, indent=2)
    print("Created: core/colors.json")

    # ========== TYPOGRAPHY ==========
    typography = {
        "fontFamily": {
            "sans": {
                "$value": "Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                "$type": "fontFamily",
                "$description": "Primary sans-serif font"
            },
            "mono": {
                "$value": "IBM Plex Mono, Monaco, Cascadia Code, monospace",
                "$type": "fontFamily",
                "$description": "Monospace font for code"
            },
            "serif": {
                "$value": "Georgia, serif",
                "$type": "fontFamily",
                "$description": "Serif font"
            }
        },
        "fontSize": {
            "h1": {"$value": "34px", "$type": "dimension", "$description": "Heading 1 - 2.125rem"},
            "h2": {"$value": "24px", "$type": "dimension", "$description": "Heading 2 - 1.5rem"},
            "h3": {"$value": "20px", "$type": "dimension", "$description": "Heading 3 - 1.25rem"},
            "body": {"$value": "14px", "$type": "dimension", "$description": "Body text - 0.875rem"},
            "small": {"$value": "12px", "$type": "dimension", "$description": "Small text - 0.75rem"},
            "label": {"$value": "13px", "$type": "dimension", "$description": "Label text - 0.8125rem"},
        },
        "fontWeight": {
            "light": {"$value": "300", "$type": "fontWeight"},
            "regular": {"$value": "400", "$type": "fontWeight"},
            "medium": {"$value": "500", "$type": "fontWeight"},
            "semibold": {"$value": "600", "$type": "fontWeight"},
            "bold": {"$value": "700", "$type": "fontWeight"},
        },
        "lineHeight": {
            "h1": {"$value": "1.15", "$type": "number", "$description": "Heading 1 line height"},
            "h2": {"$value": "1.25", "$type": "number", "$description": "Heading 2 line height"},
            "h3": {"$value": "1.3", "$type": "number", "$description": "Heading 3 line height"},
            "body": {"$value": "1.5", "$type": "number", "$description": "Body line height"},
            "small": {"$value": "1.3", "$type": "number", "$description": "Small text line height"},
        },
        "letterSpacing": {
            "tighter": {"$value": "-0.05em", "$type": "dimension"},
            "tight": {"$value": "-0.025em", "$type": "dimension"},
            "normal": {"$value": "0em", "$type": "dimension"},
            "wide": {"$value": "0.025em", "$type": "dimension"},
            "wider": {"$value": "0.05em", "$type": "dimension"},
            "widest": {"$value": "0.1em", "$type": "dimension"},
        }
    }

    with open(tokens_dir / "core" / "typography.json", 'w') as f:
        json.dump(typography, f, indent=2)
    print("Created: core/typography.json")

    # ========== SHADOWS ==========
    shadows = {
        "2xs": create_shadow_token("2xs", dark_vars.get("shadow-2xs", "0px 1px 2px 0px hsl(0 0% 0% / 0.15)")),
        "xs": create_shadow_token("xs", dark_vars.get("shadow-xs", "0px 1px 2px 0px hsl(0 0% 0% / 0.18)")),
        "sm": create_shadow_token("sm", dark_vars.get("shadow-sm", "0px 1px 3px 0px hsl(0 0% 0% / 0.24), 0px 1px 2px -1px hsl(0 0% 0% / 0.24)")),
        "md": create_shadow_token("md", dark_vars.get("shadow-md", "0px 4px 6px -1px hsl(0 0% 0% / 0.24), 0px 2px 4px -2px hsl(0 0% 0% / 0.24)")),
        "lg": create_shadow_token("lg", dark_vars.get("shadow-lg", "0px 10px 15px -3px hsl(0 0% 0% / 0.24), 0px 4px 6px -4px hsl(0 0% 0% / 0.24)")),
        "xl": create_shadow_token("xl", dark_vars.get("shadow-xl", "0px 20px 25px -5px hsl(0 0% 0% / 0.3), 0px 8px 10px -6px hsl(0 0% 0% / 0.3)")),
        "2xl": create_shadow_token("2xl", dark_vars.get("shadow-2xl", "0px 25px 50px -12px hsl(0 0% 0% / 0.5)")),
    }

    with open(tokens_dir / "core" / "shadows.json", 'w') as f:
        json.dump(shadows, f, indent=2)
    print("Created: core/shadows.json")

    # ========== RADII ==========
    radii = {
        "base": {"$value": "8px", "$type": "dimension", "$description": "Base radius - 0.5rem"},
        "sm": {"$value": "4px", "$type": "dimension", "$description": "Small radius - base - 4px"},
        "md": {"$value": "6px", "$type": "dimension", "$description": "Medium radius - base - 2px"},
        "lg": {"$value": "8px", "$type": "dimension", "$description": "Large radius - same as base"},
        "xl": {"$value": "12px", "$type": "dimension", "$description": "Extra large radius - base + 4px"},
        "2xl": {"$value": "16px", "$type": "dimension", "$description": "2XL radius"},
        "full": {"$value": "9999px", "$type": "dimension", "$description": "Full/pill radius"},
    }

    with open(tokens_dir / "core" / "radii.json", 'w') as f:
        json.dump(radii, f, indent=2)
    print("Created: core/radii.json")

    # ========== SPACING ==========
    spacing = {
        "0": {"$value": "0px", "$type": "dimension"},
        "0.5": {"$value": "2px", "$type": "dimension"},
        "1": {"$value": "4px", "$type": "dimension", "$description": "Base unit"},
        "1.5": {"$value": "6px", "$type": "dimension"},
        "2": {"$value": "8px", "$type": "dimension"},
        "2.5": {"$value": "10px", "$type": "dimension"},
        "3": {"$value": "12px", "$type": "dimension"},
        "4": {"$value": "16px", "$type": "dimension"},
        "5": {"$value": "20px", "$type": "dimension"},
        "6": {"$value": "24px", "$type": "dimension"},
        "8": {"$value": "32px", "$type": "dimension"},
        "10": {"$value": "40px", "$type": "dimension"},
        "12": {"$value": "48px", "$type": "dimension"},
        "16": {"$value": "64px", "$type": "dimension"},
        "20": {"$value": "80px", "$type": "dimension"},
        "24": {"$value": "96px", "$type": "dimension"},
    }

    with open(tokens_dir / "core" / "spacing.json", 'w') as f:
        json.dump(spacing, f, indent=2)
    print("Created: core/spacing.json")

    # ========== BREAKPOINTS ==========
    breakpoints = {
        "sm": {"$value": "640px", "$type": "dimension", "$description": "Mobile breakpoint"},
        "md": {"$value": "768px", "$type": "dimension", "$description": "Tablet breakpoint"},
        "lg": {"$value": "1024px", "$type": "dimension", "$description": "Desktop breakpoint"},
        "xl": {"$value": "1280px", "$type": "dimension", "$description": "Wide desktop breakpoint"},
        "2xl": {"$value": "1536px", "$type": "dimension", "$description": "Ultra wide breakpoint"},
    }

    with open(tokens_dir / "core" / "breakpoints.json", 'w') as f:
        json.dump(breakpoints, f, indent=2)
    print("Created: core/breakpoints.json")

    # ========== SEMANTIC DARK ==========
    semantic_dark = {
        "background": create_color_token("background", dark_vars.get("background", "240 6% 7%"), "Page background"),
        "foreground": create_color_token("foreground", dark_vars.get("foreground", "0 0% 91%"), "Primary text"),
        "card": create_color_token("card", dark_vars.get("card", "220 4% 12%"), "Card background"),
        "cardForeground": create_color_token("card-foreground", dark_vars.get("card-foreground", "0 0% 91%"), "Card text"),
        "popover": create_color_token("popover", dark_vars.get("popover", "220 4% 12%"), "Popover background"),
        "popoverForeground": create_color_token("popover-foreground", dark_vars.get("popover-foreground", "0 0% 91%"), "Popover text"),
        "primary": create_color_token("primary", dark_vars.get("primary", "72 100% 50%"), "Primary action"),
        "primaryForeground": create_color_token("primary-foreground", dark_vars.get("primary-foreground", "240 6% 7%"), "Text on primary"),
        "secondary": create_color_token("secondary", dark_vars.get("secondary", "216 5% 15%"), "Secondary background"),
        "secondaryForeground": create_color_token("secondary-foreground", dark_vars.get("secondary-foreground", "0 0% 91%"), "Secondary text"),
        "muted": create_color_token("muted", dark_vars.get("muted", "216 5% 15%"), "Muted background"),
        "mutedForeground": create_color_token("muted-foreground", dark_vars.get("muted-foreground", "0 0% 55%"), "Muted text"),
        "accent": create_color_token("accent", dark_vars.get("accent", "240 2% 21%"), "Accent/tertiary"),
        "accentForeground": create_color_token("accent-foreground", dark_vars.get("accent-foreground", "0 0% 91%"), "Accent text"),
        "destructive": create_color_token("destructive", dark_vars.get("destructive", "4 100% 59%"), "Destructive/error"),
        "destructiveForeground": create_color_token("destructive-foreground", dark_vars.get("destructive-foreground", "0 0% 100%"), "Destructive text"),
        "success": create_color_token("success", dark_vars.get("success", "142 69% 50%"), "Success state"),
        "successForeground": {"$value": "#ffffff", "$type": "color", "$description": "Success text"},
        "warning": create_color_token("warning", dark_vars.get("warning", "38 92% 50%"), "Warning state"),
        "warningForeground": create_color_token("warning-foreground", dark_vars.get("warning-foreground", "240 6% 7%"), "Warning text"),
        "border": create_color_token("border", dark_vars.get("border", "220 4% 18%"), "Border color"),
        "input": create_color_token("input", dark_vars.get("input", "220 4% 18%"), "Input border"),
        "ring": create_color_token("ring", dark_vars.get("ring", "72 100% 50%"), "Focus ring"),
        "sidebar": create_color_token("sidebar", dark_vars.get("sidebar", "220 4% 12%"), "Sidebar background"),
        "sidebarForeground": create_color_token("sidebar-foreground", dark_vars.get("sidebar-foreground", "0 0% 91%"), "Sidebar text"),
        "sidebarPrimary": create_color_token("sidebar-primary", dark_vars.get("sidebar-primary", "72 100% 50%"), "Sidebar primary"),
        "sidebarAccent": create_color_token("sidebar-accent", dark_vars.get("sidebar-accent", "240 2% 21%"), "Sidebar accent"),
        "sidebarBorder": create_color_token("sidebar-border", dark_vars.get("sidebar-border", "220 4% 18%"), "Sidebar border"),
    }

    with open(tokens_dir / "semantic" / "dark.json", 'w') as f:
        json.dump(semantic_dark, f, indent=2)
    print("Created: semantic/dark.json")

    # ========== SEMANTIC LIGHT ==========
    semantic_light = {
        "background": create_color_token("background", light_vars.get("background", "0 0% 100%"), "Page background"),
        "foreground": create_color_token("foreground", light_vars.get("foreground", "200 10% 10%"), "Primary text"),
        "card": create_color_token("card", light_vars.get("card", "0 0% 98%"), "Card background"),
        "cardForeground": create_color_token("card-foreground", light_vars.get("card-foreground", "200 10% 10%"), "Card text"),
        "popover": create_color_token("popover", light_vars.get("popover", "0 0% 98%"), "Popover background"),
        "popoverForeground": create_color_token("popover-foreground", light_vars.get("popover-foreground", "200 10% 10%"), "Popover text"),
        "primary": create_color_token("primary", light_vars.get("primary", "72 100% 50%"), "Primary action"),
        "primaryForeground": create_color_token("primary-foreground", light_vars.get("primary-foreground", "200 10% 8%"), "Text on primary"),
        "secondary": create_color_token("secondary", light_vars.get("secondary", "0 0% 96%"), "Secondary background"),
        "secondaryForeground": create_color_token("secondary-foreground", light_vars.get("secondary-foreground", "200 10% 20%"), "Secondary text"),
        "muted": create_color_token("muted", light_vars.get("muted", "0 0% 96%"), "Muted background"),
        "mutedForeground": create_color_token("muted-foreground", light_vars.get("muted-foreground", "0 0% 45%"), "Muted text"),
        "accent": create_color_token("accent", light_vars.get("accent", "72 100% 50%"), "Accent/tertiary"),
        "accentForeground": create_color_token("accent-foreground", light_vars.get("accent-foreground", "200 10% 8%"), "Accent text"),
        "destructive": create_color_token("destructive", light_vars.get("destructive", "0 84% 60%"), "Destructive/error"),
        "destructiveForeground": create_color_token("destructive-foreground", light_vars.get("destructive-foreground", "0 0% 100%"), "Destructive text"),
        "success": create_color_token("success", light_vars.get("success", "142 76% 36%"), "Success state"),
        "successForeground": {"$value": "#ffffff", "$type": "color", "$description": "Success text"},
        "warning": create_color_token("warning", light_vars.get("warning", "38 92% 50%"), "Warning state"),
        "warningForeground": create_color_token("warning-foreground", light_vars.get("warning-foreground", "200 10% 10%"), "Warning text"),
        "border": create_color_token("border", light_vars.get("border", "0 0% 90%"), "Border color"),
        "input": create_color_token("input", light_vars.get("input", "0 0% 90%"), "Input border"),
        "ring": create_color_token("ring", light_vars.get("ring", "72 100% 50%"), "Focus ring"),
        "sidebar": create_color_token("sidebar", light_vars.get("sidebar", "0 0% 98%"), "Sidebar background"),
        "sidebarForeground": create_color_token("sidebar-foreground", light_vars.get("sidebar-foreground", "200 10% 10%"), "Sidebar text"),
        "sidebarPrimary": create_color_token("sidebar-primary", light_vars.get("sidebar-primary", "72 100% 50%"), "Sidebar primary"),
        "sidebarAccent": create_color_token("sidebar-accent", light_vars.get("sidebar-accent", "0 0% 94%"), "Sidebar accent"),
        "sidebarBorder": create_color_token("sidebar-border", light_vars.get("sidebar-border", "0 0% 90%"), "Sidebar border"),
    }

    with open(tokens_dir / "semantic" / "light.json", 'w') as f:
        json.dump(semantic_light, f, indent=2)
    print("Created: semantic/light.json")

    # ========== THEMES CONFIG ==========
    themes = {
        "dark": {
            "selectedTokenSets": {
                "core/colors": "enabled",
                "core/typography": "enabled",
                "core/shadows": "enabled",
                "core/radii": "enabled",
                "core/spacing": "enabled",
                "core/breakpoints": "enabled",
                "semantic/dark": "enabled"
            }
        },
        "light": {
            "selectedTokenSets": {
                "core/colors": "enabled",
                "core/typography": "enabled",
                "core/shadows": "enabled",
                "core/radii": "enabled",
                "core/spacing": "enabled",
                "core/breakpoints": "enabled",
                "semantic/light": "enabled"
            }
        }
    }

    with open(tokens_dir / "$themes.json", 'w') as f:
        json.dump(themes, f, indent=2)
    print("Created: $themes.json")

    # ========== METADATA ==========
    metadata = {
        "tokenSetOrder": [
            "core/colors",
            "core/typography",
            "core/shadows",
            "core/radii",
            "core/spacing",
            "core/breakpoints",
            "semantic/dark",
            "semantic/light"
        ]
    }

    with open(tokens_dir / "$metadata.json", 'w') as f:
        json.dump(metadata, f, indent=2)
    print("Created: $metadata.json")

    # ========== SUMMARY ==========
    print("\n" + "="*50)
    print("TOKEN EXTRACTION COMPLETE")
    print("="*50)
    print(f"\nOutput directory: {tokens_dir}")
    print("\nFiles created:")
    print("  - $themes.json (dark/light theme configuration)")
    print("  - $metadata.json (Tokens Studio metadata)")
    print("  - core/colors.json (brand + chart colors)")
    print("  - core/typography.json (fonts, sizes, weights)")
    print("  - core/shadows.json (7 elevation levels)")
    print("  - core/radii.json (border radius tokens)")
    print("  - core/spacing.json (spacing scale)")
    print("  - core/breakpoints.json (responsive breakpoints)")
    print("  - semantic/dark.json (dark theme semantic colors)")
    print("  - semantic/light.json (light theme semantic colors)")
    print("\nTotal tokens extracted:")
    print(f"  - Core colors: 9 (brand + charts)")
    print(f"  - Typography: 22 (families, sizes, weights, line-heights)")
    print(f"  - Shadows: 7")
    print(f"  - Radii: 7")
    print(f"  - Spacing: 16")
    print(f"  - Breakpoints: 5")
    print(f"  - Dark semantic: 28")
    print(f"  - Light semantic: 28")
    print(f"\nGrand total: ~122 tokens")
    print("\nNext steps:")
    print("  1. Push tokens/ folder to GitHub repository")
    print("  2. Connect Tokens Studio to GitHub repo")
    print("  3. Import tokens into Figma")


if __name__ == "__main__":
    main()
