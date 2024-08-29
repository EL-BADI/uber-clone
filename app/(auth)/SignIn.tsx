import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = React.useCallback(
    async (data: FormData) => {
      if (!isLoaded) {
        return;
      }

      try {
        const signInAttempt = await signIn.create({
          identifier: data.email,
          password: data.password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/(root)/(tabs)/Home");
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (err: any) {
        Alert.alert("Error", err.errors[0].longMessage);
      }
    },
    [isLoaded]
  );

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
            Welcome 👋
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
            title="Sign In"
            onPress={handleSubmit(onSignInPress)}
            className=" mt-7"
          />

          <OAuth />
          <Link
            href={"/(auth)/SignUp"}
            className="text-lg  text-center text-general-200 mt-5"
          >
            <Text>Don't have an account? </Text>
            <Text className=" text-primary-500">Sign up</Text>
          </Link>
        </View>

        {/* verification modal */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
