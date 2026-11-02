import { EmptyState } from "@/components/account/account-shell";
import { SavedIllustration } from "@/components/ui/illustrations";

export default function SavedPage() {
  return (
    <section>
      <h2 className="mb-4 text-h3 font-semibold tracking-tight text-ink">Saved</h2>
      <EmptyState
        art={<SavedIllustration />}
        title="Nothing saved yet"
        note="Tap the heart on a flight or stay to keep it here."
      />
    </section>
  );
}
