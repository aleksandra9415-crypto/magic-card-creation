# Color Palette Update Plan

Implementing a new sophisticated color palette while maintaining existing design tokens to ensure stability.

## User Review Required

> [!IMPORTANT]
> The request involves adding "Teal" as a secondary accent color. I will introduce new variables for this to avoid disrupting existing styles that rely on the primary blue/orange tokens.

## Proposed Changes

### 1. Global CSS Variable Update
Modify `src/styles.css` to update existing tokens and add new teal accents.

#### Color Mapping
- **Page Background**: `#F1F4F6` (updated `--background`)
- **Cards**: `#FFFFFF` (updated `--card`)
- **Dark Blocks Background**: `#062132` (updated `--primary` for dark mode/footer)
- **Dark Blocks Accent**: `#132A3F`
- **Orange Accent**: `#FC6116` (updated `--accent`)
- **Soft Orange**: `#FFE7DA` (updated `--secondary`)
- **Teal (New)**: `teal-500` (#56AFB1) and `teal-200` (#BCDFE0)
- **Dividers**: `#E3E8EC` (updated `--border`)
- **Secondary Text**: `#6B7C8C` (updated `--muted-foreground`)

### 2. Legacy CSS Synchronization
Update `src/legacy-styles/home.css`, `src/legacy-styles/rating-form.css`, and `src/legacy-styles/review.css` to align with the new palette.
- Replace all instances of the "old aggressive blue" with the new dark blue `#062132` / `#132A3F`.
- Update the dark gradient to: `linear-gradient(135deg, #062132 0%, #132A3F 100%)`.

### 3. Component Fixes
Ensure color contrast compliance across components.
- Check and fix text colors on orange/teal backgrounds (dark text for light fills, white for heavy fills).
- Update icons/marks to use the new teal accent where appropriate (status indicators, checkmarks).

## Technical Details

### New CSS Tokens
```css
--teal-500: #56AFB1;
--teal-200: #BCDFE0;
```

### Color Overrides
I will use the `oklch` equivalents in `src/styles.css` to match the project's existing format while ensuring the visual result matches the requested hex codes exactly.

### Hardcoded Color Search
A final pass will be made to remove hardcoded hex values in `.tsx` files (e.g., `Hero.tsx` floating badges) and replace them with the new dark blue `#0F172A` -> `#132A3F`.
