import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ButtonSize      = "sm" | "md" | "lg" | "xl" | "2xl";
export type ButtonHierarchy =
  | "primary"
  | "secondary-color"
  | "secondary-gray"
  | "tertiary-color"
  | "tertiary-gray"
  | "link-color"
  | "link-gray";
export type ButtonIcon = "default" | "dot-leading" | "icon-only";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Visual size of the button */
  size?: ButtonSize;
  /** Visual hierarchy / colour treatment */
  hierarchy?: ButtonHierarchy;
  /** Icon slot variant */
  icon?: ButtonIcon;
  /** Optional leading icon node */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon node */
  trailingIcon?: React.ReactNode;
  /** Accessible label when icon-only */
  ariaLabel?: string;
}

// ---------------------------------------------------------------------------
// CVA variant map
// ---------------------------------------------------------------------------

const buttonVariants = cva(
  // Base
  [
    "inline-flex items-center justify-center gap-1 font-semibold font-body",
    "transition-colors duration-150 ease-in-out",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative",
  ],
  {
    variants: {
      hierarchy: {
        primary: [
          "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]",
          "border border-[var(--btn-primary-border)]",
          "shadow-[var(--shadow-xs-skeuomorphic)]",
          "hover:bg-[var(--btn-primary-bg-hover)] hover:border-[var(--btn-primary-border-hover)]",
          "focus-visible:shadow-[var(--shadow-xs-skeuomorphic),var(--shadow-focus-brand)]",
        ],
        "secondary-color": [
          "bg-[var(--btn-secondary-color-bg)] text-[var(--btn-secondary-color-fg)]",
          "border border-[var(--btn-secondary-color-border)]",
          "shadow-[var(--shadow-xs)]",
          "hover:bg-[var(--btn-secondary-color-bg-hover)] hover:border-[var(--btn-secondary-color-border-hover)]",
          "focus-visible:shadow-[var(--shadow-xs),var(--shadow-focus-brand)]",
        ],
        "secondary-gray": [
          "bg-[var(--btn-secondary-gray-bg)] text-[var(--btn-secondary-gray-fg)]",
          "border border-[var(--btn-secondary-gray-border)]",
          "shadow-[var(--shadow-xs)]",
          "hover:bg-[var(--btn-secondary-gray-bg-hover)] hover:border-[var(--btn-secondary-gray-border-hover)]",
          "focus-visible:shadow-[var(--shadow-xs),var(--shadow-focus-gray)]",
        ],
        "tertiary-color": [
          "bg-transparent text-[var(--btn-tertiary-color-fg)]",
          "border border-transparent",
          "hover:bg-[var(--color-brand-50)] hover:text-[var(--btn-tertiary-color-fg-hover)]",
          "focus-visible:shadow-[var(--shadow-focus-brand)]",
        ],
        "tertiary-gray": [
          "bg-transparent text-[var(--btn-tertiary-gray-fg)]",
          "border border-transparent",
          "hover:bg-[var(--color-gray-50)] hover:text-[var(--btn-tertiary-gray-fg-hover)]",
          "focus-visible:shadow-[var(--shadow-focus-gray)]",
        ],
        "link-color": [
          "bg-transparent text-[var(--color-brand-700)] underline-offset-4",
          "border border-transparent",
          "hover:text-[var(--color-brand-800)] hover:underline",
          "focus-visible:underline",
        ],
        "link-gray": [
          "bg-transparent text-[var(--color-text-tertiary)] underline-offset-4",
          "border border-transparent",
          "hover:text-[var(--color-text-secondary)] hover:underline",
          "focus-visible:underline",
        ],
      },
      size: {
        sm: ["text-sm leading-5 rounded-md"],
        md: ["text-sm leading-5 rounded-md"],
        lg: ["text-base leading-6 rounded-lg"],
        xl: ["text-base leading-6 rounded-lg"],
        "2xl": ["text-lg leading-7 rounded-xl"],
      },
      icon: {
        default:      "",
        "dot-leading": "",
        "icon-only":  "aspect-square",
      },
    },
    compoundVariants: [
      // ---- size × icon: padding ----
      // icon-only
      { size: "sm",  icon: "icon-only", class: "p-2" },
      { size: "md",  icon: "icon-only", class: "p-[10px]" },
      { size: "lg",  icon: "icon-only", class: "p-[11px]" },
      { size: "xl",  icon: "icon-only", class: "p-3" },
      { size: "2xl", icon: "icon-only", class: "p-[15px]" },
      // default / dot-leading
      { size: "sm",  icon: "default",      class: "px-[14px] py-2 gap-1" },
      { size: "sm",  icon: "dot-leading",  class: "px-[14px] py-2 gap-1" },
      { size: "md",  icon: "default",      class: "px-[14px] py-[10px] gap-1" },
      { size: "md",  icon: "dot-leading",  class: "px-[14px] py-[10px] gap-1" },
      { size: "lg",  icon: "default",      class: "px-[18px] py-[11px] gap-[6px]" },
      { size: "lg",  icon: "dot-leading",  class: "px-[18px] py-[11px] gap-[6px]" },
      { size: "xl",  icon: "default",      class: "px-5 py-3 gap-[6px]" },
      { size: "xl",  icon: "dot-leading",  class: "px-5 py-3 gap-[6px]" },
      { size: "2xl", icon: "default",      class: "px-7 py-4 gap-[10px]" },
      { size: "2xl", icon: "dot-leading",  class: "px-7 py-4 gap-[10px]" },
      // link sizes — no padded box
      { hierarchy: "link-color", size: "sm",  class: "px-0 py-0 text-sm" },
      { hierarchy: "link-color", size: "md",  class: "px-0 py-0 text-sm" },
      { hierarchy: "link-color", size: "lg",  class: "px-0 py-0 text-base" },
      { hierarchy: "link-color", size: "xl",  class: "px-0 py-0 text-base" },
      { hierarchy: "link-color", size: "2xl", class: "px-0 py-0 text-lg" },
      { hierarchy: "link-gray",  size: "sm",  class: "px-0 py-0 text-sm" },
      { hierarchy: "link-gray",  size: "md",  class: "px-0 py-0 text-sm" },
      { hierarchy: "link-gray",  size: "lg",  class: "px-0 py-0 text-base" },
      { hierarchy: "link-gray",  size: "xl",  class: "px-0 py-0 text-base" },
      { hierarchy: "link-gray",  size: "2xl", class: "px-0 py-0 text-lg" },
    ],
    defaultVariants: {
      hierarchy: "primary",
      size: "md",
      icon: "default",
    },
  }
);

