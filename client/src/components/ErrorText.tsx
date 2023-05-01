import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const ErrorText: FC<Props> = ({ children, className }) => {
  return (
    <p className={`text-orange-muted text-xs uppercase ${className}`}>
      {children}
    </p>
  );
};

export default ErrorText;
