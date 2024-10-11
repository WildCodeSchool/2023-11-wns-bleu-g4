import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { User } from "@/graphql/generated/schema";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface PropsUserProvider {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: PropsUserProvider) => {
  const [user, setUser] = useState<User | null>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
