import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Server-only Supabase client with the service-role key.
 * Bypasses Row Level Security -- use ONLY in:
 *  - API Route handlers (app/api/...)
 *  - Server Actions (app/.../actions.ts)
 *  - Server Components
 *
 * NEVER import this in files that run in the browser.
 */
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "[Medusa Barber] Missing Supabase server env vars.\n" +
        "Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local"
    );
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}
