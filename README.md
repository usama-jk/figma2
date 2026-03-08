# @your-org/ui-kit

> React + TypeScript + Tailwind CSS component library built from the **Components-2** Figma file.

## Components

| Component    | Variants / Options |
|-------------|-------------------|
| `Button`    | 7 hierarchies × 5 sizes × 3 icon modes × 4 states |
| `Toggle`    | 2 types × 2 sizes, controlled & uncontrolled, with label + supporting text |
| `InputField`| 8 input types × 2 sizes, destructive variant, label, hint text, icons |

---

## Installation

```bash
# From GitHub (after pushing)
npm install github:your-org/ui-kit

# Or via npm registry (after publishing)
npm install @your-org/ui-kit
```

You also need peer dependencies:

```bash
npm install react react-dom
```

And Tailwind CSS configured in your project. Import the design tokens in your global CSS:

```css
/* your global CSS file */
@import "@your-org/ui-kit/src/styles/tokens.css";
```

Or copy the tokens from `src/styles/tokens.css` into your own CSS.

---

## Usage

### Button

```tsx
import { Button } from "@your-org/ui-kit";

// Primary (default)
<Button>Save changes</Button>

// Secondary gray, large
<Button hierarchy="secondary-gray" size="lg">Cancel</Button>

// With leading icon
<Button hierarchy="primary" leadingIcon={<PlusIcon />}>
  Create new
</Button>

// Icon only
<Button icon="icon-only" hierarchy="secondary-gray" ariaLabel="Edit">
  <PencilIcon />
</Button>

// Link style
<Button hierarchy="link-color">Learn more →</Button>

// Dot leading
<Button icon="dot-leading" hierarchy="secondary-color">
  In progress
</Button>

// Disabled
<Button disabled>Not available</Button>
```

**Props:**

| Prop           | Type                                                           | Default     | Description |
|---------------|----------------------------------------------------------------|-------------|-------------|
| `hierarchy`   | `"primary" \| "secondary-color" \| "secondary-gray" \| "tertiary-color" \| "tertiary-gray" \| "link-color" \| "link-gray"` | `"primary"` | Visual style |
| `size`        | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"`                      | `"md"`      | Size |
| `icon`        | `"default" \| "dot-leading" \| "icon-only"`                  | `"default"` | Icon mode |
| `leadingIcon` | `React.ReactNode`                                             | —           | Leading icon (default mode) |
| `trailingIcon`| `React.ReactNode`                                             | —           | Trailing icon (default mode) |
| `ariaLabel`   | `string`                                                      | —           | Accessible label for icon-only |
| `disabled`    | `boolean`                                                     | `false`     | Disabled state |
| `className`   | `string`                                                      | —           | Extra Tailwind classes |

---

### Toggle

```tsx
import { Toggle } from "@your-org/ui-kit";

// Basic uncontrolled
<Toggle label="Notifications" />

// With supporting text
<Toggle
  label="Marketing emails"
  supportingText="Get notified about promotions"
  defaultChecked
/>

// Controlled
const [on, setOn] = React.useState(false);
<Toggle checked={on} onCheckedChange={setOn} label="Dark mode" />

// Slim variant
<Toggle type="slim" size="sm" label="Compact" />

// Disabled
<Toggle disabled label="Unavailable" />
```

**Props:**

| Prop               | Type                  | Default      | Description |
|--------------------|-----------------------|--------------|-------------|
| `size`             | `"sm" \| "md"`        | `"md"`       | Toggle size |
| `type`             | `"default" \| "slim"` | `"default"`  | Shape variant |
| `label`            | `string`              | —            | Label text |
| `supportingText`   | `string`              | —            | Secondary description |
| `checked`          | `boolean`             | —            | Controlled state |
| `defaultChecked`   | `boolean`             | `false`      | Initial uncontrolled state |
| `onCheckedChange`  | `(checked: boolean) => void` | — | Change handler |
| `disabled`         | `boolean`             | `false`      | Disabled state |

---

### InputField

```tsx
import { InputField } from "@your-org/ui-kit";

// Basic
<InputField label="Email" placeholder="you@example.com" />

// Required with hint
<InputField
  label="Password"
  type="password"
  required
  hintText="Must be at least 8 characters"
/>

// Destructive (error) state
<InputField
  label="Email"
  destructive
  hintText="Please enter a valid email address."
  defaultValue="invalid@"
/>

// With leading icon
<InputField
  inputType="icon-leading"
  leadingIcon={<SearchIcon />}
  placeholder="Search..."
/>

// With trailing button
<InputField
  inputType="trailing-button"
  trailingButton={<button>Copy</button>}
  defaultValue="https://example.com/share/abc123"
/>

// Leading text
<InputField
  inputType="leading-text"
  leadingText="https://"
  placeholder="yoursite.com"
/>

// Small size
<InputField size="sm" label="First name" placeholder="Jane" />
```

**Props:**

| Prop               | Type                | Default      | Description |
|--------------------|---------------------|--------------|-------------|
| `size`             | `"sm" \| "md"`      | `"md"`       | Size |
| `inputType`        | `"default" \| "icon-leading" \| "leading-dropdown" \| "trailing-dropdown" \| "leading-text" \| "trailing-button" \| "payment" \| "tags"` | `"default"` | Layout variant |
| `destructive`      | `boolean`           | `false`      | Error state (red border + focus ring) |
| `label`            | `string`            | —            | Field label |
| `required`         | `boolean`           | `false`      | Show asterisk |
| `hintText`         | `string`            | —            | Helper / error text |
| `leadingIcon`      | `React.ReactNode`   | —            | Icon inside left edge |
| `trailingIcon`     | `React.ReactNode`   | —            | Icon inside right edge |
| `leadingText`      | `string`            | —            | Text prefix (e.g. "https://") |
| `trailingButton`   | `React.ReactNode`   | —            | Button on right edge |
| `helpIcon`         | `boolean`           | `false`      | Show help (?) icon |
| `disabled`         | `boolean`           | `false`      | Disabled state |

---

## Design Tokens

All visual values are driven by CSS custom properties defined in `src/styles/tokens.css`. Override them in your project's CSS to theme the components:

```css
:root {
  --color-brand-600: #0070f3;  /* swap brand colour */
  --radius-md:       6px;       /* rounder or sharper corners */
}
```

---

## Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── Toggle/
│   │   ├── Toggle.tsx
│   │   └── index.ts
│   └── InputField/
│       ├── InputField.tsx
│       └── index.ts
├── styles/
│   └── tokens.css
├── utils/
│   └── cn.ts
└── index.ts
```

---

## Pushing to GitHub

```bash
git init
git add .
git commit -m "feat: initial component library from Figma Components-2"

# Create a repo on GitHub, then:
git remote add origin https://github.com/your-org/ui-kit.git
git branch -M main
git push -u origin main
```

After pushing, install from any project with:

```bash
npm install github:your-org/ui-kit
```

---

## Development

```bash
npm install
npm run build       # compile TypeScript
npm run dev         # watch mode
```

---

## Dependencies needed in consuming projects

```
react >= 18
tailwindcss >= 3
class-variance-authority
clsx
tailwind-merge
```

Add those to your consuming project's `package.json` as needed.
