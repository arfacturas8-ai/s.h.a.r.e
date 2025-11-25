import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { members } from '@wix/members';
import { groups } from '@wix/groups';
import Cookies from 'js-cookie';

const WIX_CLIENT_ID = process.env.NEXT_PUBLIC_WIX_CLIENT_ID!;

// Browser client using OAuth (for user-facing operations)
export function createBrowserClient() {
  const tokens = Cookies.get('wix_tokens');

  return createClient({
    modules: { items, members, groups },
    auth: OAuthStrategy({
      clientId: WIX_CLIENT_ID,
      tokens: tokens ? JSON.parse(tokens) : undefined,
    }),
  });
}

// Get or create Wix client with token refresh
export async function getWixClient() {
  const client = createBrowserClient();

  // Check if we have valid tokens
  const tokens = Cookies.get('wix_tokens');
  if (!tokens) {
    // Generate visitor tokens for anonymous users
    const visitorTokens = await client.auth.generateVisitorTokens();
    Cookies.set('wix_tokens', JSON.stringify(visitorTokens), { expires: 7 });
  }

  return client;
}

// Server client using API Key (for admin operations)
export function createServerClient() {
  const apiKey = process.env.WIX_API_KEY;

  if (!apiKey) {
    throw new Error('WIX_API_KEY is not configured');
  }

  return createClient({
    modules: { items, members, groups },
    auth: ApiKeyStrategy({
      apiKey,
      siteId: process.env.WIX_SITE_ID,
    }),
  });
}

// Auth helper functions
export async function loginWithRedirect(client: ReturnType<typeof createBrowserClient>) {
  const loginUrl = await client.auth.getLoginUrl({
    redirectUri: `${window.location.origin}/auth/callback`,
  });
  window.location.href = loginUrl;
}

export async function logout(client: ReturnType<typeof createBrowserClient>) {
  const logoutUrl = await client.auth.getLogoutUrl({
    redirectUri: window.location.origin,
  });
  Cookies.remove('wix_tokens');
  window.location.href = logoutUrl;
}

export async function handleAuthCallback(client: ReturnType<typeof createBrowserClient>, code: string, state: string) {
  const tokens = await client.auth.getMemberTokens(code, state);
  Cookies.set('wix_tokens', JSON.stringify(tokens), { expires: 7 });
  return tokens;
}

export function isLoggedIn(client: ReturnType<typeof createBrowserClient>) {
  return client.auth.loggedIn();
}
