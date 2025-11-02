# PrimeNG Integration Guide

This guide explains how PrimeNG has been integrated into your Angular portfolio project and how to use it.

## Installation

PrimeNG and PrimeIcons have been installed as dependencies:

- primeng@19.1.4 (compatible with Angular 19)
- primeicons@7.0.0

## Configuration

The following configurations have been made:

1. **Styles**: PrimeNG styles have been added to `src/styles.scss`:

   ```scss
   @import "primeng/resources/themes/lara-light-blue/theme.css";
   @import "primeng/resources/primeng.css";
   @import "primeicons/primeicons.css";
   ```

2. **Routing**: A demo route has been added at `/primeng`

3. **Navigation**: A link to the PrimeNG demo has been added to the navbar

## Using PrimeNG Components

To use PrimeNG components in your Angular components:

1. **Import the required modules** in your component:

   ```typescript
   import { ButtonModule } from 'primeng/button';
   import { CardModule } from 'primeng/card';
   import { DividerModule } from 'primeng/divider';

   @Component({
     selector: 'app-example',
     standalone: true,
     imports: [ButtonModule, CardModule, DividerModule],
     // ...
   })
   ```

2. **Use the components** in your template:
   ```html
   <p-button label="Click me" icon="pi pi-check"></p-button>
   ```

## Available PrimeNG Components

You can explore all available PrimeNG components at: https://primeng.org/components

Some commonly used components include:

- Buttons
- Cards
- Data tables
- Forms
- Menus
- Charts
- Overlays

## Example Implementation

Check the `src/app/components/primeng-demo` folder for a working example that demonstrates:

- PrimeNG buttons with different styles
- PrimeNG cards with headers and footers
- PrimeNG dividers

## Adding More Components

To use additional PrimeNG components:

1. Import the specific module in your component:

   ```typescript
   import { DataTableModule } from "primeng/datatable";
   ```

2. Add it to your component imports:

   ```typescript
   @Component({
     // ...
     imports: [DataTableModule]
   })
   ```

3. Use it in your template according to the documentation.

## Documentation

For detailed documentation on each component, visit: https://primeng.org/
