# Zeituna MVP

A modern web application built with React, TypeScript, and Vite for managing and promoting tree adoption and planting initiatives.

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx

## 📁 Project Structure

```
zeituna-mvp/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── pages/         # Page components
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── public/            # Static assets
└── [config files]     # Various configuration files
```

## 🛠️ Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 🌟 Features

### Authentication

- User registration and login
- Protected routes
- User profile management

### Marketplace

- Browse products
- Product details view
- Shopping cart functionality

### Roots Program

- Tree adoption program
- Tree planting initiatives
- Tree detail pages

### Admin Dashboard

- Administrative interface
- User management
- Content management

## 🛣️ Routes

- `/` - Home page
- `/marketplace` - Product marketplace
- `/marketplace/product/:id` - Individual product details
- `/roots` - Roots program overview
- `/roots/adopt` - Tree adoption page
- `/roots/plant` - Tree planting page
- `/roots/tree/:id` - Individual tree details
- `/login` - User login
- `/register` - User registration
- `/profile` - User profile
- `/cart` - Shopping cart
- `/admin/*` - Admin dashboard

## 🧰 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

The project uses ESLint for code linting and follows TypeScript best practices. The configuration can be found in `eslint.config.js`.

## 🎨 Styling

The project uses Tailwind CSS for styling, configured in `tailwind.config.js`. The configuration includes:

- Custom color schemes
- Responsive design utilities
- Component-specific styles

## 🔒 Security

- Authentication is handled through a custom AuthContext
- Protected routes for authenticated users
- Secure cart management through CartContext

## 📱 Responsive Design

The application is built with a mobile-first approach using Tailwind CSS, ensuring a consistent experience across all device sizes.
