'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createBrowserClient, getWixClient, loginWithRedirect, logout, isLoggedIn } from './wix-client';

type WixClient = ReturnType<typeof createBrowserClient>;

interface Member {
  _id: string;
  loginEmail?: string;
  profile?: {
    nickname?: string;
    photo?: {
      url?: string;
    };
  };
}

interface WixContextType {
  client: WixClient | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  member: Member | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const WixContext = createContext<WixContextType | undefined>(undefined);

export function WixProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<WixClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    async function initClient() {
      try {
        const wixClient = await getWixClient();
        setClient(wixClient);

        const loggedIn = isLoggedIn(wixClient);
        setIsAuthenticated(loggedIn);

        if (loggedIn) {
          try {
            const currentMember = await wixClient.members.getCurrentMember();
            setMember(currentMember.member as Member);
          } catch (e) {
            console.error('Failed to get current member:', e);
          }
        }
      } catch (error) {
        console.error('Failed to initialize Wix client:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initClient();
  }, []);

  const handleLogin = async () => {
    if (client) {
      await loginWithRedirect(client);
    }
  };

  const handleLogout = async () => {
    if (client) {
      await logout(client);
      setIsAuthenticated(false);
      setMember(null);
    }
  };

  return (
    <WixContext.Provider
      value={{
        client,
        isLoading,
        isAuthenticated,
        member,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </WixContext.Provider>
  );
}

export function useWix() {
  const context = useContext(WixContext);
  if (context === undefined) {
    throw new Error('useWix must be used within a WixProvider');
  }
  return context;
}
