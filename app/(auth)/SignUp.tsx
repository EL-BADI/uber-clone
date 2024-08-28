import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[200px]"
            resizeMode="cover"
          />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Name"
                placeholder="Enter your name"
                icon={icons.person}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text className=" text-rose-500 text-xs font-JakartaMedium">
              Name is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Email"
                placeholder="Enter your E-mail"
                icon={icons.email}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className=" text-rose-500 text-xs font-JakartaMedium">
              Email is required.
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Password"
                placeholder="Enter your password"
                icon={icons.lock}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className=" text-rose-500 text-xs font-JakartaMedium">
              Password is required.
            </Text>
          )}
          <Button
            title="Sign up"
            onPress={handleSubmit(onSubmit)}
            className=" mt-7"
          />

          <OAuth />
          <Link
            href={"/(auth)/SignIn"}
            className="text-lg  text-center text-general-200 mt-5"
          >
            <Text>Already have an account? </Text>
            <Text className=" text-primary-500">Log In</Text>
          </Link>
        </View>

        {/* verification modal */}
      </View>
    </ScrollView>
  );
};

export default SignUp;
