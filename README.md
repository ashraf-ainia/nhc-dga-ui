![Logo](https://i.ibb.co/6ZrRpQ6/logo.png)

## Definition

A React components library designed to streamline UI development by providing a set of reusable, accessible, and highly customizable components based on the DGA [design system](https://design.dga.gov.sa). <br/><br/>
Built with TypeScript by "NHC development team" for type safety and scalability, this library enables you to create modern, consistent, responsive user-friendly interfaces with minimal effort.

# [Demo](https://dgaui.vercel.app)

## Features

- A set of high-quality React components based on DGA design system.
- Implements components that adhere to the DGA design principles, ensuring consistency and usability.
- TypeScript support: full TypeScript integration for enhanced type safety and improved developer experience.
- Customizability: easily themeable and customizable to fit your specific project requirements.
- Responsive design: components are designed to work seamlessly across all screen sizes and devices.

## Install

```
npm install nhc-dga-ui
```

```
yarn add nhc-dga-ui
```

## Usage Example

```
import { Button, StatusTag } from 'nhc-dga-ui';

export default () => (
  <>
    <Button>Click me</Button>
    <StatusTag color="secondary">Secondary status</StatusTag>
  </>
);
```

## RTL

#### Theme override

By overriding the theme using ThemeProvider and setting its direction to rtl.

```
import {ThemeProvider, StatusTag} from "nhc-dga-ui";

export default () => (
    <ThemeProvider theme={{ direction: "rtl" }}>
        <StatusTag>status</StatusTag>
    </ThemeProvider>
  );

```

#### withRtl HOC

You can wrap any component by withRtl HOC to act as rtl;

```
import { withRtl } from 'nhc-dga-ui';

const MyComponent = () => (
    <StatusTag>status</StatusTag>
);

export default withRtl(MyComponent)
```

## Theme

#### Theme Override

All theme values are overridable by passing a theme object containing the override values.

e.g override the golden secondary color to the lavender color:

```
import { ThemeProvider, Button } from 'nhc-dga-ui';

export default () => (
    <ThemeProvider
    theme={{
      palette: {
        secondary: {
          25: "#FEFCFF",
          50: "#F9F5FA",
          100: "#F2E9F5",
          200: "#E1CCE8",
          300: "#CCADD9",
          400: "#A57BBA",
          500: "#80519F",
          600: "#6D428F",
          700: "#532D75",
          800: "#3D1D5E",
          900: "#281047",
          950: "#16072E",
          light: "#CCADD9",
          main: "#80519F",
          dark: "#532D75",
          contrastText: "#FFF",
        },
      },
    }}
  >
    <Button color="secondary">Button</Button>
  </ThemeProvider>
);

```

#### useTheme hook

To retrieve the theme object:

```
import { useTheme } from "nhc-dga-ui";

export default () => {
    const theme = useTheme();

    return (
        <p style={{color: theme.palette.primary[600]}}>Paragraph text colored from my custom theme</p>
    );
};
```

## Dev Storybook

```
npm install
```

```
npm run storybook
```
