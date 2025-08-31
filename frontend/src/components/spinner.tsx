import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <LoaderCircle
      className={
        className
          ? cn("animate-spin w-5 h-5", className)
          : "animate-spin w-5 h-5"
      }
    />
  );
};

export default Spinner;
