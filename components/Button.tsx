import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { cn, getBgVariantStyle, getTextVariantStyle } from "@/lib/utils";
import { ButtonProps } from "@/types/type";

const Button = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant,
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        " w-full flex p-3 flex-row items-center justify-center shadow-md rounded-full shadow-neutral-400/70",
        getBgVariantStyle(bgVariant),
        className
      )}
      onPress={onPress}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={cn("text-lg font-bold", getTextVariantStyle(textVariant))}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default Button;
