import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { User } from '@/graphql/generated/schema';
import { useProfileQuery } from "@/graphql/User/generated/Profile.generated";
import Loading from '@/shared/components/Loading';

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
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: PropsUserProvider) => {
  const [user, setUser] = useState<User | null>(null);
  // const {data, loading, error} = useProfileQuery();

  // useEffect(() => {
  //   if (data && data.profile) {
  //     const userProfile: User = {
  //       ...data.profile,
  //       bookings: [],
  //       reviews: [],
  //     };
  //     setUser(userProfile);
  //   } else if (error) {
  //     console.error('Error fetching user profile:', error);
  //   }
  // }, [data, error]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
