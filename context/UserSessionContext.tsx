// context/UserSessionContext.tsx
"use client";

import { createContext, useContext } from "react";

type User = {
  email: string;
  name: string;
  image: string;
};

const UserSessionContext = createContext<User | null>(null);

export function UserSessionProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return (
    <UserSessionContext.Provider value={user}>
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  return useContext(UserSessionContext);
}
