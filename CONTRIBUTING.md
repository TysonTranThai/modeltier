# Contributing to ModelTier

Thank you for your interest in contributing to **ModelTier**! We welcome contributions from developers, researchers, designers, and AI practitioners worldwide.

## 🚀 How to Contribute

### Reporting Bugs & Requesting Features
- Search existing [GitHub Issues](https://github.com/TysonTranThai/modeltier/issues) before opening a new issue.
- Clearly describe the bug or feature request with steps to reproduce, expected behavior, and screenshots if applicable.

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TysonTranThai/modeltier.git
   cd modeltier
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Run tests**:
   ```bash
   npm test
   ```

5. **Typecheck & Linting**:
   ```bash
   npx tsc --noEmit
   npm run lint
   ```

6. **Build & Export**:
   ```bash
   npm run build
   ```

### Submitting a Pull Request
1. Create a descriptive feature branch (`git checkout -b feat/my-new-feature`).
2. Make your changes and commit with meaningful commit messages following Conventional Commits.
3. Ensure all tests pass (`npm test`).
4. Push your branch and open a Pull Request against `main`.

---

## 📜 Code Style & Principles
- **TypeScript**: Strict type definitions without `any` where possible.
- **Tailwind CSS**: Follow the custom dark palette (`#170C07`, `#FF6B35`, `#FFF6EE`).
- **Responsive Design**: Ensure mobile (360px+), tablet (768px+), and desktop layouts remain pixel-perfect.
- **Localization**: Maintain both Vietnamese (`vi`) and English (`en`) strings in `src/data/i18n.ts`.

Thank you for building a better, more accessible AI benchmarking platform!
