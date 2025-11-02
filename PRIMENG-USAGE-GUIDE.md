# PrimeNG Usage Guide for Your Portfolio

This guide explains how PrimeNG components have been integrated into your Angular portfolio to enhance its professional appearance.

## PrimeNG Components Used

### 1. Buttons

- **Component**: `p-button`
- **Usage**: Replaced standard HTML buttons with PrimeNG buttons for better styling and icons
- **Example**:
  ```html
  <p-button label="View My Work" icon="pi pi-briefcase" (onClick)="navigateToProjects()"></p-button>
  ```

### 2. Cards

- **Component**: `p-card`
- **Usage**: Enhanced project and contact sections with professional card layouts
- **Example**:
  ```html
  <p-card header="Project Title" subheader="Project Subtitle">
    <p>Project description...</p>
  </p-card>
  ```

### 3. Chips

- **Component**: `p-chip`
- **Usage**: Displayed technology tags in the projects section
- **Example**:
  ```html
  <p-chip label="Angular" styleClass="mr-2"></p-chip>
  ```

### 4. Input Components

- **Components**: `pInputText`, `pInputTextarea`
- **Usage**: Enhanced form inputs in the contact section with floating labels
- **Example**:
  ```html
  <span class="p-float-label">
    <input type="text" pInputText placeholder="Your Name" [(ngModel)]="name" />
    <label for="name">Your Name</label>
  </span>
  ```

### 5. Timeline

- **Component**: `p-timeline`
- **Usage**: Created a professional experience timeline
- **Example**:
  ```html
  <p-timeline [value]="events" align="alternate">
    <ng-template pTemplate="content" let-item>
      <p-card [header]="item.title">
        <p>{{ item.description }}</p>
      </p-card>
    </ng-template>
  </p-timeline>
  ```

## How to Add More PrimeNG Components

1. **Import the Module**: In your component TypeScript file, import the required module:

   ```typescript
   import { ButtonModule } from "primeng/button";
   ```

2. **Add to Imports**: Add the module to your component's imports array:

   ```typescript
   @Component({
     selector: 'app-example',
     imports: [ButtonModule],
     // ...
   })
   ```

3. **Use in Template**: Use the component in your HTML template:
   ```html
   <p-button label="Click Me"></p-button>
   ```

## Available PrimeNG Icons

PrimeNG comes with PrimeIcons, which provides a wide range of icons. Some useful icons for portfolios include:

- `pi pi-briefcase` - Projects/Work
- `pi pi-envelope` - Contact/Email
- `pi pi-github` - GitHub link
- `pi pi-external-link` - External links
- `pi pi-send` - Send/Submit
- `pi pi-user` - User/Profile
- `pi pi-calendar` - Date/Calendar
- `pi pi-map-marker` - Location

## Component Documentation

For detailed documentation on each component used:

- [Button](https://primeng.org/button)
- [Card](https://primeng.org/card)
- [Chip](https://primeng.org/chip)
- [InputText](https://primeng.org/inputtext)
- [Textarea](https://primeng.org/textarea)
- [Timeline](https://primeng.org/timeline)

## Additional Components You Can Use

You can easily add more PrimeNG components to enhance your portfolio:

- **Dialogs**: For project details modals
- **Charts**: To showcase skills or project metrics
- **DataTables**: For detailed project listings
- **ProgressBar**: To show skill levels
- **Carousel**: For project image galleries

To use any additional component:

1. Import it in your component file
2. Add it to the imports array
3. Use it in your template

## Styling

PrimeNG components automatically use the default theme. You can customize the appearance using CSS classes or by configuring themes.

For more information, visit [PrimeNG Documentation](https://primeng.org/).
