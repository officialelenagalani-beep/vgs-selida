import VgsFrame, { vgsContainer } from "./VgsFrame";
import LegalText from "./LegalText";
import { LEGAL_DOCS, LEGAL_UPDATED, SUBPROCESSORS, type LegalDoc } from "@/lib/vgs-legal";

/** Sections after which the list of providers is shown. */
const PROVIDER_TABLE_AFTER = new Set(["/vgs/dpa#sub", "/vgs/privacy#recipients"]);

function Providers() {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
        <caption className="sr-only">Πάροχοι που επεξεργάζονται δεδομένα για το VGS APP</caption>
        <thead>
          <tr className="border-b border-black text-[13px] uppercase tracking-[0.08em] text-[#5E6467]">
            <th scope="col" className="py-2 pr-4 font-semibold">Πάροχος</th>
            <th scope="col" className="py-2 pr-4 font-semibold">Τι κάνει</th>
            <th scope="col" className="py-2 font-semibold">Πού</th>
          </tr>
        </thead>
        <tbody>
          {SUBPROCESSORS.map((p) => (
            <tr key={p.name} className="border-b border-[#C5CBCD] align-top">
              <th scope="row" className="py-3 pr-4 font-semibold text-black">{p.name}</th>
              <td className="py-3 pr-4">{p.role}</td>
              <td className="py-3">{p.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A legal page of the VGS site: title, date, contents, sections. */
export default function VgsLegal({ doc }: { doc: LegalDoc }) {
  const others = LEGAL_DOCS.filter((d) => d.path !== doc.path);
  return (
    <VgsFrame>
      <main id="main">
        <section className={`${vgsContainer} pb-10 pt-10 lg:pt-16`}>
          <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#5E6467]">Νομικά</p>
          <h1 className="mt-4 text-[38px] font-extrabold leading-[1.08] tracking-[-0.03em] text-black sm:text-[52px]">{doc.title}</h1>
          <p className="mt-5 max-w-[62ch] text-[18px] leading-[1.65]">
            <LegalText text={doc.intro} />
          </p>
          <p className="mt-4 text-[14px] text-[#5E6467]">Τελευταία ενημέρωση: {LEGAL_UPDATED}</p>
        </section>

        <div className={`${vgsContainer} grid gap-10 border-t border-[#C5CBCD] pb-20 pt-10 lg:grid-cols-12`}>
          <nav aria-label="Περιεχόμενα" className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="text-[14px] font-semibold text-black">Περιεχόμενα</p>
              <ol className="mt-3 space-y-2 text-[15px]">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-[#34383B] hover:text-black hover:underline">{s.title}</a>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-[14px] font-semibold text-black">Δείτε επίσης</p>
              <ul className="mt-3 space-y-2 text-[15px]">
                {others.map((d) => (
                  <li key={d.path}><a href={d.path} className="text-[#34383B] hover:text-black hover:underline">{d.title}</a></li>
                ))}
                <li><a href="/vgs/security" className="text-[#34383B] hover:text-black hover:underline">Ασφάλεια και δεδομένα</a></li>
              </ul>
            </div>
          </nav>

          <div className="min-w-0 space-y-12 lg:col-span-8">
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
                <h2 id={`${s.id}-h`} className="text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em] text-black">{s.title}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 max-w-[68ch] text-[17px] leading-[1.7]"><LegalText text={p} /></p>
                ))}
                {s.points && (
                  <ul className="mt-4 max-w-[68ch] space-y-3 text-[17px] leading-[1.65]">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.6em] h-[7px] w-[7px] shrink-0 rotate-45 border border-black" />
                        <span><LegalText text={p} /></span>
                      </li>
                    ))}
                  </ul>
                )}
                {PROVIDER_TABLE_AFTER.has(`${doc.path}#${s.id}`) && <Providers />}
                {s.after?.map((p) => (
                  <p key={p} className="mt-4 max-w-[68ch] text-[17px] leading-[1.7]"><LegalText text={p} /></p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
    </VgsFrame>
  );
}
