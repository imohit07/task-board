export function Button({ children, variant = 'primary', type = 'button', disabled, onClick, className = '', ...props }) {
  const base = 'btn';
  const v = variant === 'danger' ? 'btn-danger' : variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  return (
    <button
      type={type}
      className={`${base} ${v} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
