import VgsFrame, { vgsContainer } from "./VgsFrame";

/*
 * /vgs/security -- how VGS APP protects shop and customer data, in plain
 * words for a barbershop owner. Every sentence here describes something the
 * application actually does (see the notes next to each item); nothing is
 * promised that the code does not enforce.
 */

const SECTIONS: Array<{ title: string; body: string; points: string[] }> = [
  {
    // lib/business-context.ts + every service filters by business; e2e/tenant.spec.ts
    title: "Κάθε κατάστημα βλέπει μόνο τα δικά του",
    body: "Τα στοιχεία κάθε καταστήματος είναι χωρισμένα από τα υπόλοιπα. Σε κάθε κίνηση, ο server ελέγχει σε ποιο κατάστημα ανήκεις, πριν δείξει ή αλλάξει οτιδήποτε.",
    points: [
      "Ένα κατάστημα δεν μπορεί να ανοίξει πελάτη, ραντεβού ή κριτική άλλου καταστήματος",
      "Αυτόματοι έλεγχοι το δοκιμάζουν ξανά σε κάθε αλλαγή του προγράμματος",
    ],
  },
  {
    // lib/auth/roles.ts
    title: "Ρόλοι για κάθε άτομο στο μαγαζί",
    body: "Ιδιοκτήτης, διευθυντής ή υπάλληλος. Ο καθένας βλέπει και αλλάζει μόνο όσα χρειάζεται για τη δουλειά του.",
    points: [
      "Ρυθμίσεις, ρόλοι και προσκλήσεις: μόνο ο ιδιοκτήτης",
      "Κάθε συνεργάτης μπαίνει με δικό του λογαριασμό, με πρόσκληση από εσένα",
      "Όταν φύγει κάποιος, τον αφαιρείς και χάνει αμέσως την πρόσβαση",
    ],
  },
  {
    // Supabase project region eu-central-1; RLS on with no anon/authenticated policies; HTTPS on the production host
    title: "Τα δεδομένα μένουν στην Ευρώπη",
    body: "Η βάση δεδομένων φιλοξενείται σε κέντρο δεδομένων στη Φρανκφούρτη της Γερμανίας, μέσα στην Ευρωπαϊκή Ένωση.",
    points: [
      "Η επικοινωνία με το πρόγραμμα γίνεται μόνο με κρυπτογραφημένη σύνδεση (HTTPS)",
      "Τα στοιχεία δεν διαβάζονται απευθείας απ' έξω: κάθε ανάγνωση περνά από το πρόγραμμα, που κάνει πρώτα τους ελέγχους",
    ],
  },
  {
    // Supabase Auth (hashed passwords), reset by e-mail link
    title: "Κωδικοί και είσοδος",
    body: "Οι κωδικοί δεν αποθηκεύονται ποτέ σε μορφή που μπορεί να διαβαστεί, ούτε από εμάς.",
    points: [
      "Η είσοδος γίνεται μέσα από καθιερωμένη υπηρεσία ταυτοποίησης",
      "Αν ξεχάσεις τον κωδικό, τον αλλάζεις με σύνδεσμο στο email σου",
    ],
  },
  {
    // audit_log, loyalty_ledger, gift_card_transactions, membership_visits (append-only)
    title: "Ιστορικό που δεν σβήνεται",
    body: "Κάθε σημαντική αλλαγή καταγράφεται: ποιος την έκανε, τι άλλαξε και πότε.",
    points: [
      "Πόντοι, δωροκάρτες και επισκέψεις συνδρομών γράφονται σε βιβλίο κινήσεων που δεν διορθώνεται κρυφά",
      "Ένα λάθος διορθώνεται με νέα, ορατή κίνηση, όχι με σβήσιμο",
    ],
  },
  {
    // rate limits on public endpoints; appointment overlap constraint (030)
    title: "Προστατευμένη σελίδα κράτησης",
    body: "Η σελίδα κράτησης είναι ανοιχτή σε όλους, γι' αυτό έχει δικές της προστασίες.",
    points: [
      "Όριο στις αιτήσεις, ώστε να μη γεμίσει το πρόγραμμα με ψεύτικες κρατήσεις",
      "Δύο ραντεβού δεν μπορούν να πέσουν στην ίδια ώρα στον ίδιο κουρέα· αυτό ελέγχεται μέσα στην ίδια τη βάση",
    ],
  },
  {
    // customers/actions.ts export & erase, email-preferences, 048 consent, reviews display name
    title: "Τα δικαιώματα των πελατών σου (GDPR)",
    body: "Τα στοιχεία των πελατών ανήκουν στο κατάστημα. Το πρόγραμμα σε βοηθά να κάνεις ό,τι ζητά ο νόμος όταν σου το ζητήσει ένας πελάτης.",
    points: [
      "Εξαγωγή όλων των στοιχείων ενός πελάτη σε αρχείο, με ένα κουμπί",
      "Διαγραφή των στοιχείων ενός πελάτη όταν το ζητήσει",
      "Κάθε email έχει σύνδεσμο για να διαλέξει ο πελάτης ποια μηνύματα θέλει",
      "Προσφορές στέλνονται μόνο σε όσους έχουν πει «ναι»",
      "Στις δημόσιες κριτικές φαίνεται μόνο το μικρό όνομα και το αρχικό του επωνύμου",
    ],
  },
];

export default function VgsSecurity() {
  return (
    <VgsFrame>
      <main id="main">
        <section className={`${vgsContainer} pb-16 pt-10 lg:pb-20 lg:pt-16`}>
          <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#5E6467]">Ασφάλεια</p>
          <h1 className="mt-4 max-w-[18ch] text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-black sm:text-[56px]">
            Ασφάλεια και προσωπικά δεδομένα
          </h1>
          <p className="mt-6 max-w-[60ch] text-[18px] leading-[1.65]">
            Στο πρόγραμμα κρατάς τα τηλέφωνα, τα email και το ιστορικό των πελατών σου. Εδώ εξηγούμε με απλά λόγια πώς τα
            προστατεύουμε.
          </p>
        </section>

        <section aria-label="Πώς προστατεύονται τα δεδομένα" className="border-t border-[#C5CBCD]">
          <div className={`${vgsContainer} divide-y divide-[#C5CBCD]`}>
            {SECTIONS.map((s) => (
              <article key={s.title} className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
                <h2 className="text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em] text-black lg:col-span-4">{s.title}</h2>
                <div className="lg:col-span-8">
                  <p className="max-w-[62ch] text-[17px] leading-[1.65]">{s.body}</p>
                  <ul className="mt-5 space-y-3 text-[16px] leading-[1.55]">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.55em] h-[7px] w-[7px] shrink-0 rotate-45 border border-black" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-black text-white" style={{ colorScheme: "dark" }}>
          <div className={`${vgsContainer} flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between`}>
            <div>
              <h2 className="text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em]">Έχεις ερώτηση για τα δεδομένα;</h2>
              <p className="mt-3 max-w-[50ch] text-[17px] leading-[1.6] text-white/75">
                Ρώτα μας στην παρουσίαση. Θα σου δείξουμε στην πράξη πού βρίσκεται το καθετί.
              </p>
            </div>
            <a
              href="/vgs#demo"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3.5 text-[16px] font-semibold text-black transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Κλείσε μια παρουσίαση
            </a>
          </div>
        </section>
      </main>
    </VgsFrame>
  );
}
