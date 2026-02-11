# Kean ACM Frontend

This is the frontend application for the Kean University ACM Chapter website. It is built using React, TypeScript, and Vite, styled with TailwindCSS.

## 🚀 Tech Stack

- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Linting:** [ESLint](https://eslint.org/)

## 🛠 Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: v18 or higher recommended.
- **npm**: Comes with Node.js.

## 📥 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YourUsername/ACM_Kean.git
   cd ACM_Kean/Kean_ACM
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root of the frontend directory (`Kean_ACM`) if one doesn't exist, and add necessary environment variables (e.g., API URI).
   ```env
   VITE_API_URI=http://localhost:5000
   ```

## 🏃‍♂️ Running the Project

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🏗 Building for Production

To build the app for production:

```bash
npm run build
```

This will generate a `dist` folder containing the compiled assets.

To preview the production build locally:

```bash
npm run preview
```

## 🧹 Linting

To check for code quality issues:

```bash
npm run lint
```

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (Modals, Cards, etc.)
├── context/        # React Context providing global state (Auth)
├── pages/          # Application pages (Home, About, Events, etc.)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main application component & routing
└── main.tsx        # Entry point
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

Built with ❤️ by the Kean ACM Team.
