export default function ResearchPanel(){
  return (
    <section id="research" className="section bg-slate-900/40">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-xl h-64 md:h-80 bg-[url('/network.jpg')] bg-cover bg-center"></div>
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">Focused Neural Research</h2>
          <p className="mt-3 text-slate-300">
            We integrate distributed memory networks with real-time adaptive learning across clusters.
          </p>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>• Multi-node inference</li>
            <li>• Cross-domain reasoning</li>
            <li>• Context-aware autonomy</li>
          </ul>
          <a className="btn-primary inline-block mt-5" href="#research-papers">See Research</a>
        </div>
      </div>
    </section>
  );
}
