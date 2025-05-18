import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "search";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant = "default", ...props }, ref) => {
    if (variant === "search") {
      return (
        <div className="flex items-center w-full max-w-sm px-4 py-2 bg-gray-100 rounded-full shadow-sm">
          <Search className="w-5 h-5 text-black/70 mr-2" />
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-sm",
              className
            )}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
