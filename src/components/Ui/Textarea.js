import { cn } from '@/lib/utils';

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 4,
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
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 text-black bg-gray-50 border rounded-lg transition duration-200 outline-none resize-none",
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