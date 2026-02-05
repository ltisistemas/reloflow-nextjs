import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function alert(message: string, type: "default" | "success" | "error" = "success") {
  const options = { position: "bottom-center" } as const;

  if (type === "success" || type === "error") {
    toast[type](message, options);
    return
  }

  toast(message, options);
}
