# LocalVault JSON Viewer Website

A lightweight, minimal browser-style JSON viewer website for your self-hosted LocalVault FastAPI backend.

## Features

- **Exact Browser JSON Viewer UI**: Full-screen dark theme (`#111111`), thin top toolbar (`#3b3b3b`), with white monospace typography (`Consolas`, 14px).
- **Dynamic Live Fetch**: Fetches the live root status response directly from the LocalVault FastAPI backend (`/`).
- **Pretty Print Toggle**: Functional checkbox allowing instant toggling between compact single-line JSON and 2-space indented formatted JSON without refetching.
- **Robust Error Handling**: Clean inline error display for network issues, HTTP errors, or backend offline states.
- **Vercel-Ready**: Clean Next.js 14 project configured for instant deployment on Vercel.

---

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create or edit `.env.local`:
```bash
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```
> **Note:** Do NOT include `/api/v1` in this URL. The website queries the root JSON endpoint (`/`).

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Vercel Deployment Instructions

### 1. Push to GitHub
Initialize git and push this folder to your GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit of LocalVault JSON viewer website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### 2. Import into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Select your repository and click **Import**.

### 3. Set Environment Variable in Vercel
In the **Environment Variables** section before deploying:
- **Key**: `NEXT_PUBLIC_BACKEND_URL`
- **Value**: Your public backend root URL (e.g., `https://vault.yourdomain.com` or `https://<tunnel-id>.trycloudflare.com`)

> **Important:** Do not append `/api/v1` to `NEXT_PUBLIC_BACKEND_URL`.

### 4. Deploy
Click **Deploy**. Vercel will build and deploy your website to a public URL (e.g., `https://your-project.vercel.app`).

---

## Backend CORS Configuration (FastAPI)

Your LocalVault backend already includes a regex allowing all `*.vercel.app` domains:
```python
CORS_ORIGIN_REGEX = r"^https:\/\/.*\.vercel\.app$"
```

If you bind a custom domain (e.g., `https://viewer.yourdomain.com`), ensure your domain is added to `CORS_ORIGINS` in your backend `.env` file:
```env
CORS_ORIGINS=["http://localhost:3000","https://viewer.yourdomain.com"]
```
