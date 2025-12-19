'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Lock, Chrome, AlertCircle, Sparkles, Loader2, Building2 } from 'lucide-react';

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/drafts';
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError('');

    try {
      await signIn('demo-login', {
        email,
        password,
        callbackUrl,
        redirect: true,
      });
    } catch {
      setLocalError('Invalid credentials. Use a demo email with password "demo"');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl });
  };

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    await signIn('microsoft-entra-id', { callbackUrl });
  };

  const demoAccounts = [
    { email: 'agent@demo.com', role: 'Support Agent' },
    { email: 'manager@demo.com', role: 'CS Manager' },
    { email: 'admin@demo.com', role: 'Admin' },
  ];

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            ATC
          </span>
        </div>
        <p className="text-muted-foreground">
          AI-Powered IT Support System
        </p>
      </div>

      {/* Error Message */}
      {(error || localError) && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-destructive font-medium">
              {error === 'OAuthAccountNotLinked'
                ? 'This email is already associated with another account.'
                : localError || 'An error occurred during sign in.'}
            </p>
          </div>
        </div>
      )}

      {/* Sign In Card */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-6 backdrop-blur-md">
        {/* Quick Demo Access - Primary for testing */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Quick Demo Access
          </p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={async () => {
                  setIsLoading(true);
                  await signIn('demo-login', {
                    email: account.email,
                    password: 'demo',
                    callbackUrl,
                    redirect: true,
                  });
                }}
                disabled={isLoading}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/50 text-sm transition-all disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {account.role === 'Support Agent' ? 'SA' : account.role === 'CS Manager' ? 'CM' : 'AD'}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-foreground font-medium block">{account.role}</span>
                    <span className="text-xs text-muted-foreground">{account.email}</span>
                  </div>
                </div>
                <span className="text-xs text-primary font-medium">Sign In →</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enterprise SSO Section - Coming Soon */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
            <Lock className="h-3 w-3" />
            Enterprise SSO
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Coming Soon</span>
          </p>
          <div className="space-y-2 opacity-50">
            {/* Microsoft Entra ID - Disabled */}
            <div
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#0078D4]/20 border border-[#0078D4]/30 cursor-not-allowed"
              title="Microsoft Entra ID SSO - Coming Soon"
            >
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-[#0078D4]" />
                <span className="text-foreground/70">Continue with Microsoft</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Configure in Azure AD</span>
            </div>

            {/* Google - Disabled */}
            <div
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-card border border-border cursor-not-allowed"
              title="Google OAuth - Coming Soon"
            >
              <div className="flex items-center gap-3">
                <Chrome className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground/70">Continue with Google</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Configure in GCP</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function SignInLoading() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            ATC
          </span>
        </div>
        <p className="text-muted-foreground">
          AI-Powered IT Support System
        </p>
      </div>
      <div className="glass-card rounded-lg border border-border bg-card/70 p-6 backdrop-blur-md flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Suspense fallback={<SignInLoading />}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
