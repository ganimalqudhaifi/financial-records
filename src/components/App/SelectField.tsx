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
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500"
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
