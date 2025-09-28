# 🚀 Cyberpunk Portfolio - Deployment Guide

## 📋 Project Overview
Your cyberpunk-themed portfolio featuring:
- ✨ Next.js 14 with App Router
- 🎨 Tailwind CSS with custom cyberpunk theme
- 🚀 Framer Motion animations
- 📱 PWA capabilities
- 🔊 Web Audio API integration
- 📧 Contact form with API routes

## 🛠️ Pre-deployment Checklist
- [x] Project builds successfully (`npm run build`)
- [x] All dependencies optimized
- [x] PWA manifest configured
- [x] Service worker implemented
- [x] Contact form API ready

---

## 🌐 Deployment Options

### 1. 🔥 Vercel (Recommended - Easiest)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration needed
- Automatic deployments
- Excellent performance
- Built-in CDN

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click "New Project" and select your repository
4. Vercel auto-detects Next.js - just click "Deploy"
5. Your site will be live in ~2 minutes!

**Custom Domain:**
- Add your domain in Vercel dashboard → Project → Settings → Domains

---

### 2. 🌊 Netlify

**Steps:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Build settings are auto-configured from `netlify.toml`
6. Click "Deploy site"

**Features:**
- Form handling (perfect for your contact form)
- Custom domains
- SSL certificates

---

### 3. 📚 GitHub Pages (Static)

**Steps:**
1. Push code to GitHub repository
2. Go to repository → Settings → Pages
3. Source: GitHub Actions
4. The workflow file (`.github/workflows/deploy.yml`) will handle deployment
5. Site will be available at `https://yourusername.github.io/repository-name`

**Note:** Contact form won't work on GitHub Pages (static hosting)

---

### 4. 🔧 Self-Hosting (VPS/Server)

**Requirements:**
- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)

**Steps:**
1. Clone repository to your server
2. Install dependencies: `npm install`
3. Build project: `npm run build`
4. Install PM2: `npm install -g pm2`
5. Start application: `pm2 start npm --name "portfolio" -- start`
6. Configure Nginx as reverse proxy

---

## 🎯 Quick Start Commands

```bash
# Clone your repository
git clone https://github.com/Userinpeace/cyberpunk-portfolio.git
cd cyberpunk-portfolio

# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Export static files (for GitHub Pages)
npm run export
```

---

## 🔧 Environment Variables (Optional)

Create `.env.local` file for production:

```env
# Email Service (if you want to enable contact form)
RESEND_API_KEY=your_resend_key
# or
SENDGRID_API_KEY=your_sendgrid_key
# or
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

---

## 📝 Contact Form Setup

Your contact form is ready but needs an email service for production:

### Option 1: Resend (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to environment variables
4. Uncomment Resend code in `app/api/contact/route.ts`

### Option 2: EmailJS (Client-side)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Create service and template
3. Update contact form to use EmailJS

### Option 3: Netlify Forms
If deploying to Netlify, simply add `netlify` attribute to your form.

---

## 🎨 Customization

### Colors
Update cyberpunk theme in `app/globals.css`:
```css
:root {
  --primary: #00ffff;    /* Neon cyan */
  --secondary: #ec4899;  /* Neon pink */
  --background: #0a0a0f; /* Dark background */
}
```

### Content
Update your information in `app/page.tsx`:
- Name and title
- About section
- Projects
- Contact information

---

## 📊 Performance Optimizations

Your portfolio is already optimized with:
- ✅ Image optimization
- ✅ Code splitting
- ✅ PWA caching
- ✅ Minimal bundle size
- ✅ GPU-accelerated animations

---

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Build again
npm run build
```

### Contact Form Not Working
- Check API route at `/api/contact`
- Verify environment variables
- Check browser console for errors

---

## 🚀 Recommended Deployment

**For beginners:** Use Vercel - it's the easiest and most reliable.

**For advanced users:** 
- Vercel for automatic deployments
- Netlify for form handling features
- Self-hosting for complete control

---

## 📞 Support

If you need help with deployment:
1. Check the troubleshooting section
2. Review platform-specific documentation
3. Ensure all files are committed to Git

Your cyberpunk portfolio is ready to impress! 🔥