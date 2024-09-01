import { cn } from "@/lib/utils";
import { GoogleInputProps } from "@/types/type";
import { View, Text } from "react-native";

const GoogleTextInput = ({
  icon,
  textInputBackgroundColor,
  initialLocation,
  containerStyle,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={cn(
        "flex flex-row items-center justify-center relative z-50 rounded-xl mb-5",
        containerStyle
      )}
    >
      <Text>GoogleTextInput</Text>
    </View>
  );
};

export default GoogleTextInput;
