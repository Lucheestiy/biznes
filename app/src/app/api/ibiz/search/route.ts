import { NextResponse } from "next/server";
import { ibizSearch } from "@/lib/ibiz/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const region = searchParams.get("region");
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "24", 10);

  const data = await ibizSearch({
    query,
    region,
    offset: Number.isFinite(offset) ? offset : 0,
    limit: Number.isFinite(limit) ? limit : 24,
  });
  return NextResponse.json(data);
}

