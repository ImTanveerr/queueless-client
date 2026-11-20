/** State returned by every auth server action and read by `useActionState`. */
export interface ActionState {
  /** Form-level message, such as "Invalid email or password". */
  message?: string;
  /** Per-field messages keyed by input name. */
  fieldErrors?: Record<string, string[] | undefined>;
  /** Text inputs to put back after a failed submit (React clears uncontrolled fields). */
  values?: Record<string, string>;
}
