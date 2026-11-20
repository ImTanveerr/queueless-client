import { cn } from "@/lib/utils";

export const inputStyles =
  "h-11 w-full rounded-lg border border-ink/25 bg-paper px-3 text-base text-ink placeholder:text-ink-soft/70 transition-colors hover:border-ink/50 aria-[invalid=true]:border-danger";

interface TextFieldProps extends Omit<React.ComponentProps<"input">, "name"> {
  name: string;
  label: string;
  error?: string;
  hint?: string;
}

/** Label + input + message. The input's id is its name, so keep names unique per form. */
export function TextField({ name, label, error, hint, className, ...inputProps }: TextFieldProps) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(inputStyles, className)}
        {...inputProps}
      />
      {error ? (
        <p id={`${name}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
