import { NextResponse } from "next/server";
import { ibizSuggest } from "@/lib/ibiz/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const region = searchParams.get("region");
  const limit = parseInt(searchParams.get("limit") || "8", 10);

  const data = await ibizSuggest({
    query,
    region,
    limit: Number.isFinite(limit) ? limit : 8,
  });
  return NextResponse.json(data);
}

