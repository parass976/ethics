# asdf - Penetration Tester Portfolio

A cutting-edge, cybersecurity-themed portfolio website with live animations, theme customization, and professional pentester aesthetic.

## Features

- **Dynamic Background Animations**
  - Matrix rain effect with falling characters
  - Live network topology visualization with scanning nodes
  - Radar sweep animations and connection lines

- **Responsive Design**
  - Fully responsive across mobile, tablet, and desktop
  - Smooth scroll-triggered animations
  - Terminal-style aesthetic with monospace fonts

- **Theme System**
  - 4 professional themes: Matrix Green, Cyberpunk Blue, Neon Purple, Stealth Dark
  - Real-time brightness control (50-150%)
  - Animation intensity settings (Low/Medium/High)
  - Persistent preferences saved to localStorage

- **Interactive Sections**
  - Terminal-style hero with auto-typing effect
  - About section with stats and certifications
  - Skills showcase with tool categories and proficiency bars
  - Project showcase with severity badges
  - Contact form with encrypted transmission simulation
  - Smooth navigation and scroll effects

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context + localStorage

## Installation

### Prerequisites

- Node.js 16 or higher
- npm 7 or higher

### Setup Instructions

1. **Extract the project files**
   ```bash
   unzip asdf-portfolio.zip
   cd asdf-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   Output will be in the `dist` folder

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Customization

### Change Your Name/Title

Edit `src/components/Hero.tsx` and `src/components/About.tsx`:
- Replace `asdf` with your name
- Update terminal output in Hero section
- Modify about description and stats

### Update Contact Information

Edit `src/components/Contact.tsx`:
- Update email addresses
- Add social media links
- Modify contact form behavior

### Modify Project Information

Edit `src/components/Projects.tsx`:
- Add/remove project cards
- Update severity levels and descriptions
- Modify project tags and impact statements

### Customize Skills

Edit `src/components/Skills.tsx`:
- Add/remove tool categories
- Update proficiency bars
- Modify skill descriptions

### Add New Themes

Edit `src/context/ThemeContext.tsx`:
```typescript
const themes: Record<ThemeType, ThemeConfig> = {
  'your-theme': {
    name: 'your-theme',
    primary: '#hexcolor',
    secondary: '#hexcolor',
    accent: '#hexcolor',
    glow: 'from-color-600 to-color-400',
    background: '#hexcolor',
  },
};
```

## Project Structure

```
asdf-portfolio/
├── src/
│   ├── components/
│   │   ├── About.tsx         # About section
│   │   ├── Contact.tsx       # Contact form
│   │   ├── Footer.tsx        # Footer component
│   │   ├── Hero.tsx          # Hero section with terminal
│   │   ├── MatrixRain.tsx    # Matrix background animation
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── NetworkNodes.tsx  # Network visualization
│   │   ├── Projects.tsx      # Projects showcase
│   │   ├── Settings.tsx      # Settings panel
│   │   └── Skills.tsx        # Skills section
│   ├── context/
│   │   └── ThemeContext.tsx  # Theme management
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/
├── dist/                     # Production build (generated)
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

## Features Breakdown

### Themes

1. **Matrix Green** (Default)
   - Classic green terminal aesthetic
   - #00ff41 primary color
   - Best for professional/hacker vibes

2. **Cyberpunk Blue**
   - Cyan/blue neon theme
   - #00d4ff primary color
   - Modern, tech-forward feel

3. **Neon Purple**
   - Purple/pink aesthetic
   - #c84aff primary color
   - Bold, eye-catching appearance

4. **Stealth Dark**
   - Monochrome, minimal
   - White primary color
   - Professional, clean design

### Settings Panel

Access settings via the gear icon in the navbar:
- **Theme Selector**: Switch between 4 themes instantly
- **Brightness Control**: Adjust screen brightness (50-150%)
- **Animation Intensity**: Control animation complexity
  - Low: Minimal animations, best for slow devices
  - Medium: Standard animations
  - High: Full effects with all animations
- **Sound Effects**: Toggle sound effects (for future expansion)

All settings are automatically saved to localStorage.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and select your repository
4. Vercel will auto-detect Vite and configure it
5. Click "Deploy"

### Deploy to Netlify

1. Push your project to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git" and select your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy"

### Deploy to GitHub Pages

1. Add to `vite.config.ts`:
   ```typescript
   export default {
     base: '/your-repo-name/',
     // ... rest of config
   }
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type checking

### Adding New Components

1. Create component in `src/components/`
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Import in `App.tsx` if needed
5. Style with Tailwind CSS classes

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow green accent color scheme (#00ff41)
- Use monospace fonts (font-mono) for code/terminal text
- Maintain dark theme with backdrop blur effects
- Add hover states for interactivity

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Modern browsers with ES2020+ support required.

## Performance

- Optimized animations using `requestAnimationFrame`
- Canvas-based background animations for better performance
- Lazy loading for scroll-triggered animations
- Production build: ~60KB gzipped JavaScript

## Accessibility

- Semantic HTML
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast compliance
- Respects `prefers-reduced-motion` settings

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Build fails with "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Animations are laggy
- Reduce animation intensity in Settings (Low mode)
- Close other browser tabs
- Update your browser to latest version

### Changes not reflecting
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check browser console for errors

## License

This portfolio is open source and available for personal and commercial use.

## Support

For issues, questions, or suggestions, please check the code comments or review the component structure.

---

**Version**: 1.0.0
**Last Updated**: 2024
**Built with**: React, TypeScript, Tailwind CSS, Vite
