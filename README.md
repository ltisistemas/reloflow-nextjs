# 🚀 Reloflow

**[🇵🇧 Portuguese](./README.pt-BR.md) | 🇺🇸 English**

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![.NET](https://img.shields.io/badge/.NET%208-512BD4?style=for-the-badge&logo=.net)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)

## 📋 About the Project

Reloflow is a modern web application for kanban board management with secure authentication. The system consists of an innovative frontend built with Next.js and a robust backend built with C# .NET 8.

---

## 📸 Preview

<div align="center">
  <img src="screenshot/screen.png" alt="Reloflow Screenshot" width="100%" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

---

## 🛠️ Tech Stack

### Frontend (This Repository)

- **Next.js 16.1.6** - React framework with SSR/SSG
- **React 19.2.3** - Modern UI library
- **TypeScript 5** - Static typing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible components
- **dnd-kit** - Advanced drag & drop
- **Sonner** - Elegant notification system

### Backend

- **C# .NET 8** - Main framework
- **Entity Framework Core** - ORM for data access
- **Web API REST** - Service architecture
- **PostgreSQL** - Relational database

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm (or yarn/pnpm)
- **.NET 8 SDK** (for backend)
- **PostgreSQL** 12+ (for database)

### 1️⃣ Frontend Installation

```bash
# Clone the repository
git clone <your-repository>
cd reloflow-nextjs

# Install dependencies
npm install
```

### 2️⃣ Backend Setup

```bash
# Clone the backend repository
git clone <your-backend-repository>
cd your-backend

# Restore dependencies
dotnet restore

# Configure the database
dotnet ef database update

# Run the server
dotnet run
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root of the frontend project:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4️⃣ Running the Project

```bash
# Terminal 1 - Frontend (Next.js)
npm run dev
```

The frontend will be available at **http://localhost:3000**

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (private)/                # Protected routes
│   │   ├── home/                 # Main dashboard
│   │   └── kanban/               # Kanban manager
│   └── (public)/                 # Public routes
│       └── sign-in/              # Authentication page
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── hooks/                    # Custom hooks
│   └── sidebar/                  # Sidebar layout
├── lib/                          # Utilities and services
│   ├── http-client.ts            # Custom HTTP client
│   ├── utils.ts                  # Helper functions
│   ├── domain/                   # Domain models
│   ├── infrastructure/           # Infrastructure layer
│   └── application/              # Application logic
└── public/                       # Static assets
```

---

## 🔧 Available Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Run production build     |
| `npm run lint`  | Run ESLint linter        |
| `npm test`      | Run tests                |

---

## 🔗 Backend Integration

The frontend communicates with the backend via REST HTTP. Make sure that:

1. ✅ The .NET server is running on the configured port
2. ✅ The `NEXT_PUBLIC_API_URL` variable points to the correct server
3. ✅ The PostgreSQL database is accessible by the backend

### API Call Example

```typescript
// lib/http-client.ts - Pre-configured HTTP client
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/endpoint`);
```

---

## 🔐 Authentication

The system uses a secure credential-based authentication model. Check the security policies in the .NET backend.

---

## 📝 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test -- --coverage
```

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
npm run build
# Push to Vercel (automatic integration)
```

### Backend (.NET)

```bash
dotnet publish -c Release
```

---

## 🔄 Git Workflow

This repository follows a modern branching strategy:

### Feature Development

1. Create a new branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push the branch: `git push origin feature/your-feature`
4. **Automatic PR to `develop`** will be created by GitHub Actions

### Release Process

1. PR from `develop` to `main` is created automatically after merge
2. Ensure all tests pass before merging to production

---

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [dnd-kit Documentation](https://docs.dndkit.com)
- [.NET Documentation](https://docs.microsoft.com/dotnet)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core)

---

## 📄 License

This project is under a private license. All rights reserved © 2026

---

## 👥 Contributing

To contribute to this project:

1. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## 📞 Support

For questions and support:

- 📧 Email: support@reloflow.com
- 🐛 Issues: [GitHub Issues](https://github.com/ltisistemas/reloflow-nextjs/issues)

---

**Built with ❤️ by LTI Sistemas**
