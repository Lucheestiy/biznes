export interface Region {
  name: string;
  slug: string;
}

export const regions: Region[] = [
  { name: "Минск", slug: "minsk" },
  { name: "Минская область", slug: "minsk-region" },
  { name: "Брестская область", slug: "brest" },
  { name: "Витебская область", slug: "vitebsk" },
  { name: "Гомельская область", slug: "gomel" },
  { name: "Гродненская область", slug: "grodno" },
  { name: "Могилёвская область", slug: "mogilev" },
];

export const regionMapping: Record<string, string[]> = {
  minsk: ["minsk", "minsk-region"],
  "minsk-region": ["minsk", "minsk-region"],
  brest: ["brest"],
  vitebsk: ["vitebsk"],
  gomel: ["gomel"],
  grodno: ["grodno"],
  mogilev: ["mogilev"],
};

