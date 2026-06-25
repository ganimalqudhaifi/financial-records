interface SelectFieldProps {
  id: string;
  name: string;
  value: number;
  label: string;
  options: { id: number; name: string }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function SelectField({
  id,
  name,
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base text-slate-900 dark:text-slate-100 transition-colors duration-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
