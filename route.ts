import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { checkRateLimit, extractIpFromRequest, retryAfterHeader } from "@/lib/rate-limit";
import { readJsonBody } from "@/lib/json-body";
import { isHoneypotTripped } from "@/lib/honeypot";
import { parseLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

/**
 * POST /api/v1/leads -- a demo request from the VGS APP page (/vgs).
 * Anonymous: size-capped, rate-limited per IP, hidden anti-bot field, strict
 * validation; stored in vgs_leads (service role only).
 */
export async function POST(request: NextRequest) {
  const limit = await checkRateLimit(`vgs-lead:ip:${extractIpFromRequest(request)}`, 5, 3600);
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: "Έχεις στείλει ήδη αρκετά αιτήματα. Δοκίμασε ξανά αργότερα." },
      { status: 429, headers: { "Retry-After": retryAfterHeader(limit) } }
    );
  }
  const parsed = await readJsonBody(request, 4_000);
  if (!parsed.ok) return NextResponse.json({ success: false, error: "Μη έγκυρο αίτημα." }, { status: parsed.reason === "too_large" ? 413 : 400 });
  // A bot filled the hidden field: answer like a success, store nothing.
  if (isHoneypotTripped(parsed.body)) return NextResponse.json({ success: true }, { status: 201 });

  const result = parseLead(parsed.body);
  if (!result.ok) return NextResponse.json({ success: false, error: result.error }, { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (createServerClient() as any).from("vgs_leads").insert(result.lead);
  if (error) {
    console.error("[v1/leads] insert failed:", JSON.stringify(error));
    return NextResponse.json({ success: false, error: "Το αίτημα δεν στάλθηκε. Δοκίμασε ξανά σε λίγο." }, { status: 500 });
  }
  return NextResponse.json({ success: true }, { status: 201 });
}
