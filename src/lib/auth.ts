import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

// Demo users for development/testing
const DEMO_USERS = [
  {
    id: 'demo-agent-1',
    email: 'agent@demo.com',
    name: 'Demo Agent',
    role: 'SUPPORT_AGENT',
    image: null,
  },
  {
    id: 'demo-manager-1',
    email: 'manager@demo.com',
    name: 'Demo Manager',
    role: 'CS_MANAGER',
    image: null,
  },
  {
    id: 'demo-admin-1',
    email: 'admin@demo.com',
    name: 'Demo Admin',
    role: 'ADMIN',
    image: null,
  },
];

export const authConfig: NextAuthConfig = {
  providers: [
    // Google OAuth provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    // PRD 1.2.1: Microsoft Entra ID SSO Provider
    MicrosoftEntraID({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? '',
      // Use issuer for tenant-specific auth (tenantId is set via issuer URL)
      issuer: process.env.AZURE_AD_TENANT_ID
        ? `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0`
        : undefined,
      // Allow both work/school accounts and personal Microsoft accounts
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
    // Demo credentials provider for development
    Credentials({
      id: 'demo-login',
      name: 'Demo Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'agent@demo.com' },
        password: { label: 'Password', type: 'password', placeholder: 'demo' },
      },
      async authorize(credentials) {
        // Allow any demo login in development
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        // Check if it's a demo user
        if (password === 'demo') {
          const demoUser = DEMO_USERS.find((u) => u.email === email);
          if (demoUser) {
            return {
              id: demoUser.id,
              email: demoUser.email,
              name: demoUser.name,
              role: demoUser.role,
            };
          }
        }

        // Allow any email with 'demo' password in development
        if (process.env.NODE_ENV === 'development' && password === 'demo') {
          return {
            id: `user-${Date.now()}`,
            email: email,
            name: email.split('@')[0],
            role: 'SUPPORT_AGENT',
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || 'SUPPORT_AGENT';
      }
      // Store provider for reference
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
      const isOnDrafts = request.nextUrl.pathname.startsWith('/dashboard/drafts');
      const isOnAuth = request.nextUrl.pathname.startsWith('/auth');
      const isOnApi = request.nextUrl.pathname.startsWith('/api');
      const isOnDemo = request.nextUrl.pathname.startsWith('/demo');

      // Allow API routes (they have their own auth)
      if (isOnApi) return true;

      // Allow demo pages without auth
      if (isOnDemo) return true;

      // Allow auth pages
      if (isOnAuth) return true;

      // Protect dashboard routes
      if (isOnDashboard || isOnDrafts) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }

      // Allow all other routes
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
