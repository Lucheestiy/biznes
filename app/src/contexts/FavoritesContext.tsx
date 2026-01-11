"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (companyId: number) => void;
  removeFavorite: (companyId: number) => void;
  isFavorite: (companyId: number) => boolean;
  toggleFavorite: (companyId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = "biznes_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch {
        // Invalid JSON, ignore
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const addFavorite = useCallback((companyId: number) => {
    setFavorites((prev) => {
      if (prev.includes(companyId)) return prev;
      return [...prev, companyId];
    });
  }, []);

  const removeFavorite = useCallback((companyId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== companyId));
  }, []);

  const isFavorite = useCallback(
    (companyId: number) => favorites.includes(companyId),
    [favorites]
  );

  const toggleFavorite = useCallback((companyId: number) => {
    setFavorites((prev) => {
      if (prev.includes(companyId)) {
        return prev.filter((id) => id !== companyId);
      }
      return [...prev, companyId];
    });
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
