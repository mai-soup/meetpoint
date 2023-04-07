import { FC, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} !z-5 relative flex flex-col rounded-[20px] w-full max-w-[300px] bg-dark-grey bg-clip-border shadow-3xl shadow-shadow-500w-full !p-4 3xl:p-![18px]`}
    >
      <div className="h-full w-full">{children}</div>
    </div>
  );
};

export default Card;
