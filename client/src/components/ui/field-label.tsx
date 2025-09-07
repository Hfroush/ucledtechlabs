import React from "react";

type Props = React.PropsWithChildren<{
  htmlFor: string;
  required?: boolean;
  className?: string;
}>;

export function FieldLabel({ htmlFor, required, className, children }: Props) {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`inline-flex items-baseline gap-1 ${className || ""}`} 
      data-required={required ? "true" : "false"}
    >
      <span>{children}</span>
      {required && (
        <>
          <span aria-hidden="true" className="required-star text-red-600">*</span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  );
}