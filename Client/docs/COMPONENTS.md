# Components and Contexts Documentation

## Contexts

### AuthContext (`src/contexts/AuthContext.tsx`)

The authentication context provides user authentication state and methods throughout the application.

**Features:**

- User authentication state management
- Login/logout functionality
- Protected route handling
- User session persistence

**Usage:**

```tsx
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { user, login, logout } = useAuth();
  // Use auth methods and state
}
```

### CartContext (`src/contexts/CartContext.tsx`)

The shopping cart context manages the user's shopping cart state and operations.

**Features:**

- Cart state management
- Add/remove items
- Update quantities
- Cart persistence
- Total calculation

**Usage:**

```tsx
import { useCart } from "../contexts/CartContext";

function MyComponent() {
  const { cart, addItem, removeItem, updateQuantity } = useCart();
  // Use cart methods and state
}
```

## Layout Components

### Header (`src/components/layout/Header.tsx`)

The main navigation header component that appears on all pages.

**Features:**

- Navigation menu
- User authentication status
- Shopping cart link
- Responsive design

### Footer (`src/components/layout/Footer.tsx`)

The main footer component that appears on all pages.

**Features:**

- Site navigation links
- Social media links
- Copyright information
- Responsive design

## Best Practices

1. **Component Organization**

   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Implement proper error boundaries
   - Follow React hooks best practices

2. **Context Usage**

   - Use contexts for global state management
   - Implement proper error handling
   - Include loading states
   - Provide clear documentation

3. **Styling**

   - Use Tailwind CSS utility classes
   - Maintain consistent spacing and typography
   - Follow mobile-first approach
   - Use semantic HTML elements

4. **Performance**
   - Implement proper memoization
   - Use lazy loading where appropriate
   - Optimize re-renders
   - Follow React best practices

## Component Development Guidelines

1. **File Structure**

   ```
   components/
   ├── layout/          # Layout components
   ├── ui/             # Reusable UI components
   ├── forms/          # Form-related components
   └── features/       # Feature-specific components
   ```

2. **Naming Conventions**

   - Use PascalCase for component names
   - Use camelCase for props and variables
   - Add appropriate file extensions (.tsx for components)

3. **Props Interface**

   ```tsx
   interface ComponentProps {
     requiredProp: string;
     optionalProp?: number;
     children?: React.ReactNode;
   }
   ```

4. **Error Handling**

   - Implement proper error boundaries
   - Use try-catch blocks where appropriate
   - Provide meaningful error messages
   - Handle edge cases

5. **Testing**
   - Write unit tests for components
   - Test edge cases
   - Mock external dependencies
   - Test user interactions
