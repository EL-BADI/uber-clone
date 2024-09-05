import { icons } from "@/constants";
import { cn } from "@/lib/utils";
import { GoogleInputProps } from "@/types/type";
import { View, Text, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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
      <GooglePlacesAutocomplete
        requestUrl={{
          url: `https://api.tomtom.com/search/2/autocomplete/pizza.json?key=${process.env.EXPO_PUBLIC_TOMTOM_KEY}&language=en-US`,
          useOnPlatform: "all",
        }}
        fetchDetails={true}
        placeholder="Where you want to go?"
        debounce={200}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          handlePress({
            latitude: details?.geometry.location.lat as number,
            longitude: details?.geometry.location.lng as number,
            address: data.description,
          });
        }}
        query={
          {
            // key: process.env.EXPO_PUBLIC_TOMTOM_KEY,
            // language: "en",
          }
        }
        renderLeftButton={() => (
          <View className=" justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className=" w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
