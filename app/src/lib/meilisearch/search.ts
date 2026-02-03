import { getCompaniesIndex, isMeiliHealthy } from "./client";
import type { MeiliSearchParams, MeiliCompanyDocument } from "./types";
import type { BiznesCompanySummary, BiznesSearchResponse, BiznesSuggestResponse } from "../biznes/types";
import { BIZNES_CATEGORY_ICONS } from "../biznes/icons";

function documentToSummary(doc: MeiliCompanyDocument): BiznesCompanySummary {
  return {
    id: doc.id,
    source: doc.source,
    name: doc.name,
    address: doc.address,
    city: doc.city,
    region: doc.region,
    work_hours: {
      status: doc.work_hours_status || undefined,
      work_time: doc.work_hours_time || undefined,
    },
    phones_ext: doc.phones_ext || [],
    phones: doc.phones,
    emails: doc.emails,
    websites: doc.websites,
    description: doc.description,
    logo_url: doc.logo_url,
    primary_category_slug: doc.primary_category_slug,
    primary_category_name: doc.primary_category_name,
    primary_rubric_slug: doc.primary_rubric_slug,
    primary_rubric_name: doc.primary_rubric_name,
  };
}

export async function meiliSearch(params: MeiliSearchParams): Promise<BiznesSearchResponse> {
  const index = getCompaniesIndex();

  const filter: string[] = [];

  if (params.region) {
    filter.push(`region = "${params.region}"`);
  }
  if (params.categorySlug) {
    filter.push(`category_slugs = "${params.categorySlug}"`);
  }
  if (params.rubricSlug) {
    filter.push(`rubric_slugs = "${params.rubricSlug}"`);
  }

  const result = await index.search(params.query, {
    offset: params.offset || 0,
    limit: params.limit || 24,
    filter: filter.length > 0 ? filter : undefined,
    attributesToRetrieve: [
      "id", "source", "name", "description", "address", "city", "region",
      "phones", "phones_ext", "emails", "websites", "logo_url",
      "primary_category_slug", "primary_category_name",
      "primary_rubric_slug", "primary_rubric_name",
      "work_hours_status", "work_hours_time",
    ],
  });

  return {
    query: params.query,
    total: result.estimatedTotalHits || 0,
    companies: result.hits.map(documentToSummary),
  };
}

export async function meiliSuggest(params: {
  query: string;
  region?: string | null;
  limit?: number;
}): Promise<BiznesSuggestResponse> {
  const index = getCompaniesIndex();

  const filter: string[] = [];
  if (params.region) {
    filter.push(`region = "${params.region}"`);
  }

  const result = await index.search(params.query, {
    limit: params.limit || 8,
    filter: filter.length > 0 ? filter : undefined,
    attributesToRetrieve: [
      "id", "name", "address", "city",
      "primary_category_slug", "primary_category_name",
    ],
  });

  const suggestions: BiznesSuggestResponse["suggestions"] = result.hits.map(hit => ({
    type: "company" as const,
    id: hit.id,
    name: hit.name,
    url: `/company/${hit.id}`,
    icon: hit.primary_category_slug ? BIZNES_CATEGORY_ICONS[hit.primary_category_slug] || null : null,
    subtitle: hit.address || hit.city || "",
  }));

  return {
    query: params.query,
    suggestions,
  };
}

export { isMeiliHealthy };
