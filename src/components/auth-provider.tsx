"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export type UserRole = "guest" | "user" | "seller";

export type SellerItem = {
  id: string;
  name: string;
  description: string;
  price: string;
};

type AuthContextValue = {
  role: UserRole;
  sellerItems: SellerItem[];
  login: (role: Exclude<UserRole, "guest">) => void;
  logout: () => void;
  addSellerItem: (item: Omit<SellerItem, "id">) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ROLE_KEY = "handcrafted-haven-role";
const ITEMS_KEY = "handcrafted-haven-seller-items";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window === "undefined") {
      return "guest";
    }

    const savedRole = window.localStorage.getItem(ROLE_KEY);
    return savedRole === "user" || savedRole === "seller" ? savedRole : "guest";
  });

  const [sellerItems, setSellerItems] = useState<SellerItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedItems = window.localStorage.getItem(ITEMS_KEY);

    if (!savedItems) {
      return [];
    }

    try {
      return JSON.parse(savedItems) as SellerItem[];
    } catch {
      window.localStorage.removeItem(ITEMS_KEY);
      return [];
    }
  });

  const login = (nextRole: Exclude<UserRole, "guest">) => {
    setRole(nextRole);
    window.localStorage.setItem(ROLE_KEY, nextRole);
  };

  const logout = () => {
    setRole("guest");
    window.localStorage.removeItem(ROLE_KEY);
  };

  const addSellerItem = (item: Omit<SellerItem, "id">) => {
    setSellerItems((currentItems) => {
      const nextItems = [
        ...currentItems,
        {
          id: `${item.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
          ...item,
        },
      ];

      window.localStorage.setItem(ITEMS_KEY, JSON.stringify(nextItems));
      return nextItems;
    });
  };

  const value = useMemo(
    () => ({
      role,
      sellerItems,
      login,
      logout,
      addSellerItem,
    }),
    [role, sellerItems],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
