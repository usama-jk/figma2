import React, { useId } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type InputSize        = "sm" | "md";
export type InputType        =
  | "default"
  | "icon-leading"
  | "leading-dropdown"
  | "trailing-dropdown"
  | "leading-text"
  | "trailing-button"
  | "payment"
  | "tags";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visual size */
  size?: InputSize;
  /** Input type variant */
  inputType?: InputType;
  /** Whether the field has a validation error */
  destructive?: boolean;
  /** Field label */
  label?: string;
  /** Whether the label shows a required asterisk */
  required?: boolean;
  /** Hint / helper text below the field */
  hintText?: string;
  /** Icon shown inside the left edge (icon-leading variant) */
  leadingIcon?: React.ReactNode;
  /** Icon shown inside the right edge */
  trailingIcon?: React.ReactNode;
  /** Text shown inside the left edge (leading-text variant, e.g. "https://") */
  leadingText?: string;
  /** Button shown on the right edge (trailing-button variant) */
  trailingButton?: React.ReactNode;
  /** Dropdown element on the left (leading-dropdown variant) */
  leadingDropdown?: React.ReactNode;
  /** Dropdown element on the right (trailing-dropdown variant) */
  trailingDropdown?: React.ReactNode;
  /** Whether to show the help icon on the right */
  helpIcon?: boolean;
  /** Help icon node — defaults to a "?" circle */
  helpIconNode?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// CVA
// ---------------------------------------------------------------------------

const inputWrapperVariants = cva(
  [
    "flex w-full items-center",
    "bg-[var(--color-bg-primary)]",
    "border border-[var(--color-border-primary)]",
    "rounded-md",
    "shadow-[var(--shadow-xs)]",
    "transition-colors duration-150 ease-in-out",
    "focus-within:border-[var(--color-border-brand)]",
    "focus-within:shadow-[var(--shadow-xs),var(--shadow-focus-brand)]",
    "has-[:disabled]:bg-[var(--color-bg-disabled)] has-[:disabled]:shadow-none",
  ],
  {
    variants: {
      size: {
        sm: "px-[14px] py-[8px] gap-2",
        md: "px-[14px] py-[10px] gap-2",
      },
      destructive: {
        true: [
          "border-[var(--color-border-error)]",
          "focus-within:border-[var(--color-border-error)]",
          "focus-within:shadow-[var(--shadow-xs),var(--shadow-focus-error)]",
        ],
      },
    },
    defaultVariants: { size: "md", destructive: false },
  }
);

const inputVariants = cva(
  [
    "flex-1 min-w-0 bg-transparent outline-none",
    "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)]",
    "disabled:cursor-not-allowed disabled:text-[var(--color-text-disabled)]",
  ],
  {
    variants: {
      size: {
        sm: "text-sm leading-5",
        md: "text-base leading-6",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// ---------------------------------------------------------------------------
// Default help icon (? circle)
// ---------------------------------------------------------------------------

const DefaultHelpIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="text-[var(--color-text-tertiary)]"
  >
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6.06 5.86a2 2 0 0 1 3.88.67c0 1.33-2 2-2 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="11.5" r=".75" fill="currentColor" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      size = "md",
      inputType = "default",
      destructive = false,
      label,
      required,
      hintText,
      leadingIcon,
      trailingIcon,
      leadingText,
      trailingButton,
      leadingDropdown,
      trailingDropdown,
      helpIcon,
      helpIconNode,
      className,
      id: externalId,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id          = externalId ?? generatedId;
    const hintId      = `${id}-hint`;

    const showLeadingAddon =
      inputType === "leading-dropdown" || inputType === "leading-text";
    const showTrailingAddon =
      inputType === "trailing-dropdown" || inputType === "trailing-button";

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        {/* Label */}
        {label && (
          <div className="flex items-center gap-0.5">
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium leading-5 text-[var(--color-text-secondary)]",
                disabled && "opacity-50"
              )}
            >
              {label}
            </label>
            {required && (
              <span
                className="text-sm leading-5 text-[var(--color-brand-600)]"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </div>
        )}

        {/* Input row */}
        <div
          className={cn(
            inputWrapperVariants({ size, destructive }),
            "overflow-hidden",
            // Remove padding when there's an addon group on the edges
            showLeadingAddon  && "pl-0",
            showTrailingAddon && "pr-0"
          )}
        >
          {/* Leading addons */}
          {inputType === "icon-leading" && leadingIcon && (
            <span className="shrink-0 text-[var(--color-text-tertiary)] size-5 flex items-center justify-center">
              {leadingIcon}
            </span>
          )}
          {inputType === "leading-dropdown" && (
            <div className="flex items-center border-r border-[var(--color-border-primary)] pr-2 mr-2 shrink-0">
              {leadingDropdown}
            </div>
          )}
          {inputType === "leading-text" && leadingText && (
            <span className="shrink-0 text-sm text-[var(--color-text-tertiary)] pl-[14px]">
              {leadingText}
            </span>
          )}

          {/* Actual input */}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-describedby={hintText ? hintId : undefined}
            aria-invalid={destructive ? "true" : undefined}
            className={cn(inputVariants({ size }))}
            {...props}
          />

          {/* Help icon (default) */}
          {helpIcon && !trailingIcon && !showTrailingAddon && (
            <span className="shrink-0 flex items-center justify-center ml-1">
              {helpIconNode ?? <DefaultHelpIcon />}
            </span>
          )}

          {/* Trailing icon */}
          {trailingIcon && (
            <span className="shrink-0 text-[var(--color-text-tertiary)] size-5 flex items-center justify-center">
              {trailingIcon}
            </span>
          )}

          {/* Trailing dropdown */}
          {inputType === "trailing-dropdown" && (
            <div className="flex items-center border-l border-[var(--color-border-primary)] pl-2 ml-2 shrink-0">
              {trailingDropdown}
            </div>
          )}

          {/* Trailing button */}
          {inputType === "trailing-button" && trailingButton && (
            <div className="border-l border-[var(--color-border-primary)] shrink-0 self-stretch flex items-center pl-3 ml-0">
              {trailingButton}
            </div>
          )}
        </div>

        {/* Hint text */}
        {hintText && (
          <p
            id={hintId}
            className={cn(
              "text-sm leading-5",
              destructive
                ? "text-[var(--color-text-error)]"
                : "text-[var(--color-text-tertiary)]"
            )}
          >
            {hintText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
