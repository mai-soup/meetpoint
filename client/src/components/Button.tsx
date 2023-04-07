import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  submit?: boolean;
};

const Button: FC<ButtonProps> = ({ children, submit }) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      className="uppercase bg-orange-muted rounded-full font-bold p-2 px-8 hover:opacity-90 active:opacity-80"
    >
      {children}
    </button>
  );
};

export default Button;
