import { createClient, OAuthStrategy } from '@wix/sdk';
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


// Auth helper functions
export async function loginWithRedirect(client: ReturnType<typeof createBrowserClient>) {
  const oauthData = client.auth.generateOAuthData(
    `${window.location.origin}/auth/callback`
  );
  const { authUrl } = await client.auth.getAuthUrl(oauthData);
  // Store the OAuth data for callback handling
  sessionStorage.setItem('wix_oauth_data', JSON.stringify(oauthData));
  window.location.href = authUrl;
}

export async function logout(client: ReturnType<typeof createBrowserClient>) {
  Cookies.remove('wix_tokens');
  // Clear session and redirect to home
  window.location.href = '/';
}

export async function handleAuthCallback(client: ReturnType<typeof createBrowserClient>, code: string, state: string) {
  const oauthDataStr = sessionStorage.getItem('wix_oauth_data');
  if (!oauthDataStr) {
    throw new Error('OAuth data not found');
  }
  const oauthData = JSON.parse(oauthDataStr);
  const tokens = await client.auth.getMemberTokens(code, state, oauthData);
  Cookies.set('wix_tokens', JSON.stringify(tokens), { expires: 7 });
  sessionStorage.removeItem('wix_oauth_data');
  return tokens;
}

export function isLoggedIn(client: ReturnType<typeof createBrowserClient>) {
  return client.auth.loggedIn();
}
