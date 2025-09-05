import type { ChangeEvent } from "react";

interface LabelledInputType {
    id: string;
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
}

export function AuthInput({
    id,
    label,
    placeholder,
    onChange,
    type = "text",
    disabled = false,
    autoFocus = false,
    autoComplete,
}: LabelledInputType) {
    return (
        <div>
            <label 
                htmlFor={id}
                className="block mb-2 text-sm font-semibold text-black">
                    {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                required
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                ${
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
            />
        </div>
    );
}
