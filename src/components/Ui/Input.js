import { cn } from '@/lib/utils';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 text-black bg-gray-50 border rounded-lg transition duration-200 outline-none",
          error 
            ? "border-red-300 focus:ring-2 focus:ring-red-500" 
            : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}