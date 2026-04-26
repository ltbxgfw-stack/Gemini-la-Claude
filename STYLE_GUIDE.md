# UI Style Guide: Gemini × Claude Aesthetic

This document outlines the visual aesthetic, colors, typography, and layout principles extracted from the "Gemini as Claude" interface. The design aims to emulate Claude's signature "warm, intellectual, and thoughtful" aesthetic while functioning as a wrapper for Gemini.

## 1. Overall Aesthetic

The UI design focuses on a reading-centric, paper-like aesthetic that feels warm, calm, and intellectually focused. It heavily utilizes off-white backgrounds, dark ink-like text, and subtle earthy accents (amber) to create a distraction-free and elegant environment.

**Key Characteristics:**
* **Warmth:** Uses cream and warm-white backgrounds instead of harsh pure whites.
* **Typographic Focus:** Mixes sans-serif for UI, serif for headings/logos to provide an editorial feel, and monospace for code/system elements.
* **Subtle Accents:** Interactions and highlights use a muted amber/gold palette rather than bright primary colors.
* **Softness:** Uses rounded corners, soft shadows, and gentle transitions.

---

## 2. Color Palette

The color palette is built around "paper and ink" with an amber accent.

### Backgrounds
* **Cream (`#F5F0E8`):** The primary app background. Acts as the base canvas.
* **Warm White (`#FDFAF5`):** Used for elevated elements like the top bar, sidebar, and modal backgrounds to create depth.
* **Amber Pale (`#F5E6CC`):** Used for subtle highlights, code block backgrounds, and hover states.

### Text & Ink (Foregrounds)
* **Ink (`#1A1714`):** Primary text color, providing high contrast but slightly softer than pure black.
* **Ink Soft (`#3D3730`):** Secondary text color used for assistant messages and less prominent text.
* **Ink Muted (`#8C8070`):** Tertiary text color used for placeholders, hints, and badges.

### Accents
* **Amber (`#C8852A`):** The primary brand/accent color. Used for primary buttons, active states, and logos.
* **Amber Light (`#E8A84A`):** Used in gradients and hover states for amber elements.
* **Border (`#DDD5C4`):** A warm grey/brown used for subtle dividers and input borders.

### System/Feedback
* **Success (`#4CAF50`):** Used for the active API connection dot.
* **Error (`#E53935`):** Used for the disconnected/error API connection dot.
* **Error Background (`#FFF0F0`):** Used for error message banners.
* **Error Text (`#C62828`):** Used for error message text.

---

## 3. Typography

The typography system uses three distinct typefaces to create hierarchy and texture.

### Fonts
1. **Sans-Serif (Primary UI):** `'Instrument Sans', sans-serif`
   * Used for general UI text, buttons, and user inputs.
   * Gives a clean, modern, but slightly humanist feel.
2. **Serif (Editorial/Headings):** `'Fraunces', serif`
   * Used for the logo, main welcome heading, and modal titles.
   * Conveys intelligence, elegance, and a literary feel.
   * Weights used: Light (300).
3. **Monospace (Technical/System):** `'DM Mono', monospace`
   * Used for the system prompt, badges, code snippets, and subtle UI labels.
   * Provides a "behind-the-scenes" or technical contrast to the elegant serif.

### Letter Spacing (Tracking)
* **Tight (`-0.02em`):** Used on Serif headings (Logo, Welcome H1) to make the text feel more cohesive and polished.
* **Wide (`0.03em`):** Used on small interactive elements like edit buttons and input hints.
* **Wider (`0.05em`):** Used on small system badges.
* **Widest (`0.12em`):** Used on uppercase sidebar titles for a tracked-out, structural look.

### Line Heights (Leading)
* The UI generally favors relaxed line heights (`1.5` to `1.8`) to improve readability, especially for long-form text and prompts.

---

## 4. UI Elements & Radii

The interface uses varied border radii to establish hierarchy and define element types.

* **Small (`4px` - `6px`):** Used for small inputs, badges, and code blocks.
* **Medium (`8px` - `9px`):** Used for logo icons, standard buttons, and larger inputs.
* **Large (`12px` - `14px`):** Used for modals and the main input wrapper.
* **Pill (`20px`):** Used for interactive chips and small badges.
* **Asymmetrical (Chat Bubbles):** User chat bubbles use `18px 18px 4px 18px` to create a directional "speech balloon" effect.

---

## 5. Implementation Tokens

To utilize this design system in your own projects, refer to the generated token files in this repository:
* `theme.js` (JavaScript Object)
* `theme.ts` (TypeScript Interface)
* `theme.json` (Design Tokens for Figma/Tailwind)
* `theme.css` (CSS Custom Properties)
