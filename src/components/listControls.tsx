import { useId } from 'react';
import { SORT_LABELS, type SortKey } from '../lib/listFilters';

export function SearchField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Titel durchsuchen…"
        className="w-full rounded-sm border border-brand-200 bg-white px-3 py-2
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      />
    </div>
  );
}

export function SortSelect({
  value,
  onChange,
  label = 'Sortierung',
  hideLabel = false,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
  label?: string;
  /** Hides the label visually; screen readers still announce it. */
  hideLabel?: boolean;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={hideLabel ? 'sr-only' : 'text-sm font-medium text-ink-muted'}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="rounded-sm border border-brand-200 bg-white px-3 py-2 text-base font-normal tracking-normal
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      >
        {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
          <option key={key} value={key}>
            {SORT_LABELS[key]}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ShowMoreButton({
  onClick,
  remaining,
}: {
  onClick: () => void;
  remaining: number;
}) {
  return (
    <div className="mt-6 flex justify-center">
      <button type="button" className="btn-secondary cursor-pointer" onClick={onClick}>
        Mehr anzeigen ({remaining} weitere)
      </button>
    </div>
  );
}
