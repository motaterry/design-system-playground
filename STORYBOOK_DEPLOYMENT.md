# Storybook Deployment Guide

## Deploy Storybook to Vercel

### Option 1: Separate Vercel Project (Recommended)

1. **Build Storybook locally:**
   ```bash
   npm run build-storybook
   ```

2. **Create a new Vercel project:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your repository
   - Configure the project:
     - **Framework Preset:** Other
     - **Build Command:** `npm run build-storybook`
     - **Output Directory:** `storybook-static`
     - **Install Command:** `npm install`
   - Deploy!

3. **Custom Domain (Optional):**
   - In Vercel project settings, add a custom domain like `storybook.yourdomain.com`

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy Storybook
vercel --prod --cwd . --name your-storybook-project
```

### Option 3: GitHub Actions (Automated)

Create `.github/workflows/deploy-storybook.yml`:

```yaml
name: Deploy Storybook

on:
  push:
    branches: [main]
    paths:
      - 'stories/**'
      - 'components/**'
      - '.storybook/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build-storybook
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
          scope: ${{ secrets.VERCEL_ORG_ID }}
```

## Alternative: Netlify

1. **Build Storybook:**
   ```bash
   npm run build-storybook
   ```

2. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build-storybook"
     publish = "storybook-static"
   ```

3. **Deploy:**
   - Connect your GitHub repo to Netlify
   - Netlify will auto-detect the config and deploy

## Alternative: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add script to package.json:**
   ```json
   "deploy-storybook": "npm run build-storybook && gh-pages -d storybook-static"
   ```

3. **Deploy:**
   ```bash
   npm run deploy-storybook
   ```

## Current Setup

- ✅ Storybook builds successfully
- ✅ Output directory: `storybook-static`
- ✅ All components and stories configured
- ✅ Path aliases resolved

## Quick Deploy Commands

```bash
# Build Storybook
npm run build-storybook

# Deploy to Vercel (if using CLI)
vercel --prod

# Or use the Vercel dashboard for easier setup
```

