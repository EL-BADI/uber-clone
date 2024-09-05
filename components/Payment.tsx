import { View, Text } from "react-native";
import React from "react";
import Button from "./Button";
import { router } from "expo-router";

const Payment = () => {
  const handleOpenPaymentSheet = async () => {
    router.push("/(root)/PaypalCheckout");
  };
  return (
    <>
      <Button
        title="Confirm Ride"
        className=" my-10"
        onPress={handleOpenPaymentSheet}
      />
    </>
  );
};

export default Payment;
