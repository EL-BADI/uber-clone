import { View, Text, Image } from "react-native";
import React from "react";
import Button from "./Button";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleAuth = () => {};
  return (
    <View>
      <View className=" flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className=" flex-1 h-[1px] bg-general-100" />
        <Text className=" text-lg">Or</Text>
        <View className=" flex-1 h-[1px] bg-general-100" />
      </View>
      <Button
        className=" mt-5 w-full shadow-none"
        bgVariant="outline"
        textVariant="primary"
        title="Log in with google"
        onPress={handleGoogleAuth}
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className=" w-5 h-5 mx-2"
          />
        )}
      />
    </View>
  );
};

export default OAuth;
