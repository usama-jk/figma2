import React, { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToggleSize = "sm" | "md";
export type ToggleType = "default" | "slim";

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Visual size */
  size?: ToggleSize;
  /** Visual type */
  type?: ToggleType;
  /** Label text — shown to the right of the toggle */
  label?: string;
  /** Supporting text shown below the label */
  supportingText?: string;
  /** Controlled checked state */
  checked?: boolean;
  /** Default (uncontrolled) checked state */
  defaultChecked?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
}

// ---------------------------------------------------------------------------
// Dimensions from Figma
// ---------------------------------------------------------------------------

const trackDimensions: Record<
  ToggleSize,
  Record<ToggleType, { track: string; thumb: string }>
> = {
  sm: {
    default: { track: "w-9 h-5",    thumb: "size-4" },
    slim:    { track: "w-8 h-4",    thumb: "size-3" },
  },
  md: {
    default: { track: "w-11 h-6",   thumb: "size-5" },
    slim:    { track: "w-10 h-5",   thumb: "size-4" },
  },
};

const thumbTranslate: Record<ToggleSize, Record<ToggleType, string>> = {
  sm: { default: "translate-x-4", slim: "translate-x-4" },
  md: { default: "translate-x-5", slim: "translate-x-5" },
};

// ---------------------------------------------------------------------------
// CVA
// ---------------------------------------------------------------------------

const trackVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full p-0.5",
    "transition-colors duration-200 ease-in-out",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      checked: {
        true:  "bg-[var(--color-brand-600)]",
        false: "bg-[var(--color-bg-tertiary)]",
      },
    },
    defaultVariants: { checked: false },
  }
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = "md",
      type = "default",
      label,
      supportingText,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      className,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked    = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onCheckedChange?.(e.target.checked);
    };

    const { track, thumb } = trackDimensions[size][type];
    const translate        = isChecked ? thumbTranslate[size][type] : "translate-x-0";

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-start gap-3 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {/* Hidden native checkbox */}
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={isChecked}
          checked={isControlled ? isChecked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />

        {/* Track */}
        <span
          className={cn(
            trackVariants({ checked: isChecked }),
            track,
            "focus-within:shadow-[var(--shadow-focus-brand)]"
          )}
          aria-hidden="true"
        >
          {/* Thumb */}
          <span
            className={cn(
              thumb,
              "rounded-full bg-white",
              "shadow-[var(--shadow-sm)]",
              "transition-transform duration-200 ease-in-out",
              translate
            )}
          />
        </span>

        {/* Label + supporting text */}
        {(label || supportingText) && (
          <span className="flex flex-col gap-0.5">
            {label && (
              <span className="text-sm font-medium leading-5 text-[var(--color-text-secondary)] select-none">
                {label}
              </span>
            )}
            {supportingText && (
              <span className="text-sm font-normal leading-5 text-[var(--color-text-tertiary)] select-none">
                {supportingText}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";
