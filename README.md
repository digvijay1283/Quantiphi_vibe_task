# AuraStore — E-Commerce Multi-Filter Sidebar Application

A full-stack e-commerce browsing interface built with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, and **Node.js (Express)** backend.

Features real-time combinatorial product filtering (categories, dual-handle price range, star ratings), live backend sorting, active filter pills, search bar, dark/light theme toggle, sticky filter sidebar, and an interactive shopping cart drawer.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite), Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js (In-memory seed dataset with service layer)
- **State & Architecture**: Single-pass combinatorial filtering service, debounced search & slider input hook

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

### 1. Install Dependencies

From the project root directory:
```bash
npm run install-deps
```

---

### 2. Running in Development Mode

Run the backend Express server and frontend Vite development server:

#### Terminal 1 — Backend Express API (Port 5000)
```bash
cd server
npm start
```

#### Terminal 2 — Frontend React App (Port 3000)
```bash
cd client
npm run dev
```

Open `http://localhost:3000` in your browser.

---

### 3. Single-Server Production Build

To build and run both the API and frontend static bundle on a single server:

```bash
# Build frontend static bundle
npm run build

# Start unified server on http://localhost:5000
npm start
```

Open `http://localhost:5000` in your browser.

---

## 📁 Project Structure

```text
Quantiphi_vibe/
├── client/                      # React (Vite) + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/          # UI Components (FilterSidebar, CartDrawer, etc.)
│   │   ├── context/             # ThemeContext (Dark/Light mode)
│   │   ├── hooks/               # useProductFilters state hook
│   │   ├── lib/                 # Shared motion presets & animations
│   │   ├── services/            # productApi fetch client
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── server/                      # Node.js + Express Backend Service
│   ├── data/                    # Master products JSON dataset
│   ├── controllers/             # productController HTTP handlers
│   ├── services/                # filterService & sortService logic
│   ├── routes/                  # Express API routes (/api/products)
│   └── server.js
├── package.json                 # Root package file for unified deployment
└── README.md
```
