interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  placeholder: string;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

export default function InputField({
  id,
  name,
  value,
  label,
  placeholder,
  type = "text",
  onChange,
  required,
}: InputFieldProps) {
  return (
    <div>
      <label
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        htmlFor={id}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        type={type}
        id={id}
        name={name}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
