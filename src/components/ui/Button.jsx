export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-foreground hover:bg-foreground-hover text-white shadow-lg hover:shadow-xl",
    danger: "bg-error hover:bg-error/90 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-background-secondary hover:bg-b-color text-primary border border-b-color",
  };

  return (
    <button
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer flex items-center justify-center active:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
