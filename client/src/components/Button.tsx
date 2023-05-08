import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  submit?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  onClick?: VoidFunction;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  submit = false,
  secondary = false,
  tertiary = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`uppercase rounded-full font-bold p-2 px-8 hover:opacity-90 active:opacity-80 ${
        secondary
          ? "border border-orange-muted text-orange-muted"
          : tertiary
          ? "text-orange-muted"
          : "bg-orange-muted"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
