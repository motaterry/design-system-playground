# Quick Deploy Storybook to Vercel

## Easiest Method: Vercel Dashboard

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New Project"**

3. **Import your GitHub repository** (`design-system-playground`)

4. **Configure Project Settings:**
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build-storybook`
   - **Output Directory:** `storybook-static`
   - **Install Command:** `npm install`

5. **Click "Deploy"**

6. **After deployment, you'll get a URL like:**
   - `https://your-project-name.vercel.app`

7. **Optional - Add Custom Domain:**
   - Go to Project Settings → Domains
   - Add a custom domain like `storybook.yourdomain.com`

## Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy Storybook
vercel --prod
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (or Yes if you want to link)
- **Project name?** → `design-system-storybook` (or your choice)
- **Directory?** → `./`
- **Override settings?** → Yes
  - **Build Command:** `npm run build-storybook`
  - **Output Directory:** `storybook-static`

## Verify Build Works

Before deploying, test locally:

```bash
npm run build-storybook
```

This creates the `storybook-static` folder with all static files ready for deployment.

## Auto-Deploy on Git Push

Once connected to Vercel, every push to your main branch will automatically:
1. Build Storybook
2. Deploy to production
3. Update your public URL

## Your Storybook Will Include:

✅ All 12 component categories
✅ Interactive component demos
✅ Full documentation
✅ Design token previews
✅ Responsive examples

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Storybook Deployment Guide](https://storybook.js.org/docs/react/sharing/publish-storybook)

