# Typography System Implementation Plan

Implement a unified typographic system using **Onest** (headings) and **Inter** (body) across all pages, replacing the existing scattered font styles.

## User Review Required

> [!IMPORTANT]
> - The new scale replaces existing `clamp()` and varied font sizes with fixed desktop/mobile values.
> - `tabular-nums` will be applied to all numeric values to ensure alignment in tables and calculators.

## Proposed Changes

### 1. Global Styles and Tokens (`src/styles.css`)
- Connect Google Fonts: **Onest** (400, 500, 600, 700) and **Inter** (400, 500, 600) with Cyrillic support.
- Define CSS variables for font families:
  - `--font-heading: 'Onest', sans-serif`
  - `--font-body: 'Inter', sans-serif`
- Implement the requested scale using Tailwind utilities and CSS layers.

### 2. Typography Scale (Tailwind / Base CSS)
- **Headings (Onest):**
  - `H1`: 40px (Desktop) / 28px (Mobile), Weight 700, LH 1.15
  - `H2`: 28px (Desktop) / 22px (Mobile), Weight 700, LH 1.25
  - `H3`: 20px, Weight 600, LH 1.3
  - `H4`: 16px, Weight 600, LH 1.4
- **Text (Inter):**
  - `Body Large`: 16px, Weight 400, LH 1.65 (Blog)
  - `Body`: 15px, Weight 400, LH 1.6 (UI text)
  - `Caption`: 13px, Weight 400, LH 1.5 (Footer, Meta)
  - `Button`: 14px, Weight 600

### 3. Numeric Formatting
- Global rule for numbers: `font-variant-numeric: tabular-nums`, Weight 500.

### 4. Component & Legacy Styles Refactoring
- Update `src/legacy-styles/*.css` to use the new tokens.
- Replace `--font` and `--mono` variables in legacy styles with the new system.
- Standardize components (FAQ, Rating Table, Blog Cards, Buttons, Footer).
- Remove all references to `system-ui`, `-apple-system`, `Manrope`, and `JetBrains Mono`.

## Technical Details

- **Font Connection**: Add `<link>` tags to `src/routes/__root.tsx`.
- **Tailwind v4 Configuration**: Update `@theme` block in `src/styles.css` to register `--font-heading` and `--font-body`.
- **CSS Layers**: Use `@layer base` to set the default body font and heading styles.
- **Utility Classes**: Create custom utilities for the specific scale if needed, or map them to existing Tailwind classes.
