import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { ActivityIndicator, Text, View } from "react-native";
import { useEffect, useState } from "react";

const PaypalCheckout = () => {
  const [approvalUrl, setApprovalUrl] = useState("");
  useEffect(() => {
    const getApprovalUrl = async () => {
      console.log("sheets");

      try {
        const response = await fetch("/paypal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch PayPal approval URL");
        }

        const data = await response.json();

        if (!data?.approvalUrl) {
          throw new Error("Could not get PayPal approval URL");
        }

        setApprovalUrl(data.approvalUrl);
      } catch (error) {
        console.log(error);
      }
    };

    getApprovalUrl();
  }, []);

  if (!approvalUrl)
    return (
      <View className="flex-1 w-screen h-screen justify-center items-center">
        <View className=" flex flex-col items-center gap-5">
          <ActivityIndicator size={50} className="" />
          <Text className=" font-JakartaBold text-zinc-600 tracking-wide text-sm">
            Getting you to checkout...
          </Text>
        </View>
      </View>
    );
  return (
    <WebView
      className={`flex-1`}
      style={{ marginTop: Constants.statusBarHeight }}
      source={{ uri: approvalUrl }}
    />
  );
};

export default PaypalCheckout;
