type OverviewItem = {
  label: string;
  value: string;
};

type OverviewProps = {
  title: string;
  description: string;
  stats: OverviewItem[];
};

export function Overview({ title, description, stats }: OverviewProps) {
  return (
    <section className="glass gradient-border rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Overview</p>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-slate-300 max-w-3xl">{description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="text-xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

