'use client';

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const schema = z.string().trim().email("Please enter a valid email address").max(255);

export function NewsletterForm({ source = "footer", tone = "light" }: { source?: string; tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setError(null);
    setState("loading");
    const { error: dbError } = await supabase.from("newsletter_subscribers").insert({ email: parsed.data.toLowerCase(), source });
    if (dbError && dbError.code !== "23505") {
      setState("idle");
      toast.error("We couldn't subscribe you right now. Please try again.");
      return;
    }
    setState("done");
    setEmail("");
    toast.success(dbError ? "You're already subscribed — thank you!" : "You're subscribed. Welcome to MSM insights!");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border p-1.5 pl-5 transition-colors focus-within:border-electric",
          dark ? "border-line-dark bg-ink-foreground/5" : "border-line bg-surface",
        )}
      >
        <label htmlFor={`nl-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`nl-${source}`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "done") setState("idle");
          }}
          placeholder="Your email address"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm outline-none",
            dark ? "text-ink-foreground placeholder:text-ink-foreground/40" : "placeholder:text-muted-foreground",
          )}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Subscribe"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-electric text-accent-foreground transition-colors hover:bg-primary disabled:opacity-60"
        >
          {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : state === "done" ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
        </button>
      </div>
      {error && <p className="mt-2 pl-5 text-xs text-destructive">{error}</p>}
    </form>
  );
}
