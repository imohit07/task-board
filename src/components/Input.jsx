export function Input({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  id,
  required,
  autoComplete,
  className = '',
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
  return (
    <div className={`input-group ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && ' *'}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={error ? 'input input-error' : 'input'}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="input-error-msg" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
