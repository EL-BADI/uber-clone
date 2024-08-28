import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import Button from "@/components/Button";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);

  const [active, setActive] = useState(0);

  const isLastSlide = useMemo(() => active === onboarding.length - 1, [active]);
  return (
    <SafeAreaView className=" flex items-center justify-between h-full bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/SignUp");
        }}
        className=" w-full flex items-end justify-end p-5"
      >
        <Text className=" text-black text-base font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className=" w-[32px] h-1 mx-1 rounded-full bg-[#e2e8f0]"></View>
        }
        activeDot={
          <View className=" w-[32px] h-1 mx-1 rounded-full bg-[#0286ff]"></View>
        }
        onIndexChanged={(i) => {
          setActive(i);
        }}
      >
        {onboarding.map((item) => (
          <View key={item.id} className=" flex items-center justify-center p-5">
            <Image
              source={item.image}
              resizeMode="contain"
              className=" w-full h-[300px]"
            />
            <View className=" flex flex-row items-center justify-center w-full mt-10">
              <Text className=" text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className=" text-base font-JakartaSemiBold text-center text-[#858585 mx-5 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <Button
        onPress={() => {
          isLastSlide
            ? router.replace("/(auth)/SignUp")
            : swiperRef.current?.scrollBy(1);
        }}
        title={isLastSlide ? "Get started" : "Next"}
        className="w-11/12 mt-10 mb-3"
      />
    </SafeAreaView>
  );
};

export default Welcome;
