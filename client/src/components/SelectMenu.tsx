import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SelectMenuProps {
  title: string;
  options: any;
  className?: string;
  pickStatus: (value: string) => void;
}

export default function SelectMenu({
  options,
  title,
  pickStatus,
}: SelectMenuProps) {
  const [selected, setSelected] = useState(options[1]);

  const onSelected = (value: any) => {
    setSelected(value);
    let selected = options.find((option: any) => option.name === value);
    console.log(selected.id);
    pickStatus(selected.id);
  };

  return (
    <div>
      <label
        htmlFor="name"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {title}
      </label>
      <select
        id="location"
        name="location"
        onChange={(e) => onSelected(e.target.value)}
        className="mt-2 block w-full rounded-md border-0 p-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="Canada"
      >
        {options.map((option: any) => {
          return (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
