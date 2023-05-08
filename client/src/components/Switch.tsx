import { FC, ReactNode } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type SwitchProps = {
  children: ReactNode;
  register: UseFormRegister<any>;
  inputName: string;
  validation?: RegisterOptions;
  className?: string;
  disabled: boolean;
};

const SwitchInput: FC<SwitchProps> = ({
  children,
  register,
  inputName,
  validation,
  className,
  disabled = false,
}) => {
  return (
    <label className={`text-xs group ${className}`}>
      <div
        className={`relative inline-block w-10 mr-2 align-middle select-none ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <input
          id={inputName}
          type="checkbox"
          {...register(inputName, validation)}
          disabled={disabled}
          className="peer absolute block w-6 h-6 rounded-full bg-off-white appearance-none cursor-pointer checked:right-0 text-opacity-0 focus:ring-transparent border-0 checked:bg-orange-muted checked:bg-none focus:text-orange-muted hover:text-orange-muted focus:ring-offset-transparent transition duration-200 ease-in"
        />
        <label
          htmlFor={inputName}
          className="toggle-label block overflow-hidden h-6 rounded-full bg-dark-grey cursor-pointer peer-checked:bg-orange-muted/50 transition duration-150 ease-in"
        ></label>
      </div>
      {children}
    </label>
  );
};

export default SwitchInput;
