# Quick Start Guide

Get your portfolio running in 5 minutes!

## Step 1: Extract & Install

```bash
# Extract the zip file
unzip asdf-portfolio.zip
cd asdf-portfolio

# Install dependencies (takes 1-2 minutes)
npm install
```

## Step 2: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. You'll see your portfolio live!

## Step 3: Customize

### Basic Edits
- **Your Name**: Edit `src/components/Hero.tsx` line 10, change "asdf" to your name
- **About Text**: Edit `src/components/About.tsx` lines 35-45
- **Your Stats**: Edit `src/components/About.tsx` lines 19-22
- **Projects**: Edit `src/components/Projects.tsx` and update project details
- **Contact Email**: Edit `src/components/Contact.tsx` line 34

### Test Your Changes
Changes auto-reload in your browser. No restart needed!

## Step 4: Try the Features

Open the portfolio and click the **gear icon** (settings) in the top-right:

- **Themes**: Try all 4 themes (Matrix Green, Cyberpunk Blue, etc.)
- **Brightness**: Adjust screen brightness
- **Animation Intensity**: Control animation effects

All settings save automatically!

## Step 5: Build for Production

```bash
npm run build
```

Your production-ready files are now in the `dist/` folder.

## Deploy (Choose One)

### Option A: Vercel (Easiest - 2 minutes)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select your repo
4. Auto-deploys on push!

### Option B: Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git" → Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`

### Option C: GitHub Pages
```bash
npm run deploy
```

## File Locations for Common Edits

| What to Change | File | Lines |
|---|---|---|
| Your name | `src/components/Hero.tsx` | 10 |
| About text | `src/components/About.tsx` | 35-45 |
| Your stats | `src/components/About.tsx` | 19-22 |
| Skills/tools | `src/components/Skills.tsx` | 10-35 |
| Projects | `src/components/Projects.tsx` | 10-65 |
| Contact email | `src/components/Contact.tsx` | 34 |
| Colors/theme | `src/context/ThemeContext.tsx` | 9-32 |

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**npm install fails?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails?**
```bash
npm run typecheck  # Check for TypeScript errors
npm run lint      # Check for linting issues
```

## What You Get

✅ 10 animated components
✅ 4 professional themes
✅ Brightness & animation controls
✅ Mobile responsive
✅ Terminal aesthetic
✅ Contact form
✅ Project showcase
✅ Production-ready build

## Next Steps

1. Replace placeholder text with your info
2. Add your real projects & skills
3. Test on mobile (use DevTools)
4. Deploy to Vercel/Netlify
5. Share with potential clients!

## Getting Help

- Check `README.md` for detailed docs
- Review component code - well commented
- Check browser console for errors (F12)
- Verify file paths in imports

---

**You're all set!** Your portfolio is now ready to impress. 🚀
