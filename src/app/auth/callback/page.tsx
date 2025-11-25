'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient, handleAuthCallback } from '@/lib/wix-client';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function processCallback() {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError('Authentication was cancelled or failed. Please try again.');
        return;
      }

      if (!code || !state) {
        setError('Invalid callback parameters. Please try logging in again.');
        return;
      }

      try {
        const client = createBrowserClient();
        await handleAuthCallback(client, code, state);
        router.push('/');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Failed to complete authentication. Please try again.');
      }
    }

    processCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we authenticate your account.</p>
      </div>
    </div>
  );
}
