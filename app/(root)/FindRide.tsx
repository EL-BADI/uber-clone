import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import TomtomAuthComplete from "@/components/TomtomAuthComplete";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    setUserLocation,
    destinationAddress,
    setDestinationLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride" snapPoints={["70%"]}>
      <View className=" my-3 ">
        <Text className=" text-lg font-JakartaSemiBold mb-3">From</Text>
        <TomtomAuthComplete
          icon={icons.target}
          handlePress={(location) => {
            setUserLocation(location);
          }}
          initialLocation={userAddress!}
        />
      </View>
      <View className=" my-3 ">
        <Text className=" text-lg font-JakartaSemiBold mb-3">To</Text>
        <TomtomAuthComplete
          icon={icons.map}
          handlePress={(location) => {
            setDestinationLocation(location);
          }}
          initialLocation={userAddress!}
        />
      </View>
      <Button
        title="Find Now"
        className=" mt-5"
        onPress={() => {
          router.push("/(root)/ConfirmRide");
        }}
      />
    </RideLayout>
  );
};

export default FindRide;