// Icon size per button size
const iconSizeClass: Record<ButtonSize, string> = {
  sm:   "size-4",
  md:   "size-5",
  lg:   "size-5",
  xl:   "size-5",
  "2xl":"size-6",
};

// Dot size per button size
const dotSizeClass: Record<ButtonSize, string> = {
  sm:   "size-1.5",
  md:   "size-2",
  lg:   "size-2",
  xl:   "size-2.5",
  "2xl":"size-3",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      hierarchy = "primary",
      size = "md",
      icon = "default",
      leadingIcon,
      trailingIcon,
      ariaLabel,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const iconSize = iconSizeClass[size];
    const dotSize  = dotSizeClass[size];

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ hierarchy, size, icon }), className)}
        disabled={disabled}
        aria-label={icon === "icon-only" ? ariaLabel : undefined}
        {...props}
      >
        {/* Dot leading indicator */}
        {icon === "dot-leading" && (
          <span
            className={cn(dotSize, "rounded-full bg-current opacity-80 shrink-0")}
            aria-hidden="true"
          />
        )}

        {/* Leading icon */}
        {icon === "default" && leadingIcon && (
          <span className={cn(iconSize, "shrink-0")} aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        {/* Text content */}
        {icon !== "icon-only" && (
          <span className="px-0.5 whitespace-nowrap">{children}</span>
        )}

        {/* Icon-only */}
        {icon === "icon-only" && (
          <span className={cn(iconSize, "shrink-0")} aria-hidden="true">
            {children}
          </span>
        )}

        {/* Trailing icon */}
        {icon === "default" && trailingIcon && (
          <span className={cn(iconSize, "shrink-0")} aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
export type { ButtonProps as ButtonComponentProps };
