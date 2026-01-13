import { getMeiliClient, COMPANIES_INDEX } from "./client";
import type { MeiliCompanyDocument } from "./types";

export async function configureCompaniesIndex(): Promise<void> {
  const client = getMeiliClient();

  // Create or get index
  try {
    await client.createIndex(COMPANIES_INDEX, { primaryKey: "id" });
  } catch {
    // Index may already exist
  }

  const index = client.index<MeiliCompanyDocument>(COMPANIES_INDEX);

  // Configure searchable attributes (order = priority)
  await index.updateSearchableAttributes([
    "name",
    "description",
    "about",
    "category_names",
    "rubric_names",
    "address",
    "city",
    "contact_person",
    "phones",
    "emails",
    "websites",
  ]);

  // Configure filterable attributes
  await index.updateFilterableAttributes([
    "region",
    "category_slugs",
    "rubric_slugs",
    "primary_category_slug",
    "source",
  ]);

  // Configure sortable attributes
  await index.updateSortableAttributes([
    "name",
  ]);

  // Configure ranking rules
  await index.updateRankingRules([
    "words",
    "typo",
    "proximity",
    "attribute",
    "sort",
    "exactness",
  ]);

  // Configure typo tolerance
  await index.updateTypoTolerance({
    enabled: true,
    minWordSizeForTypos: {
      oneTypo: 4,
      twoTypos: 8,
    },
  });

  // Configure synonyms (Russian business terms)
  await index.updateSynonyms({
    "ооо": ["общество с ограниченной ответственностью", "llc"],
    "оао": ["открытое акционерное общество"],
    "зао": ["закрытое акционерное общество"],
    "чуп": ["частное унитарное предприятие"],
    "ип": ["индивидуальный предприниматель"],
    "уп": ["унитарное предприятие"],
    "ремонт": ["починка", "восстановление"],
    "строительство": ["стройка", "строить"],
  });

  console.log("Meilisearch companies index configured");
}
