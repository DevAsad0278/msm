'use client';

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/site";
import { Field, inputClass } from "./form-field";
import { PillButton } from "./pill-button";

const opt = (max: number) => z.string().trim().max(max).optional().transform((v) => (v ? v : null));

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: opt(40),
  country: opt(80),
  company: opt(120),
  service: opt(80),
  budget: opt(80),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)").max(3000),
});

type Errors = Partial<Record<keyof z.input<typeof contactSchema>, string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(raw);
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
    const { error } = await supabase.from("contact_inquiries").insert(parsed.data);
    setLoading(false);
    if (error) {
      toast.error("We couldn't send your message. Please try again.");
      return;
    }
    form.reset();
    setSent(true);
    toast.success("Thank you! We'll be in touch soon.");
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[2rem] bg-surface p-10 shadow-soft">
        <CheckCircle2 className="size-10 text-electric" />
        <h3 className="font-display text-2xl font-semibold">Message received.</h3>
        <p className="text-muted-foreground">Thank you for reaching out to MSM. Our team will reply within 1–2 business days.</p>
        <button type="button" onClick={() => setSent(false)} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[2rem] bg-background p-6 md:grid-cols-2 md:p-8">
      <Field label="Name *" htmlFor="c-name" error={errors.name}><input id="c-name" name="name" className={inputClass} placeholder="Your full name" /></Field>
      <Field label="Email *" htmlFor="c-email" error={errors.email}><input id="c-email" name="email" type="email" className={inputClass} placeholder="you@company.com" /></Field>
      <Field label="Phone" htmlFor="c-phone" error={errors.phone}><input id="c-phone" name="phone" className={inputClass} placeholder="+92 ..." /></Field>
      <Field label="Country" htmlFor="c-country" error={errors.country}><input id="c-country" name="country" className={inputClass} placeholder="Pakistan" /></Field>
      <Field label="Company" htmlFor="c-company" error={errors.company} className="md:col-span-2"><input id="c-company" name="company" className={inputClass} placeholder="Company or brand name" /></Field>
      <Field label="Service required" htmlFor="c-service" error={errors.service}>
        <select id="c-service" name="service" className={inputClass} defaultValue="">
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Project budget" htmlFor="c-budget" error={errors.budget}>
        <select id="c-budget" name="budget" className={inputClass} defaultValue="">
          <option value="">Select a budget</option>
          {BUDGET_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Message *" htmlFor="c-message" error={errors.message} className="md:col-span-2">
        <textarea id="c-message" name="message" rows={5} className={inputClass} placeholder="Tell us about your goals, timeline and challenges" />
      </Field>
      <div className="md:col-span-2">
        <PillButton type="submit" size="lg" disabled={loading}>{loading ? "Sending..." : "Send Message"}</PillButton>
      </div>
    </form>
  );
}
