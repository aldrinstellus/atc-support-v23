# 📋 Prerequisites

**System requirements and dependencies for Enterprise AI Support V14**

---

## Required Software

### Node.js  20+
**Required**: Yes
**Download**: https://nodejs.org/

```bash
# Check your Node version
node --version
# Required: v20.0.0 or higher
```

### npm (comes with Node.js)
```bash
# Check npm version
npm --version
# Required: v9.0.0 or higher
```

### Git
**Required**: Yes
**Download**: https://git-scm.com/

```bash
# Check Git version
git --version
# Required: v2.0.0 or higher
```

---

## Required Accounts & Services

### 1. Supabase (PostgreSQL Database)
**Required**: Yes
**Sign up**: https://supabase.com

**What you need**:
- Active Supabase project
- Database connection string (from Project Settings → Database)
- Both session pooler (port 5432) and transaction pooler (port 6543) URLs

**Setup steps**:
1. Create a new Supabase project
2. Wait for database provisioning (~2 minutes)
3. Go to Project Settings → Database
4. Copy the connection string
5. Add to `.env.local` as `DATABASE_URL`

---

## Optional Services

### 2. Anthropic Claude AI (Recommended)
**Required**: No (app works in demo mode without it)
**Sign up**: https://console.anthropic.com

**What you need**:
- Anthropic API key
- API keys start with `sk-ant-api03-`

**Get your API key**:
1. Go to https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Copy the key (shown only once!)
4. Add to `.env.local` as `ANTHROPIC_API_KEY`

**Without this**: The app will work with mock responses

### 3. Zoho Desk (Optional)
**Required**: No (for production integrations only)
**Sign up**: https://www.zoho.com/desk/

**What you need**:
- Zoho Desk organization
- OAuth credentials (Client ID, Client Secret, Refresh Token)
- Organization ID

**Setup steps**:
1. Go to https://api-console.zoho.com/
2. Create a new Self Client application
3. Generate OAuth tokens
4. Copy Client ID, Client Secret, Refresh Token, Org ID
5. Add all to `.env.local`

**Without this**: Zoho integration features will be disabled

### 4. Jira (Optional)
**Required**: No (for issue tracking integration only)
**Sign up**: https://www.atlassian.com/software/jira

**What you need**:
- Jira Cloud instance URL
- API token
- User email

**Without this**: Jira integration will be disabled

### 5. Dify AI Knowledge Base (Optional)
**Required**: No (for advanced knowledge base features)
**Sign up**: https://dify.ai/

**What you need**:
- Knowledge base ID
- API key
- Chat API key

**Without this**: Basic knowledge base features still work

---

## Development Tools (Recommended)

### Visual Studio Code
**Download**: https://code.visualstudio.com/

**Recommended Extensions**:
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Prisma (Prisma.prisma)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- TypeScript and JavaScript Language Features (built-in)

### Browser DevTools
- Chrome DevTools (built into Chrome)
- React Developer Tools extension
- Redux DevTools extension (optional)

### Terminal
- macOS: iTerm2 or built-in Terminal
- Windows: Windows Terminal or Git Bash
- Linux: Your preferred terminal emulator

---

## System Requirements

### Hardware
- **CPU**: 2+ cores recommended
- **RAM**: 4GB minimum, 8GB recommended
- **Disk**: 2GB free space for dependencies and build artifacts

### Operating System
- **macOS**: 10.15 (Catalina) or later
- **Windows**: 10 or later
- **Linux**: Ubuntu 18.04+, Debian 10+, or equivalent

### Network
- Internet connection required for:
  - npm package installation
  - API calls to external services
  - Database connection to Supabase
- Firewall must allow outbound HTTPS (port 443)

---

## Verification Checklist

Before proceeding with installation, verify:

```bash
# 1. Node.js version
node --version  # Should be v20.0.0 or higher

# 2. npm version
npm --version   # Should be v9.0.0 or higher

# 3. Git version
git --version   # Should be v2.0.0 or higher

# 4. Check available disk space
df -h .         # Should have 2GB+ free

# 5. Test npm registry access
npm ping        # Should return "Pong!"

# 6. Verify TypeScript is installable
npx -p typescript tsc --version  # Should work without errors
```

---

## Next Steps

Once all prerequisites are met:

1. ✅ **[Quick Start Guide](./QUICK-START.md)** - Get running in 5 minutes
2. ✅ **[Developer Setup](./DEVELOPER-SETUP.md)** - Complete setup with all integrations
3. ✅ **[First Run Checklist](./FIRST-RUN-CHECKLIST.md)** - Verify your installation

---

## Troubleshooting Prerequisites

### Node.js Version Too Old

**Solution**: Upgrade Node.js
```bash
# Using nvm (recommended)
nvm install 20
nvm use 20

# Or download from https://nodejs.org/
```

### npm Not Found

**Solution**: Reinstall Node.js (npm comes with Node)

### Git Not Found

**Solution**: Install Git
- macOS: `brew install git` (using Homebrew)
- Windows: Download from https://git-scm.com/
- Linux: `sudo apt-get install git` or `sudo yum install git`

### Insufficient Disk Space

**Solution**: Free up space
```bash
# Clean npm cache
npm cache clean --force

# Remove old node_modules
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```

### Cannot Access npm Registry

**Solution**: Check network/proxy settings
```bash
# Test connectivity
curl https://registry.npmjs.org/

# If behind a proxy, configure npm
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

---

## FAQ

### Q: Do I need all the optional services?
**A**: No! The app works with just Node.js and Supabase. Optional services add functionality:
- No Claude AI = Mock AI responses
- No Zoho = No ticket sync
- No Jira = No issue linking
- No Dify = No advanced knowledge base

### Q: Can I use a different database?
**A**: The app is designed for PostgreSQL via Supabase. While Prisma supports other databases, the schema is optimized for PostgreSQL features.

### Q: What about Docker?
**A**: Docker is optional for development. It's primarily for production deployment. See [Docker Deployment](../10-deployment/DOCKER-DEPLOYMENT.md).

### Q: Do I need VS Code?
**A**: No, any code editor works. VS Code is recommended because of excellent TypeScript and React support.

---

**Ready to proceed?** Head to the **[Quick Start Guide](./QUICK-START.md)** to get the app running in 5 minutes!
