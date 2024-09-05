import { View, Text, FlatList } from "react-native";
import React from "react";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import Button from "@/components/Button";
import { router } from "expo-router";
import { userDriverStore } from "@/store";

const ConfirmRide = () => {
  const { selectedDriver, setSelectedDriver, drivers } = userDriverStore();
  return (
    <RideLayout snapPoints={["60%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => {
              setSelectedDriver(Number(item.id));
            }}
          />
        )}
        ListFooterComponent={() => (
          <View className=" mx-5 mt-10 ">
            <Button
              title="Select Ride"
              onPress={() => {
                router.push("/(root)/BookRide");
              }}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
