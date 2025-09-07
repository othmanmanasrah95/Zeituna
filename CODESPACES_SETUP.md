# GitHub Codespaces Setup Guide

## The Problem
You're encountering `net::ERR_BLOCKED_BY_CLIENT` because GitHub Codespaces requires proper port forwarding configuration for your backend API to be accessible from the frontend.

## Solution Steps

### 1. Port Forwarding Setup
In your GitHub Codespace:

1. **Open the Ports tab** in VS Code (usually at the bottom of the sidebar)
2. **Forward port 7000** (your backend port):
   - Click "Add Port" or the "+" button
   - Enter `7000`
   - Set visibility to "Public" (so the frontend can access it)
   - Note the generated URL (something like `https://your-codespace-name-7000.githubpreview.dev`)

3. **Forward port 5173** (your frontend port):
   - Add port `5173`
   - Set visibility to "Public"
   - Note the generated URL (something like `https://your-codespace-name-5173.githubpreview.dev`)

### 2. Environment Configuration

#### Option A: Use Environment Variables (Recommended)
Create a `.env` file in your `Client` directory:

```bash
# In Client/.env
VITE_API_URL=https://your-codespace-name-7000.githubpreview.dev/api
```

Replace `your-codespace-name-7000` with your actual Codespace port URL.

#### Option B: Manual URL Update
If you prefer not to use environment variables, the code will automatically detect Codespaces and construct the API URL, but you may need to verify the URL construction.

### 3. Start Your Services

1. **Start the backend** (in the `backend` directory):
   ```bash
   cd backend
   npm run dev
   ```
   You should see: `🚀 Server running in development mode on port 7000`

2. **Start the frontend** (in the `Client` directory):
   ```bash
   cd Client
   npm run dev
   ```

### 4. Verify the Setup

1. **Check the browser console** for the API URL logs:
   - Open browser dev tools (F12)
   - Look for logs like:
     ```
     🔗 API URL configured as: https://your-codespace-name-7000.githubpreview.dev/api
     🌐 Current hostname: your-codespace-name-5173.githubpreview.dev
     🔍 Is Codespace detected: true
     ```

2. **Test the login** - the `ERR_BLOCKED_BY_CLIENT` error should be resolved.

### 5. Troubleshooting

#### If you still get CORS errors:
- Make sure both ports (7000 and 5173) are set to "Public" visibility
- Check that the backend is running and accessible at the forwarded URL
- Verify the API URL in the browser console matches your forwarded port URL

#### If the automatic URL detection doesn't work:
- Manually set the `VITE_API_URL` environment variable
- Or update the API URL construction logic in `Client/src/config/api.ts`

#### If you get "Connection refused":
- Ensure the backend server is running on port 7000
- Check that port 7000 is properly forwarded and set to "Public"

## What We Fixed

1. **Backend Configuration**: Updated `server.js` to listen on `0.0.0.0` instead of just `localhost`
2. **Frontend API Configuration**: Added automatic Codespace detection and URL construction
3. **CORS Configuration**: Updated to allow requests from GitHub Codespaces domains
4. **Debugging**: Added console logs to help troubleshoot API URL configuration

## Next Steps

After following this guide:
1. Your login should work without the `ERR_BLOCKED_BY_CLIENT` error
2. You can remove the debug console logs from `api.ts` if desired
3. Consider setting up environment variables for different deployment environments
