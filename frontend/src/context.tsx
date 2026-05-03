import { createContext, type ReactNode, useContext } from 'react';
import type { Organization, OrganizationMember, User } from './entities';
import { useCurrentInfo } from './hooks/useCurrentInfo.ts';

interface AppContextType {
  user?: User;
  member?: OrganizationMember;
  organization?: Organization;
  isStudent: boolean;
  isTeacher: boolean;
  isAdminOrOwner: boolean;
  isLoading: boolean;
  organizationNotResolved: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { user, member, organization, isLoading, organizationNotResolved } = useCurrentInfo();
  const ctx: AppContextType = {
    user,
    member,
    organization,
    isStudent: member?.role === 'STUDENT',
    isTeacher: member?.role === 'TEACHER',
    isAdminOrOwner: member?.role === 'ADMIN' || member?.role === 'OWNER',
    isLoading,
    organizationNotResolved,
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
