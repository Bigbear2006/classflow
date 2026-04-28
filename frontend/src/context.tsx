import { createContext, type ReactNode, useContext } from 'react';
import type { Organization, OrganizationMember, User } from './types.ts';
import { useCurrentInfo } from './hooks/useCurrentInfo.ts';

interface AppContextType {
  user: User;
  member: OrganizationMember;
  organization?: Organization;
  isLoading: boolean;
  isAdminOrOwner: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { user, member, organization, isLoading } = useCurrentInfo();
  const ctx: AppContextType = {
    user: user,
    member: member,
    organization: organization,
    isLoading: isLoading,
    isAdminOrOwner: member?.role === 'ADMIN' || member?.role === 'OWNER',
  };
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return ctx;
};
