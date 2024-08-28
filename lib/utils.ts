import { ButtonProps } from "@/types/type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBgVariantStyle(variant: ButtonProps["bgVariant"]) {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-rose-500";
    case "success":
      return "bg-emerald-500";
    case "outline":
      return "bg-transparent border-neutral-300 !border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
}

export function getTextVariantStyle(variant: ButtonProps["textVariant"]) {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-rose-100";
    case "success":
      return "text-emerald-100";
    default:
      return "text-white";
  }
}
