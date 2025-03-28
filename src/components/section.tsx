type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-serif mb-6">{title}</h2>
      <div className="prose prose-lg mx-auto">{children}</div>
    </section>
  );
}
