import fs from "fs";
import path from "path";
import { company } from "../../../lib/company";

export const metadata = {
  title: "Projects",
  description:
    "Technical projects and research prototypes from Marvlosphere Technologies — network simulation and visualization tools.",
};

// Each project is its own file in data/projects/*.json — see
// data/projects/README.md for the exact shape and why it's structured
// this way (so multiple contributors can each add one without touching
// this file or conflicting with each other).
function loadProjects() {
  const dir = path.join(process.cwd(), "data", "projects");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
    // `order` is optional — omit it and your project just sorts
    // alphabetically after any that do specify one.
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name));
}

export default function ProjectsPage() {
  const projects = loadProjects();

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Technical projects &amp; prototypes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Independent technical work from the {company.name} team —
            simulation and visualization tools built for research and
            learning, distinct from our commercial products.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ backgroundColor: `${p.color}1a` }}
              >
                {p.emoji}
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {p.tag}
              </p>
              <h2 className="mt-1 text-lg font-bold text-navy">{p.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {p.description}
              </p>
              <span
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: p.color }}
              >
                Open app
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-600">
            Source code for these projects is available on{" "}
            <a
              href="https://github.com/marvlosphere99-web/defense"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy underline underline-offset-2 hover:text-gold-dark"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
