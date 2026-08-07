# Vibe Coding Assessment – Development Workflow

## Requirement Analysis
- Read and understood the complete problem statement.
- Broke down the functional and non-functional requirements.
- Generated an initial Product Requirements Document (PRD) using ChatGPT to organize the implementation plan and workflows.

## Design & Planning
- UI/UX inspiration was gathered from Dribbble to create a clean and modern e-commerce interface.
- A detailed design specification document was refined using Claude.
- The project folder structure was planned based on the problem statement before implementation.

## Tech Stack
- React.js
- Tailwind CSS
- Framer Motion (for animations)

## Development Workflow
- Used Gemini (Antigravity) to scaffold the initial project structure and boilerplate components.
- Implemented and refined the application iteratively based on the PRD and design specifications.
- Customized and extended the generated code to satisfy the assessment requirements.

## How to Run the Project

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Install Dependencies
Run the unified dependency installer from the root directory:
```bash
npm run install-deps
```
*(Or install manually in both folders: `cd server && npm install` and `cd client && npm install`)*

### 2. Run in Development Mode
You can start both backend and frontend development servers concurrently:

- **Run Server (Backend API - Port 5000)**:
  ```bash
  cd server
  npm start
  ```

- **Run Client (React Frontend - Port 3000)**:
  ```bash
  cd client
  npm run dev
  ```

Open `http://localhost:3000` in your browser.

### 3. Run Production Build (Unified Single Server)
To build and run the complete full-stack application under a single server instance:
```bash
# Build the production bundle
npm run build

# Start the unified server (serves API & static React app on port 5000)
npm start
```

Access the application at `http://localhost:5000`.

> **Note on Standalone Client-Side Deployment**:
> For static client-only hosting (e.g. Vercel, Netlify, or GitHub Pages), the frontend includes an embedded JSON dataset fallback (`client/src/data/mockProducts.json`). If the Express backend server is offline or unavailable, the application automatically runs in **Client-Side Standalone Mode** with full multi-filtering functionality. To enable live Express backend API calls, run the backend server as described above.

## Functional Validation
The following features were implemented and verified:

- Sticky filter sidebar
- Multi-select category filtering
- Dual-range price slider
- Minimum star rating filter
- Instant filtering without a submit button
- Product sorting
- Empty state handling
- Reset filters functionality
- Responsive product grid

Functional validation and requirement verification were performed with assistance from Claude.

## Debugging & Testing
- Verified all functional requirements against the problem statement.
- Tested filter combinations and edge cases.
- Debugged UI and state management issues during development.
- Performed final validation before submission.

## AI-Assisted Development Tools

| Purpose | Tool Used |
|---------|-----------|
| Requirement planning / PRD | ChatGPT |
| Design document refinement | Claude |
| Initial project scaffolding | Gemini (Antigravity) |
| Functional validation & debugging assistance | Claude |
| UI inspiration | Dribbble |

## Notes
AI tools were used as development assistants for planning, scaffolding, validation, and documentation. The final architecture, implementation decisions, integration, customization, debugging, and testing were performed throughout the development process based on the assessment requirements.