import { NextResponse } from "next/server";
import { biznesGetCatalog } from "@/lib/biznes/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");
  const data = await biznesGetCatalog(region);
  return NextResponse.json(data);
}
