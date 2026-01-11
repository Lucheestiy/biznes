"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface RegionContextType {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  regionName: string;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

const REGION_STORAGE_KEY = "biznes_selected_region";

const regionNames: Record<string, string> = {
  minsk: "Минск",
  "minsk-region": "Минская область",
  brest: "Брестская область",
  vitebsk: "Витебская область",
  gomel: "Гомельская область",
  grodno: "Гродненская область",
  mogilev: "Могилёвская область",
};

export function RegionProvider({ children }: { children: ReactNode }) {
  const [selectedRegion, setSelectedRegionState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(REGION_STORAGE_KEY);
    if (stored) {
      setSelectedRegionState(stored);
    }
    setIsInitialized(true);
  }, []);

  const setSelectedRegion = useCallback((region: string | null) => {
    setSelectedRegionState(region);
    if (region) {
      localStorage.setItem(REGION_STORAGE_KEY, region);
    } else {
      localStorage.removeItem(REGION_STORAGE_KEY);
    }
  }, []);

  const regionName = selectedRegion ? regionNames[selectedRegion] || selectedRegion : "Все регионы";

  if (!isInitialized) {
    return null;
  }

  return (
    <RegionContext.Provider value={{ selectedRegion, setSelectedRegion, regionName }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}
