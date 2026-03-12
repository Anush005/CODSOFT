# CODSOFT - Web Development Projects

A collection of 5 web development projects built with modern technologies including React, TypeScript, Vite, Tailwind CSS, and more.

## 📁 Project Structure

### TASK 1 - ChatBot Application
A conversational chatbot interface built with React and TypeScript.
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS
- **Features**: 
  - Real-time chat interface
  - Responsive design
  - Component-based architecture
- **Location**: `/TASK 1`

### TASK 2 - Web Application
A general-purpose web application with modern UI components.
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI
- **Features**:
  - Interactive components
  - Responsive layout
  - Modern styling
- **Location**: `/TASK 2`

### TASK 3 - Full-Stack Application with Supabase
An advanced web application with backend integration.
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Supabase, Playwright
- **Features**:
  - Backend integration
  - Database connectivity
  - Testing capabilities
  - Component library (Shadcn UI)
- **Location**: `/TASK 3`
- **Backend**: Supabase configuration in `/TASK 3/supabase/`

### TASK 4 - Bookshelf Application
An interactive bookshelf/library management application.
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI, Context API
- **Features**:
  - Book management system
  - Context-based state management
  - Responsive UI components
  - Type-safe implementation
- **Location**: `/TASK 4`

### TASK 5 - Face Detection Application
A web application with face detection capabilities using computer vision.
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Face Detection API
- **Features**:
  - Real-time face detection
  - Webcam integration
  - Face recognition display
  - Canvas rendering
  - Mobile-responsive design
- **Location**: `/TASK 5`

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or bun package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Anush005/CODSOFT.git
cd CODSOFT
```

2. **Navigate to a specific task**
```bash
cd "TASK 1"  # or TASK 2, TASK 3, etc.
```

3. **Install dependencies**
```bash
npm install
# or
bun install
```

4. **Start development server**
```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

## 📦 Common Commands

All projects use the same build system (Vite) and follow similar command patterns:

```bash
# Development
npm run dev          # Start development server
bun run dev         # Start development server with bun

# Building
npm run build       # Build for production
bun run build      # Build with bun

# Testing
npm run test       # Run tests with Vitest
bun run test       # Run tests with bun

# Linting
npm run lint       # Lint code with ESLint

# Type checking
npm run type-check # Check TypeScript types
```

## 🛠️ Technologies Used

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Shadcn UI** - High-quality React components
- **Radix UI** - Accessible component primitives

### State Management
- **React Context API** (TASK 4)

### Backend & Database
- **Supabase** (TASK 3) - PostgreSQL database and authentication

### Testing
- **Vitest** - Unit testing framework
- **Playwright** (TASK 1, TASK 3) - E2E testing

### Utilities
- **Zod** - TypeScript-first schema validation
- **ESLint** - Code linting

## 📝 Project Details

### TASK 1 & TASK 3: E2E Testing
Both projects include Playwright configuration for end-to-end testing:
```bash
npx playwright test
```

### TASK 3: Supabase Integration
To use TASK 3's backend features:
1. Set up a Supabase project at [supabase.com](https://supabase.com)
2. Configure environment variables
3. Update `/TASK 3/supabase/config.toml` with your settings

### TASK 5: Face Detection
The face detection application uses modern browser APIs:
- Canvas API for rendering
- Webcam access via browser permissions
- Real-time image processing

## 📂 Folder Structure

Each project follows a standard structure:
```
TASK X/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── assets/             # Images and static files
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css            # Global styles
├── public/                 # Static files
├── test/                   # Test files
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── README.md               # Project README
```

## 🔧 Configuration Files

Key configuration files in each project:
- `vite.config.ts` - Vite bundler configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - ESLint rules
- `components.json` - Shadcn UI configuration
- `postcss.config.js` - PostCSS plugins

## 📱 Browser Compatibility

All projects are compatible with:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for improvements.

## 📄 License

These projects are part of the CODSOFT internship program.

## 👤 Author

**Anush Pradhan**
- GitHub: [@Anush005](https://github.com/Anush005)
- Repository: [CODSOFT](https://github.com/Anush005/CODSOFT.git)

## 📞 Support

For issues and questions, please create an issue on the [GitHub repository](https://github.com/Anush005/CODSOFT/issues).

---

**Last Updated**: March 13, 2026

Happy coding! 🚀
