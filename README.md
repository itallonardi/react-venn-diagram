## React Venn Diagram

**React Venn Diagram** is an interactive and customizable Venn diagram component built with React and D3. This component allows you to create attractive and informative Venn diagrams for visualizing intersection data.

### Features

- **Interactive**: Smooth animations and interactions when hovering over circles.
- **Customizable**: Customize colors, labels, and circle sizes.
- **Responsive**: Automatically adjusts to different screen sizes.
- **Easy to Use**: Simple integration with existing React projects.

### Installation

Install the package via npm or Yarn:

```sh
npm install react-venn-diagram
# or
yarn add react-venn-diagram
```

### Basic Usage

Here's a basic example of how to use the component in your React project:

```typescript
import React from 'react';
import { VennDiagram } from 'react-venn-diagram';

const App: React.FC = () => {
  const data = { a: 10, b: 15, intersection: 5 };
  const width = 400;
  const height = 400;

  return (
    <div>
      <VennDiagram 
        data={data} 
        width={width} 
        height={height} 
      />
    </div>
  );
};

export default App;
```

### Props

- **data**: Object containing the values of `a`, `b`, and `intersection`. Example:
  ```typescript
  const data = { a: 10, b: 15, intersection: 5 };
  ```
- **width**: Width of the diagram. Example:
  ```typescript
  const width = 400;
  ```
- **height**: Height of the diagram. Example:
  ```typescript
  const height = 400;
  ```
- **labels** (optional): Custom labels for the groups and intersection. Example:
  ```typescript
  const labels = {
    labelA: 'Group A',
    labelB: 'Group B',
    labelIntersection: 'Intersection'
  };
  ```
- **colors** (optional): Custom colors for the circles and texts. Example:
  ```typescript
  const colors = {
    colorA: '#9467bd',
    colorB: '#2ca02c',
    fontColorA: 'white',
    fontColorB: 'white',
    fontColorIntersection: 'white'
  };
  ```

### Customization Examples

#### Color Customization

You can customize the colors of the circles and text using the `colors` property:

```typescript
const colors = {
  colorA: '#ff6347', // Color of circle A
  colorB: '#4682b4', // Color of circle B
  fontColorA: 'black', // Font color of circle A
  fontColorB: 'black', // Font color of circle B
  fontColorIntersection: 'gray' // Font color of the intersection
};
```

#### Label Customization

You can customize the labels of the groups and intersection using the `labels` property:

```typescript
const labels = {
  labelA: 'Sector A',
  labelB: 'Sector B',
  labelIntersection: 'Common Area'
};
```

### Contributing

Contributions are welcome! Feel free to open issues and pull requests.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### Links

- **[GitHub Repository](https://github.com/itallonardi/react-venn-diagram)**
- **[NPM Page](https://www.npmjs.com/package/react-venn-diagram)**

---