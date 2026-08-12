# Unified Spacing and Vertical Layout System

Establish a systematic vertical rhythm and layout anatomy based on a 8px grid, ensuring consistent spacing across all sections and components.

## User Review Required

> [!IMPORTANT]
> - All existing section margins and paddings will be replaced by a standardized system.
> - A new `SectionWrapper` component will be introduced to wrap all content blocks, enforcing consistent vertical gaps.
> - Mobile spacing is specifically tuned to be tighter (56px) than desktop (96px).

## Proposed Changes

### 1. Spacing Tokens
- Define CSS variables in `src/styles.css` based on an 8px scale:
  - `--space-xs`: 8px
  - `--space-sm`: 16px
  - `--space-md`: 24px
  - `--space-lg`: 40px
  - `--space-xl`: 64px
  - `--space-2xl`: 96px (desktop) / 56px (mobile)

### 2. Standardized Section Anatomy
- Create `src/components/shared/SectionWrapper.tsx`:
  - Enforces `padding-top` and `padding-bottom` using `--space-2xl`.
  - Standardizes internal spacing:
    - Eyebrow to H2: `--space-sm`.
    - H2 to Subtitle: `--space-md`.
    - Header to Content: `--space-lg`.

### 3. Global Application
- Refactor all sections to use the new tokens and `SectionWrapper`:
  - Home page: Hero, TrustStrip, DecisionTree, Services, etc.
  - Cards, Blog, and Countries pages.
  - Unify grid gaps (`--space-md`) and card internal paddings (`--space-md` for large, `--space-sm` for compact).

## Technical Details

### CSS Variables (src/styles.css)
```css
:root {
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
  --space-xl: 64px;
  --space-2xl: 56px; /* Mobile default */
}

@media (min-width: 768px) {
  :root {
    --space-2xl: 96px; /* Desktop */
  }
}
```

### Component Implementation
```tsx
// src/components/shared/SectionWrapper.tsx
export function SectionWrapper({ children, id, className, eyebrow, title, subtitle }) {
  return (
    <section id={id} className={`section-unified ${className}`}>
      <div className="container">
        {(eyebrow || title || subtitle) && (
          <div className="section__head-unified">
            {eyebrow && <span className="eyebrow-unified">{eyebrow}</span>}
            {title && <h2 className="title-unified">{title}</h2>}
            {subtitle && <p className="subtitle-unified">{subtitle}</p>}
          </div>
        )}
        <div className="section__content-unified">
          {children}
        </div>
      </div>
    </section>
  );
}
```
