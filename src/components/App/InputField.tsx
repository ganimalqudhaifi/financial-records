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
        className="block mb-1.5 text-sm font-medium text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-lg focus:outline-slate-500 placeholder:italic"
        type={type}
        id={id}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
