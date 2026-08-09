"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const labelClass = "text-sm font-semibold text-genix-ink";
const controlClass =
  "w-full rounded-xl border border-genix-line bg-white px-4 py-3 text-sm text-genix-ink outline-none transition-colors focus:border-genix-orange focus:ring-2 focus:ring-genix-orange/15";

export function FieldWrap({
  label,
  required,
  error,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className={labelClass}>
        {label} {required && <span className="text-genix-orange">*</span>}
      </span>
      {children}
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
}

export function TextField({
  label,
  required,
  error,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean; error?: string }) {
  return (
    <FieldWrap label={label} required={required} error={error} className={className}>
      <input className={controlClass} required={required} {...rest} />
    </FieldWrap>
  );
}

export function SelectField({
  label,
  required,
  error,
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <FieldWrap label={label} required={required} error={error} className={className}>
      <select className={`${controlClass} appearance-none bg-white`} required={required} {...rest}>
        {children}
      </select>
    </FieldWrap>
  );
}

export function TextAreaField({
  label,
  required,
  error,
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; required?: boolean; error?: string }) {
  return (
    <FieldWrap label={label} required={required} error={error} className={className}>
      <textarea className={`${controlClass} min-h-27.5 resize-y`} required={required} {...rest} />
    </FieldWrap>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
  required,
  name,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  name?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-genix-charcoal/85">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        required={required}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded border-genix-line text-genix-orange focus:ring-genix-orange/30"
      />
      <span>{label}</span>
    </label>
  );
}
