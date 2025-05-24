import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect, useContext } from "react";


import dotenv from 'dotenv'
dotenv.config()

type UserRole = "user" | "admin";

interface AuthUser {
  role: UserRole;
  // Add more user fields as needed
}

export interface AuthContextType {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  loading: boolean;
}
export const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user/role`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
      if (!res.ok) throw new Error();
      const data = await res.json(); // { role: "admin" | "user", ... }
      setUser(data);
      console.log("role: ", user)
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
    const fetchAdmin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/role`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
      if (!res.ok) throw new Error();
      const data = await res.json(); // { role: "admin" | "user", ... }
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>  {
    if(!user)fetchAdmin();
    
    if(!user)fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};