import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "destructive";
  message?: string;
}

export function Loader({ 
  size = "md", 
  variant = "default", 
  className,
  ...props 
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const variantClasses = {
    default: "border-blue-500",
    secondary: "border-gray-500",
    destructive: "border-red-500"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      

      {...props}
    />

  );
}