import { Sprout } from "lucide-react";

export default function EmptyHistory() {
  return (
    <div className="rounded-2xl border border-dashed border-moss-200 bg-white/60 px-6 py-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-moss-50">
        <Sprout className="h-6 w-6 text-moss-400" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-bold text-moss-700">No plant diagnoses yet</p>
      <p className="mx-auto mt-1 max-w-[240px] text-xs leading-relaxed text-moss-600">
        Your first plant checkup will appear here — saved only on this device.
      </p>
    </div>
  );
}
