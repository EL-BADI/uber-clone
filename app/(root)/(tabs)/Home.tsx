import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  // async function fetchHello() {
  //   const response = await fetch("/user");
  //   const data = await response.json();
  //   return data;
  // }

  // const { data, isLoading } = useQuery({
  //   queryKey: ["something"],
  //   queryFn: fetchHello,
  // });

  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
