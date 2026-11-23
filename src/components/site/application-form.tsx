'use client';

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import type { Tables } from "@/lib/types";
import { Field, inputClass } from "./form-field";
import { PillButton } from "./pill-button";

const schema = z.object({
  position: z.string().trim().min(1, "Choose a position").max(120),
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().transform((v) => (v ? v : null)),
  portfolio_url: z.union([z.literal(""), z.string().trim().url("Enter a full link, e.g. https://...").max(500)]).optional().transform((v) => (v ? v : null)),
  cover_letter: z.string().trim().min(20, "Tell us a bit more (20+ characters)").max(4000),
});

type Errors = Partial<Record<keyof z.input<typeof schema>, string>>;
const GENERAL = "General application";

export function ApplicationForm({ jobs }: { jobs: Tables<"job_openings">[] }) {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form).entries()));
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setLoading(false);
    form.reset();
    setSent(true);
    toast.success("Application sent — thank you!");
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[2rem] bg-surface p-10 shadow-soft">
        <CheckCircle2 className="size-10 text-electric" />
        <h3 className="font-display text-2xl font-semibold">Application received.</h3>
        <p className="text-muted-foreground">Thank you for your interest in MSM. We review every application and will contact you if there's a fit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[2rem] bg-surface p-6 shadow-soft md:grid-cols-2 md:p-8">
      <Field label="Position *" htmlFor="a-pos" error={errors.position} className="md:col-span-2">
        <select id="a-pos" name="position" className={inputClass} defaultValue={GENERAL}>
          {jobs.map((j) => <option key={j.id} value={j.title}>{j.title}</option>)}
          <option value={GENERAL}>{GENERAL}</option>
        </select>
      </Field>
      <Field label="Name *" htmlFor="a-name" error={errors.name}><input id="a-name" name="name" className={inputClass} /></Field>
      <Field label="Email *" htmlFor="a-email" error={errors.email}><input id="a-email" name="email" type="email" className={inputClass} /></Field>
      <Field label="Phone" htmlFor="a-phone" error={errors.phone}><input id="a-phone" name="phone" className={inputClass} /></Field>
      <Field label="Portfolio / LinkedIn" htmlFor="a-url" error={errors.portfolio_url}><input id="a-url" name="portfolio_url" className={inputClass} placeholder="https://" /></Field>
      <Field label="Why MSM? *" htmlFor="a-cover" error={errors.cover_letter} className="md:col-span-2">
        <textarea id="a-cover" name="cover_letter" rows={5} className={inputClass} placeholder="Tell us about yourself and the work you love" />
      </Field>
      <div className="md:col-span-2">
        <PillButton type="submit" size="lg" disabled={loading}>{loading ? "Sending..." : "Submit Application"}</PillButton>
      </div>
    </form>
  );
}
