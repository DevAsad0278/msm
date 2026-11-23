/** Renders simple article text: blank-line separated paragraphs, "## " headings and "- " list items. */
export function RichText({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-6 text-[1.05rem] leading-relaxed text-foreground/80">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const first = lines[0] ?? "";
        if (first.startsWith("## ")) {
          return (
            <div key={i} className="space-y-3">
              <h2 className="pt-4 font-display text-2xl font-semibold text-foreground">{first.slice(3)}</h2>
              {lines.slice(1).length > 0 && <p>{lines.slice(1).join(" ")}</p>}
            </div>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6">
              {lines.map((l, k) => <li key={k}>{l.slice(2)}</li>)}
            </ul>
          );
        }
        return <p key={i}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}
